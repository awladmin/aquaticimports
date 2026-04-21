import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, FileDown, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Place an order",
};

export default async function PlaceOrderPage() {
  await requireSession();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          Ordering
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          How to place an order
        </h1>
        <p className="mt-3 text-muted-foreground">
          We take orders by telephone and email. Each supplier row in the
          weekly shipment schedule shows its own order deadline — please check
          it before calling through a larger list.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card className="border-border/70">
          <CardContent className="p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Phone className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold tracking-tight">
              By telephone
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              For larger orders, last-minute changes or anything urgent — give
              us a call.
            </p>
            <a
              href="tel:+441753687050"
              className="mt-3 block text-lg font-semibold text-brand-700"
            >
              +44 (0)1753 687050
            </a>
            <p className="text-xs text-muted-foreground">
              <Clock className="mr-1 inline h-3 w-3" />
              Mon–Fri 8am – 5pm &middot; 24hr voicemail
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardContent className="p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <Mail className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold tracking-tight">
              By email
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Email your list — preferably as an annotated stock list or
              numbered line items with the supplier and week.
            </p>
            <a
              href="mailto:orders@aquaticimports.com"
              className="mt-3 block text-lg font-semibold text-brand-700"
            >
              orders@aquaticimports.com
            </a>
            <p className="text-xs text-muted-foreground">
              Response within one working hour on weekdays.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-brand-200 bg-gradient-to-br from-brand-50 to-background">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Before you order
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Download the current stock list for the supplier you&apos;re
              ordering from — deadlines vary by arrival day.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              className="bg-brand-500 text-white hover:bg-brand-600"
            >
              <Link href="/shipment-schedule">
                <FileDown className="mr-1 h-4 w-4" />
                Stock lists
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/suppliers">
                Suppliers
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
