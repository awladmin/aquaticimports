"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  bucketFor,
  BUCKET_LABELS,
  type StocklistBucket,
} from "@/lib/stocklist-filters";
import { deleteStocklists } from "./actions";

type StocklistFile = {
  id: string;
  name: string;
  size?: number;
  updatedAt?: string | null;
};

type Tab = StocklistBucket | "all";

const TABS: Tab[] = ["this-week", "last-week", "older", "all"];

export function StocklistFileTable({ files }: { files: StocklistFile[] }) {
  const [tab, setTab] = useState<Tab>("this-week");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

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

  const allSelected =
    filtered.length > 0 && filtered.every((f) => selected.has(f.name));
  const someSelected = filtered.some((f) => selected.has(f.name));
  const selectedCount = filtered.filter((f) => selected.has(f.name)).length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        for (const f of filtered) next.delete(f.name);
      } else {
        for (const f of filtered) next.add(f.name);
      }
      return next;
    });
  };

  const toggleOne = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        <form action={deleteStocklists} className="mt-4">
          <div className="overflow-hidden rounded-lg border border-border/70 bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      ref={headerCheckboxRef}
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all visible files"
                      className="h-4 w-4 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left">File</th>
                  <th className="px-4 py-3 text-left">Size</th>
                  <th className="px-4 py-3 text-left">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        name="name"
                        value={f.name}
                        checked={selected.has(f.name)}
                        onChange={() => toggleOne(f.name)}
                        className="h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{f.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatBytes(f.size)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <FormattedDate iso={f.updatedAt} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
            {selectedCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedCount} selected
              </p>
            )}
            <DeleteSubmit disabled={selectedCount === 0} />
          </div>
        </form>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {query
            ? `No files match "${query}" in ${BUCKET_LABELS[tab].toLowerCase()}.`
            : files.length === 0
              ? "No stocklists uploaded yet. Drop one above to get started."
              : `No files in ${BUCKET_LABELS[tab].toLowerCase()}. Try another tab.`}
        </div>
      )}
    </>
  );
}

function DeleteSubmit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      disabled={disabled || pending}
      className="text-destructive"
    >
      {pending ? (
        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="mr-1 h-4 w-4" />
      )}
      {pending ? "Deleting..." : "Delete selected"}
    </Button>
  );
}

function FormattedDate({ iso }: { iso: string | null | undefined }) {
  if (!iso) return <>-</>;
  return (
    <span suppressHydrationWarning>
      {new Date(iso).toLocaleString("en-GB")}
    </span>
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
