import Link from "next/link";
import { ALL_CATEGORIES } from "@/data/suppliers";
import { Button } from "@/components/ui/button";
import { NewSupplierForm } from "./new-supplier-form";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · New supplier",
};

export default function NewSupplierPage() {
  return (
    <div className="max-w-3xl space-y-5">
      <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
        <Link href="/admin/suppliers">
          <ArrowLeft className="mr-1 h-4 w-4" />
          All suppliers
        </Link>
      </Button>

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Add a new supplier
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the supplier details and upload their current stock list.
          Trade customers will see this as soon as you publish.
        </p>
      </header>

      <NewSupplierForm categories={ALL_CATEGORIES} />
    </div>
  );
}
