import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { UploadZone } from "./upload-zone";
import { StocklistFileTable } from "./file-table";

const BUCKET = "stocklists";

export default async function AdminStocklistsPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: files } = await supabase.storage
    .from(BUCKET)
    .list("", { sortBy: { column: "updated_at", order: "desc" } });

  const items = (files ?? []).map((f) => ({
    id: (f.id as string | null) ?? f.name,
    name: f.name,
    size: f.metadata?.size as number | undefined,
    updatedAt: f.updated_at,
  }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Stocklists</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload the week&apos;s stocklists. Customers see and download them
          from their trade login.
        </p>
      </header>

      <UploadZone />

      <StocklistFileTable files={items} />
    </div>
  );
}
