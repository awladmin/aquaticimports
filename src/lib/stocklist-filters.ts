export type StocklistBucket = "this-week" | "last-week" | "older";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function bucketFor(updatedAt: string | null | undefined): StocklistBucket {
  if (!updatedAt) return "older";
  const age = Date.now() - new Date(updatedAt).getTime();
  if (age < ONE_WEEK_MS) return "this-week";
  if (age < 2 * ONE_WEEK_MS) return "last-week";
  return "older";
}

export const BUCKET_LABELS: Record<StocklistBucket | "all", string> = {
  "this-week": "This week",
  "last-week": "Last week",
  "older": "Older",
  "all": "All",
};
