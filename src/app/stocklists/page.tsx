import { requireSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { customOrder } from "@/lib/stocklist-sort";
import { StocklistFileList } from "./file-list";

const BUCKET = "stocklists";

export default async function StocklistsPage() {
  await requireSession();
  const supabase = await createClient();

  const [filesResult, positionsResult] = await Promise.all([
    supabase.storage
      .from(BUCKET)
      .list("", { sortBy: { column: "updated_at", order: "desc" } }),
    supabase.from("stocklist_order").select("name, position"),
  ]);

  const positions = new Map<string, number>();
  for (const row of positionsResult.data ?? []) {
    positions.set(row.name, row.position);
  }

  const rawItems = (filesResult.data ?? []).map((f) => ({
    name: f.name,
    size: f.metadata?.size as number | undefined,
    updatedAt: f.updated_at,
    url: `/api/stocklists/${encodeURIComponent(f.name)}`,
  }));
  const items = customOrder(rawItems, positions);

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
