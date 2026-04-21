import { requireSession } from "@/lib/auth";
import { SUPPLIERS, ALL_CATEGORIES, ALL_COUNTRIES } from "@/data/suppliers";
import { SupplierBrowser } from "./supplier-browser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier info",
};

export default async function SuppliersPage() {
  await requireSession();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          Our supply network
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Supplier info
        </h1>
        <p className="mt-3 text-muted-foreground">
          {SUPPLIERS.length} active suppliers across {ALL_COUNTRIES.length}{" "}
          countries. Select a supplier to view their profile and download the
          latest stock list.
        </p>
      </div>

      <div className="mt-8">
        <SupplierBrowser
          suppliers={SUPPLIERS}
          countries={ALL_COUNTRIES}
          categories={ALL_CATEGORIES}
        />
      </div>
    </div>
  );
}
