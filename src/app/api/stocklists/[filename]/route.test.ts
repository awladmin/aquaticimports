import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const createClientMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

function supabaseDouble(opts: {
  user: { id: string } | null;
  downloadBlob?: Blob | null;
  downloadError?: { message: string } | null;
}) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: opts.user } }),
    },
    storage: {
      from: vi.fn().mockReturnValue({
        download: vi.fn().mockResolvedValue({
          data: opts.downloadBlob ?? null,
          error: opts.downloadError ?? null,
        }),
      }),
    },
  };
}

beforeEach(() => {
  createClientMock.mockReset();
});

describe("GET /api/stocklists/[filename]", () => {
  it("returns 401 when no user is logged in", async () => {
    createClientMock.mockResolvedValue(supabaseDouble({ user: null }));
    const res = await GET(new Request("https://x"), {
      params: Promise.resolve({ filename: "any.xlsx" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 404 when Supabase has no such file", async () => {
    createClientMock.mockResolvedValue(
      supabaseDouble({
        user: { id: "u-1" },
        downloadBlob: null,
        downloadError: { message: "object not found" },
      }),
    );
    const res = await GET(new Request("https://x"), {
      params: Promise.resolve({ filename: "missing.xlsx" }),
    });
    expect(res.status).toBe(404);
  });

  it("streams the file with download headers on success", async () => {
    const blob = new Blob(["hello"], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    createClientMock.mockResolvedValue(
      supabaseDouble({ user: { id: "u-1" }, downloadBlob: blob }),
    );
    const res = await GET(new Request("https://x"), {
      params: Promise.resolve({ filename: "Cebu%2009.06.26%20MH.xlsx" }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-disposition")).toContain(
      `filename="Cebu 09.06.26 MH.xlsx"`,
    );
    expect(res.headers.get("content-type")).toBe(blob.type);
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    const body = await res.arrayBuffer();
    expect(body.byteLength).toBe(5);
  });

  it("escapes double quotes in filename for the Content-Disposition header", async () => {
    const blob = new Blob(["data"], { type: "application/octet-stream" });
    createClientMock.mockResolvedValue(
      supabaseDouble({ user: { id: "u-1" }, downloadBlob: blob }),
    );
    const tricky = encodeURIComponent('weird "name".xlsx');
    const res = await GET(new Request("https://x"), {
      params: Promise.resolve({ filename: tricky }),
    });
    expect(res.headers.get("content-disposition")).toContain(
      `filename="weird \\"name\\".xlsx"`,
    );
  });
});
