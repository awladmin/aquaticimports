"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  bucketFor,
  BUCKET_LABELS,
  type StocklistBucket,
} from "@/lib/stocklist-filters";

type StocklistFile = {
  name: string;
  size?: number;
  updatedAt?: string | null;
  url: string;
};

type Tab = StocklistBucket | "all";

const TABS: Tab[] = ["this-week", "last-week", "older", "all"];

export function StocklistFileList({ files }: { files: StocklistFile[] }) {
  const [tab, setTab] = useState<Tab>("this-week");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { "this-week": 0, "last-week": 0, "older": 0, all: files.length };
    for (const f of files) c[bucketFor(f.updatedAt)]++;
    return c;
  }, [files]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return files.filter((f) => {
      if (tab !== "all" && bucketFor(f.updatedAt) !== tab) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [files, tab, query]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-brand-100 text-brand-800"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {BUCKET_LABELS[t]}
              <span className="ml-1.5 text-xs text-muted-foreground">
                {counts[t]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search filenames"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-4 divide-y divide-border/60 overflow-hidden rounded-lg border border-border/70 bg-card">
          {filtered.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between gap-4 p-4 hover:bg-muted/30"
            >
              <div>
                <p className="font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(f.size)}
                  {f.updatedAt
                    ? ` · uploaded ${new Date(f.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`
                    : ""}
                </p>
              </div>
              <a
                href={f.url}
                download={f.name}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-gradient-to-b from-brand-400 to-brand-600 px-4 text-sm font-medium text-white transition-colors hover:from-brand-500 hover:to-brand-700"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {query
            ? `No files match "${query}" in ${BUCKET_LABELS[tab].toLowerCase()}.`
            : files.length === 0
              ? "No stocklists available right now. Check back later or contact us if you're expecting one."
              : `No files in ${BUCKET_LABELS[tab].toLowerCase()}. Try another tab.`}
        </div>
      )}
    </>
  );
}

function formatBytes(bytes: number | undefined) {
  if (!bytes) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
