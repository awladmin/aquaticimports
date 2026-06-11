import { requireSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StocklistFileList } from "./file-list";

const BUCKET = "stocklists";

export default async function StocklistsPage() {
  await requireSession();
  const supabase = await createClient();

  const { data: files } = await supabase.storage
    .from(BUCKET)
    .list("", { sortBy: { column: "updated_at", order: "desc" } });

  const items = (files ?? []).map((f) => ({
    name: f.name,
    size: f.metadata?.size as number | undefined,
    updatedAt: f.updated_at,
    url: `/api/stocklists/${encodeURIComponent(f.name)}`,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Stocklists</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Latest stocklists from Aquatic Imports. Click to download.
        </p>
      </header>

      <StocklistFileList files={items} />
    </div>
  );
}
