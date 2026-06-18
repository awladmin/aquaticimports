import { describe, expect, it } from "vitest";
import { alphabeticalOrder, customOrder, type Positions } from "./stocklist-sort";

const FILES = [
  { name: "Cebu.xlsx", updatedAt: "2026-06-15T09:00:00Z" },
  { name: "Vietnam.xlsx", updatedAt: "2026-06-10T09:00:00Z" },
  { name: "Bali.xlsx", updatedAt: "2026-06-17T09:00:00Z" },
  { name: "Indonesia.xlsx", updatedAt: "2026-06-12T09:00:00Z" },
];

describe("customOrder", () => {
  it("returns date-desc order when no positions are set", () => {
    const positions: Positions = new Map();
    const result = customOrder(FILES, positions).map((f) => f.name);
    expect(result).toEqual([
      "Bali.xlsx",
      "Cebu.xlsx",
      "Indonesia.xlsx",
      "Vietnam.xlsx",
    ]);
  });

  it("places positioned files below unpositioned, sorted by position", () => {
    const positions: Positions = new Map([
      ["Vietnam.xlsx", 1],
      ["Cebu.xlsx", 2],
    ]);
    const result = customOrder(FILES, positions).map((f) => f.name);
    expect(result).toEqual([
      "Bali.xlsx", // unpositioned, newest
      "Indonesia.xlsx", // unpositioned, older
      "Vietnam.xlsx", // positioned 1
      "Cebu.xlsx", // positioned 2
    ]);
  });

  it("handles every file being positioned", () => {
    const positions: Positions = new Map([
      ["Bali.xlsx", 4],
      ["Cebu.xlsx", 1],
      ["Vietnam.xlsx", 2],
      ["Indonesia.xlsx", 3],
    ]);
    const result = customOrder(FILES, positions).map((f) => f.name);
    expect(result).toEqual([
      "Cebu.xlsx",
      "Vietnam.xlsx",
      "Indonesia.xlsx",
      "Bali.xlsx",
    ]);
  });

  it("falls back gracefully when updatedAt is missing", () => {
    const items = [
      { name: "Old.xlsx", updatedAt: "2026-06-01T00:00:00Z" },
      { name: "Missing.xlsx", updatedAt: null },
      { name: "New.xlsx", updatedAt: "2026-06-15T00:00:00Z" },
    ];
    const result = customOrder(items, new Map()).map((f) => f.name);
    expect(result).toEqual(["New.xlsx", "Old.xlsx", "Missing.xlsx"]);
  });
});

describe("alphabeticalOrder", () => {
  it("sorts case-insensitively", () => {
    const items = [
      { name: "vietnam.xlsx" },
      { name: "Bali.xlsx" },
      { name: "cebu.xlsx" },
    ];
    const result = alphabeticalOrder(items).map((f) => f.name);
    expect(result).toEqual(["Bali.xlsx", "cebu.xlsx", "vietnam.xlsx"]);
  });

  it("handles numeric segments naturally", () => {
    const items = [
      { name: "List 10.xlsx" },
      { name: "List 2.xlsx" },
      { name: "List 1.xlsx" },
    ];
    const result = alphabeticalOrder(items).map((f) => f.name);
    expect(result).toEqual(["List 1.xlsx", "List 2.xlsx", "List 10.xlsx"]);
  });

  it("does not mutate the input array", () => {
    const original = [{ name: "b.xlsx" }, { name: "a.xlsx" }];
    const result = alphabeticalOrder(original);
    expect(original.map((f) => f.name)).toEqual(["b.xlsx", "a.xlsx"]);
    expect(result.map((f) => f.name)).toEqual(["a.xlsx", "b.xlsx"]);
  });
});
