import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSession, requireAdmin, requireSession } from "./auth";

const createClientMock = vi.hoisted(() => vi.fn());
const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("./supabase/server", () => ({
  createClient: createClientMock,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

function makeSupabase(
  user: { id: string; email?: string } | null,
  profile?: { role: "admin" | "trade"; display_name: string | null } | null,
) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: profile ?? null }),
    }),
  };
}

beforeEach(() => {
  createClientMock.mockReset();
  redirectMock.mockReset();
  redirectMock.mockImplementation((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  });
});

describe("getSession", () => {
  it("returns null when no user", async () => {
    createClientMock.mockResolvedValue(makeSupabase(null));
    expect(await getSession()).toBeNull();
  });

  it("returns trade session when user exists but no profile row", async () => {
    createClientMock.mockResolvedValue(
      makeSupabase({ id: "u1", email: "u1@example.com" }, null),
    );
    expect(await getSession()).toEqual({
      userId: "u1",
      email: "u1@example.com",
      role: "trade",
      displayName: null,
    });
  });

  it("returns admin session when profile says admin", async () => {
    createClientMock.mockResolvedValue(
      makeSupabase(
        { id: "u2", email: "rob@x.com" },
        { role: "admin", display_name: "Rob" },
      ),
    );
    const session = await getSession();
    expect(session?.role).toBe("admin");
    expect(session?.displayName).toBe("Rob");
  });

  it("defaults email to empty string when auth user has none", async () => {
    createClientMock.mockResolvedValue(
      makeSupabase({ id: "u3" }, { role: "trade", display_name: null }),
    );
    const session = await getSession();
    expect(session?.email).toBe("");
  });
});

describe("requireSession", () => {
  it("redirects to /login when there's no session", async () => {
    createClientMock.mockResolvedValue(makeSupabase(null));
    await expect(requireSession()).rejects.toThrow("REDIRECT:/login");
    expect(redirectMock).toHaveBeenCalledWith("/login");
  });

  it("returns the session when one exists", async () => {
    createClientMock.mockResolvedValue(
      makeSupabase(
        { id: "u1", email: "u1@example.com" },
        { role: "trade", display_name: null },
      ),
    );
    const session = await requireSession();
    expect(session.userId).toBe("u1");
    expect(redirectMock).not.toHaveBeenCalled();
  });
});

describe("requireAdmin", () => {
  it("redirects to /login when there's no session", async () => {
    createClientMock.mockResolvedValue(makeSupabase(null));
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/login");
  });

  it("redirects to / when session is a trade user", async () => {
    createClientMock.mockResolvedValue(
      makeSupabase(
        { id: "u1", email: "u1@example.com" },
        { role: "trade", display_name: null },
      ),
    );
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/");
  });

  it("returns the session when user is an admin", async () => {
    createClientMock.mockResolvedValue(
      makeSupabase(
        { id: "u2", email: "rob@x.com" },
        { role: "admin", display_name: "Rob" },
      ),
    );
    const session = await requireAdmin();
    expect(session.role).toBe("admin");
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
