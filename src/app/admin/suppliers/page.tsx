import Link from "next/link";
import { SUPPLIERS } from "@/data/suppliers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flagEmoji } from "@/lib/country";
import { Plus, Search, FileSpreadsheet, Pencil, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Suppliers",
};

export default function AdminSuppliersPage() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Suppliers</h1>
          <p className="text-sm text-muted-foreground">
            {SUPPLIERS.length} suppliers. Upload a new stock list from the
            edit screen.
          </p>
        </div>
        <Button asChild className="bg-brand-500 text-white hover:bg-brand-600">
          <Link href="/admin/suppliers/new">
            <Plus className="mr-1 h-4 w-4" />
            Add supplier
          </Link>
        </Button>
      </header>

      <Card className="border-border/70">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-b border-border/60 p-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search suppliers…" className="pl-9" />
            </div>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Supplier</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Stock list</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="w-[110px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {SUPPLIERS.map((s) => (
                  <TableRow key={s.slug}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{flagEmoji(s.countryCode)}</span>
                        {s.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {s.country}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {s.categories.slice(0, 2).map((c) => (
                          <Badge
                            key={c}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {c}
                          </Badge>
                        ))}
                        {s.categories.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-[10px] text-muted-foreground"
                          >
                            +{s.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <FileSpreadsheet className="h-3 w-3 text-brand-600" />
                        {s.stockListUpdatedAt}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {s.featured ? (
                        <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-100">
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/suppliers/${s.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
