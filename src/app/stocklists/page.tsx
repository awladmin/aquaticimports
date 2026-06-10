import { requireSession } from "@/lib/auth";

export default async function StocklistsPage() {
  await requireSession();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Stocklists</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Download the latest stocklists. Updated weekly by the Aquatic Imports
          team.
        </p>
      </header>
      <div className="mt-8 rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        File list lands here once Supabase Storage is wired up.
      </div>
    </div>
  );
}
