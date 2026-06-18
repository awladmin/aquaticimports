export type Sortable = {
  name: string;
  updatedAt?: string | null;
};

export type Positions = Map<string, number>;

// Custom order: unpositioned files first (newest by updated_at), then positioned
// files in ascending position. The admin drags the prominent ones into the
// positioned section; new uploads sit above so the admin sees them and can drag
// down if they want.
export function customOrder<T extends Sortable>(files: T[], positions: Positions): T[] {
  const unpositioned: T[] = [];
  const positioned: T[] = [];
  for (const f of files) {
    if (positions.has(f.name)) positioned.push(f);
    else unpositioned.push(f);
  }
  unpositioned.sort((a, b) => {
    const aTime = a.updatedAt ? Date.parse(a.updatedAt) : 0;
    const bTime = b.updatedAt ? Date.parse(b.updatedAt) : 0;
    return bTime - aTime;
  });
  positioned.sort((a, b) => {
    const ap = positions.get(a.name) ?? 0;
    const bp = positions.get(b.name) ?? 0;
    return ap - bp;
  });
  return [...unpositioned, ...positioned];
}

export function alphabeticalOrder<T extends Sortable>(files: T[]): T[] {
  return [...files].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base", numeric: true }),
  );
}
