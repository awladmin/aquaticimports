import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteStocklists, uploadStocklist } from "./actions";

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

function storageDouble(opts: {
  uploadError?: { message: string } | null;
  removeError?: { message: string } | null;
}) {
  return {
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi
          .fn()
          .mockResolvedValue({ error: opts.uploadError ?? null }),
        remove: vi
          .fn()
          .mockResolvedValue({ error: opts.removeError ?? null }),
      }),
    },
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

describe("uploadStocklist", () => {
  it("rejects when no file is on the form", async () => {
    createClientMock.mockResolvedValue(storageDouble({}));
    const fd = new FormData();
    const result = await uploadStocklist(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/no file/i);
  });

  it("rejects when file is empty", async () => {
    createClientMock.mockResolvedValue(storageDouble({}));
    const fd = new FormData();
    fd.set("file", new File([], "empty.xlsx"));
    const result = await uploadStocklist(fd);
    expect(result.ok).toBe(false);
  });

  it("returns ok and revalidates both paths on success", async () => {
    createClientMock.mockResolvedValue(storageDouble({}));
    const fd = new FormData();
    fd.set(
      "file",
      new File(["dummy contents"], "Cebu 09.06.26 MH.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    );
    const result = await uploadStocklist(fd);
    expect(result.ok).toBe(true);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/stocklists");
    expect(revalidatePathMock).toHaveBeenCalledWith("/stocklists");
  });

  it("surfaces upload errors from Supabase", async () => {
    createClientMock.mockResolvedValue(
      storageDouble({ uploadError: { message: "quota exceeded" } }),
    );
    const fd = new FormData();
    fd.set("file", new File(["data"], "x.xlsx"));
    const result = await uploadStocklist(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("quota exceeded");
  });

  it("checks admin auth before doing anything", async () => {
    requireAdminMock.mockRejectedValue(new Error("REDIRECT:/login"));
    const fd = new FormData();
    fd.set("file", new File(["data"], "x.xlsx"));
    await expect(uploadStocklist(fd)).rejects.toThrow("REDIRECT:/login");
    expect(createClientMock).not.toHaveBeenCalled();
  });
});

describe("deleteStocklists", () => {
  it("returns silently when no names selected", async () => {
    createClientMock.mockResolvedValue(storageDouble({}));
    const fd = new FormData();
    await expect(deleteStocklists(fd)).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("revalidates both paths after a successful delete", async () => {
    const supabase = storageDouble({});
    createClientMock.mockResolvedValue(supabase);
    const fd = new FormData();
    fd.append("name", "Cebu 09.06.26 MH.xlsx");
    fd.append("name", "Indonesia freshwater 16.06.26 MH.xlsx");
    await deleteStocklists(fd);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/stocklists");
    expect(revalidatePathMock).toHaveBeenCalledWith("/stocklists");
  });

  it("throws when Supabase reports an error", async () => {
    createClientMock.mockResolvedValue(
      storageDouble({ removeError: { message: "permission denied" } }),
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
