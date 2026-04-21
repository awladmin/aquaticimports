"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Supplier } from "@/data/suppliers";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flagEmoji } from "@/lib/country";
import { Search, ArrowRight, FileDown } from "lucide-react";

export function SupplierBrowser({
  suppliers,
  countries,
  categories,
}: {
  suppliers: Supplier[];
  countries: string[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return suppliers.filter((s) => {
      if (q) {
        const hay = [s.name, s.country, s.summary, ...s.categories]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (country !== "all" && s.country !== country) return false;
      if (category !== "all" && !s.categories.includes(category)) return false;
      return true;
    });
  }, [suppliers, query, country, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/60 p-3 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, country, species…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={country} onValueChange={(v) => setCountry(v ?? "all")}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Showing {filtered.length} of {suppliers.length} suppliers
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <SupplierCard key={s.slug} supplier={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="mt-8 border-dashed">
          <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
            <p className="text-sm font-medium">No suppliers match</p>
            <p className="text-sm text-muted-foreground">
              Try clearing a filter or broadening your search.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setCountry("all");
                setCategory("all");
              }}
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Card className="group h-full overflow-hidden border-border/70 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10">
      <div
        className="relative h-32 w-full bg-gradient-to-br from-brand-300/80 via-brand-200/60 to-brand-50"
        style={{
          backgroundImage: supplier.featured
            ? "radial-gradient(circle at 30% 30%, #73C9B4 0%, transparent 55%), radial-gradient(circle at 70% 70%, #7BC8F7 0%, transparent 55%)"
            : undefined,
        }}
      >
        <div className="absolute right-3 top-3 flex gap-1">
          {supplier.featured && (
            <Badge className="bg-white/90 text-brand-700 backdrop-blur">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="text-2xl">{flagEmoji(supplier.countryCode)}</span>
          <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur">
            {supplier.country}
          </span>
        </div>
      </div>
      <CardContent className="flex h-[calc(100%-8rem)] flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight group-hover:text-brand-700">
            {supplier.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {supplier.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {supplier.categories.slice(0, 3).map((c) => (
            <Badge
              key={c}
              variant="outline"
              className="border-brand-200 bg-brand-50/60 text-brand-800"
            >
              {c}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <FileDown className="h-3 w-3" />
            Stock list {supplier.stockListUpdatedAt}
          </span>
          <Link
            href={`/suppliers/${supplier.slug}`}
            className="inline-flex items-center gap-1 font-medium text-brand-700 hover:text-brand-800"
          >
            View
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
