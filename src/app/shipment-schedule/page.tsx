import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { scheduleWithSuppliers, CURRENT_WEEK_COMMENCING, type ArrivalDay } from "@/data/schedule";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadStockButton } from "@/components/download-stock-button";
import { flagEmoji } from "@/lib/country";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipment schedule & stock lists",
};

const DAY_LABEL: Record<ArrivalDay, { label: string; short: string }> = {
  Monday: { label: "Monday", short: "Mon" },
  Tuesday: { label: "Tuesday", short: "Tue" },
  Wednesday: { label: "Wednesday", short: "Wed" },
  Thursday: { label: "Thursday", short: "Thu" },
  Friday: { label: "Friday", short: "Fri" },
};

const DAY_BADGE: Record<ArrivalDay, string> = {
  Monday: "bg-slate-100 text-slate-700 border-slate-200",
  Tuesday: "bg-sky-100 text-sky-800 border-sky-200",
  Wednesday: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Thursday: "bg-brand-100 text-brand-800 border-brand-200",
  Friday: "bg-amber-100 text-amber-800 border-amber-200",
};

export default async function SchedulePage() {
  await requireSession();
  const entries = scheduleWithSuppliers();
  const weekDate = new Date(CURRENT_WEEK_COMMENCING).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
  const available = entries.filter((e) => e.available).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
            <Calendar className="h-3.5 w-3.5" />
            Week commencing {weekDate}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Shipment schedule &amp; stock lists
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {available} confirmed arrivals this week. Click the download icon
            on any row to grab the latest stock list for that supplier.
            Check each row&apos;s deadline, that&apos;s when we need your
            order by.
          </p>
        </div>
        <Card className="shrink-0 border-brand-200 bg-brand-50/60">
          <CardContent className="flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Clock className="h-4 w-4" />
            </span>
            <div className="text-sm">
              <p className="font-medium">Missed a deadline?</p>
              <p className="text-xs text-muted-foreground">
                Call us on{" "}
                <a href="tel:+441753687050" className="underline">
                  01753 687050
                </a>{" "}
               , we&apos;ll do our best.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 overflow-hidden border-border/70">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[220px]">Supplier</TableHead>
                <TableHead>Arrives</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>Order deadline</TableHead>
                <TableHead className="text-right">Stock list</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => {
                const s = entry.supplier;
                if (!s) return null;
                return (
                  <TableRow
                    key={`${entry.supplierSlug}-${entry.arrives}`}
                    className={entry.available ? "" : "opacity-60"}
                  >
                    <TableCell className="font-medium">
                      <Link
                        href={`/suppliers/${s.slug}`}
                        className="group flex items-center gap-2 hover:text-brand-700"
                      >
                        <span className="text-base leading-none">
                          {flagEmoji(s.countryCode)}
                        </span>
                        <span className="group-hover:underline">
                          {s.name}
                        </span>
                      </Link>
                      <p className="mt-0.5 flex items-center gap-1 text-xs font-normal text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {s.country}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={DAY_BADGE[entry.arrives]}
                      >
                        {DAY_LABEL[entry.arrives].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md text-sm text-muted-foreground">
                      {entry.detail}
                      {!entry.available && (
                        <Badge variant="secondary" className="ml-2">
                          Pre-order only
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="font-medium">{entry.deadline}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DownloadStockButton
                        supplierName={s.name}
                        fileName={s.stockListFile}
                        iconOnly
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Schedule subject to change. Availability and arrival days can be
        affected by supplier conditions, flight schedules, and seasonal water
        conditions. All prices on stock lists are E&amp;OE.
      </p>
    </div>
  );
}
