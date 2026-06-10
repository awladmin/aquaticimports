export default function AdminStocklistsPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Stocklists</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload weekly stocklists, list current files, delete individually or
          in bulk.
        </p>
      </header>
      <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        File management UI lands here once Supabase Storage is wired up.
      </div>
    </div>
  );
}
