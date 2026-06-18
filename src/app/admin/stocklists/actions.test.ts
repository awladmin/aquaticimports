import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteStocklists, reorderStocklists } from "./actions";

const requireAdminMock = vi.hoisted(() => vi.fn());
const createClientMock = vi.hoisted(() => vi.fn());
const revalidatePathMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  requireAdmin: requireAdminMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

function clientDouble(opts: {
  removeError?: { message: string } | null;
  orderDeleteError?: { message: string } | null;
  orderInsertError?: { message: string } | null;
} = {}) {
  const orderInsertSpy = vi
    .fn()
    .mockResolvedValue({ error: opts.orderInsertError ?? null });
  const orderInSpy = vi
    .fn()
    .mockResolvedValue({ error: opts.orderDeleteError ?? null });
  const orderDeleteSpy = vi.fn().mockReturnValue({ in: orderInSpy });
  const remove = vi
    .fn()
    .mockResolvedValue({ error: opts.removeError ?? null });
  return {
    client: {
      storage: {
        from: vi.fn().mockReturnValue({ remove }),
      },
      from: vi.fn().mockImplementation((table: string) => {
        if (table === "stocklist_order") {
          return { delete: orderDeleteSpy, insert: orderInsertSpy };
        }
        throw new Error(`unexpected table: ${table}`);
      }),
    },
    spies: { remove, orderDeleteSpy, orderInSpy, orderInsertSpy },
  };
}

beforeEach(() => {
  requireAdminMock.mockReset();
  createClientMock.mockReset();
  revalidatePathMock.mockReset();
  requireAdminMock.mockResolvedValue({
    userId: "admin-1",
    email: "rob@x.com",
    role: "admin",
    displayName: "Rob",
  });
});

describe("deleteStocklists", () => {
  it("returns silently when no names selected", async () => {
    createClientMock.mockResolvedValue(clientDouble().client);
    const fd = new FormData();
    await expect(deleteStocklists(fd)).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("removes storage objects and matching position rows", async () => {
    const { client, spies } = clientDouble();
    createClientMock.mockResolvedValue(client);
    const fd = new FormData();
    fd.append("name", "Cebu.xlsx");
    fd.append("name", "Indonesia.xlsx");
    await deleteStocklists(fd);
    expect(spies.remove).toHaveBeenCalledWith([
      "Cebu.xlsx",
      "Indonesia.xlsx",
    ]);
    expect(spies.orderInSpy).toHaveBeenCalledWith("name", [
      "Cebu.xlsx",
      "Indonesia.xlsx",
    ]);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/stocklists");
    expect(revalidatePathMock).toHaveBeenCalledWith("/stocklists");
  });

  it("throws when Supabase storage reports an error", async () => {
    createClientMock.mockResolvedValue(
      clientDouble({ removeError: { message: "permission denied" } }).client,
    );
    const fd = new FormData();
    fd.append("name", "a.xlsx");
    await expect(deleteStocklists(fd)).rejects.toThrow(/permission denied/);
  });

  it("checks admin auth before doing anything", async () => {
    requireAdminMock.mockRejectedValue(new Error("REDIRECT:/login"));
    const fd = new FormData();
    fd.append("name", "a.xlsx");
    await expect(deleteStocklists(fd)).rejects.toThrow("REDIRECT:/login");
    expect(createClientMock).not.toHaveBeenCalled();
  });
});

describe("reorderStocklists", () => {
  it("returns silently when names is empty", async () => {
    createClientMock.mockResolvedValue(clientDouble().client);
    await expect(reorderStocklists([])).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("clears old positions and inserts new ones at 1..N", async () => {
    const { client, spies } = clientDouble();
    createClientMock.mockResolvedValue(client);
    await reorderStocklists(["Cebu.xlsx", "Bali.xlsx", "Vietnam.xlsx"]);
    expect(spies.orderInSpy).toHaveBeenCalledWith("name", [
      "Cebu.xlsx",
      "Bali.xlsx",
      "Vietnam.xlsx",
    ]);
    expect(spies.orderInsertSpy).toHaveBeenCalledWith([
      { name: "Cebu.xlsx", position: 1 },
      { name: "Bali.xlsx", position: 2 },
      { name: "Vietnam.xlsx", position: 3 },
    ]);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/stocklists");
    expect(revalidatePathMock).toHaveBeenCalledWith("/stocklists");
  });

  it("throws when the position insert fails", async () => {
    createClientMock.mockResolvedValue(
      clientDouble({
        orderInsertError: { message: "duplicate position" },
      }).client,
    );
    await expect(reorderStocklists(["a.xlsx"])).rejects.toThrow(
      /duplicate position/,
    );
  });

  it("checks admin auth before touching the table", async () => {
    requireAdminMock.mockRejectedValue(new Error("REDIRECT:/login"));
    await expect(reorderStocklists(["a.xlsx"])).rejects.toThrow(
      "REDIRECT:/login",
    );
    expect(createClientMock).not.toHaveBeenCalled();
  });
});
