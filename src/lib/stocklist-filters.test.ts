import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BUCKET_LABELS, bucketFor } from "./stocklist-filters";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

describe("bucketFor", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'older' for null", () => {
    expect(bucketFor(null)).toBe("older");
  });

  it("returns 'older' for undefined", () => {
    expect(bucketFor(undefined)).toBe("older");
  });

  it("returns 'this-week' for today", () => {
    expect(bucketFor(new Date("2026-06-15T11:00:00Z").toISOString())).toBe(
      "this-week",
    );
  });

  it("returns 'this-week' for 3 days ago", () => {
    const date = new Date(Date.now() - 3 * ONE_DAY_MS).toISOString();
    expect(bucketFor(date)).toBe("this-week");
  });

  it("returns 'this-week' for 6 days 23 hours ago (just inside the boundary)", () => {
    const date = new Date(Date.now() - (7 * ONE_DAY_MS - 1000)).toISOString();
    expect(bucketFor(date)).toBe("this-week");
  });

  it("returns 'last-week' for 7 days ago (just past the boundary)", () => {
    const date = new Date(Date.now() - 7 * ONE_DAY_MS - 1000).toISOString();
    expect(bucketFor(date)).toBe("last-week");
  });

  it("returns 'last-week' for 10 days ago", () => {
    const date = new Date(Date.now() - 10 * ONE_DAY_MS).toISOString();
    expect(bucketFor(date)).toBe("last-week");
  });

  it("returns 'older' for 14 days ago", () => {
    const date = new Date(Date.now() - 14 * ONE_DAY_MS - 1000).toISOString();
    expect(bucketFor(date)).toBe("older");
  });

  it("returns 'older' for 30 days ago", () => {
    const date = new Date(Date.now() - 30 * ONE_DAY_MS).toISOString();
    expect(bucketFor(date)).toBe("older");
  });

  it("returns 'older' for invalid date string", () => {
    expect(bucketFor("not a date")).toBe("older");
  });
});

describe("BUCKET_LABELS", () => {
  it("exposes a human label for every bucket and 'all'", () => {
    expect(BUCKET_LABELS["this-week"]).toBe("This week");
    expect(BUCKET_LABELS["last-week"]).toBe("Last week");
    expect(BUCKET_LABELS.older).toBe("Older");
    expect(BUCKET_LABELS.all).toBe("All");
  });
});
