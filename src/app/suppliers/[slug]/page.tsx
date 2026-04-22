import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { SUPPLIERS, getSupplier } from "@/data/suppliers";
import { CURRENT_SCHEDULE } from "@/data/schedule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadStockButton } from "@/components/download-stock-button";
import { flagEmoji } from "@/lib/country";
import { formatOrdinalDateLong } from "@/lib/date";
import {
  ArrowLeft,
  Calendar,
  FileSpreadsheet,
  MapPin,
  Tag,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return SUPPLIERS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSupplier(slug);
  return {
    title: s ? `${s.name} (${s.country})` : "Supplier",
  };
}

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireSession();
  const { slug } = await params;
  const supplier = getSupplier(slug);
  if (!supplier) notFound();

  const upcoming = CURRENT_SCHEDULE.find((e) => e.supplierSlug === slug);
  const updatedDate = formatOrdinalDateLong(supplier.stockListUpdatedAt);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mb-6 text-muted-foreground"
      >
        <Link href="/suppliers">
          <ArrowLeft className="mr-1 h-4 w-4" />
          All suppliers
        </Link>
      </Button>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div
          className="relative h-48 w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #73C9B4 0%, transparent 55%), radial-gradient(circle at 80% 70%, #7BC8F7 0%, transparent 60%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <span className="text-4xl drop-shadow">
              {flagEmoji(supplier.countryCode)}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                {supplier.country}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                {supplier.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Overview
            </p>
            <p className="mt-2 text-lg font-medium text-foreground">
              {supplier.summary}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {supplier.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {supplier.categories.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="border-brand-200 bg-brand-50/60 text-brand-800"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {c}
                </Badge>
              ))}
            </div>
          </div>

          <aside className="space-y-3">
            <Card className="border-brand-200 bg-brand-50/40">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-2 text-sm">
                  <FileSpreadsheet className="h-4 w-4 text-brand-600" />
                  <span className="font-medium">Stock list</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Updated {updatedDate} · {supplier.stockListFile}
                </p>
                <DownloadStockButton
                  supplierName={supplier.name}
                  fileName={supplier.stockListFile}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {upcoming && (
              <Card className="border-border/70">
                <CardContent className="space-y-2 p-5 text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-brand-600" />
                    This week
                  </div>
                  <p className="text-muted-foreground">
                    Arrives{" "}
                    <span className="font-medium text-foreground">
                      {upcoming.arrives}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    Order deadline{" "}
                    <span className="font-medium text-foreground">
                      {upcoming.deadline}
                    </span>
                  </p>
                  {!upcoming.available && (
                    <Badge variant="secondary">Pre-order only</Badge>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-border/70">
              <CardContent className="space-y-2 p-5 text-sm">
                <div className="flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4 text-brand-600" />
                  Origin
                </div>
                <p className="text-muted-foreground">{supplier.country}</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
