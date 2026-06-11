import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createUser,
  deleteUser,
  resetUserPassword,
  updateUserRole,
} from "./actions";

const requireAdminMock = vi.hoisted(() => vi.fn());
const createAdminClientMock = vi.hoisted(() => vi.fn());
const revalidatePathMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  requireAdmin: requireAdminMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  createAdminClient: createAdminClientMock,
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

function adminClientDouble(opts: {
  createUserResult?: { user: { id: string; email: string } } | null;
  createUserError?: { message: string } | null;
  profileUpdateError?: { message: string } | null;
  updateUserResult?: { user: { id: string; email: string } } | null;
  updateUserError?: { message: string } | null;
  deleteUserError?: { message: string } | null;
}) {
  return {
    auth: {
      admin: {
        createUser: vi.fn().mockResolvedValue({
          data: opts.createUserResult ?? { user: { id: "new-user", email: "new@x.com" } },
          error: opts.createUserError ?? null,
        }),
        updateUserById: vi.fn().mockResolvedValue({
          data: opts.updateUserResult ?? { user: { id: "u-1", email: "u@x.com" } },
          error: opts.updateUserError ?? null,
        }),
        deleteUser: vi.fn().mockResolvedValue({
          error: opts.deleteUserError ?? null,
        }),
      },
    },
    from: vi.fn().mockReturnValue({
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: opts.profileUpdateError ?? null }),
    }),
  };
}

beforeEach(() => {
  requireAdminMock.mockReset();
  createAdminClientMock.mockReset();
  revalidatePathMock.mockReset();
  requireAdminMock.mockResolvedValue({
    userId: "admin-1",
    email: "rob@x.com",
    role: "admin",
    displayName: "Rob",
  });
});

describe("createUser", () => {
  it("rejects when email is missing", async () => {
    const fd = new FormData();
    fd.set("displayName", "Test");
    fd.set("role", "trade");
    const result = await createUser(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/email/i);
  });

  it("rejects when displayName is missing", async () => {
    const fd = new FormData();
    fd.set("email", "x@y.com");
    fd.set("role", "trade");
    const result = await createUser(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/name/i);
  });

  it("rejects when role is invalid", async () => {
    const fd = new FormData();
    fd.set("email", "x@y.com");
    fd.set("displayName", "Test");
    fd.set("role", "owner");
    const result = await createUser(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/role/i);
  });

  it("creates user and returns generated password on success", async () => {
    createAdminClientMock.mockResolvedValue(adminClientDouble({}));
    const fd = new FormData();
    fd.set("email", "Customer@TheirShop.CO.UK");
    fd.set("displayName", "Their Shop");
    fd.set("role", "trade");
    const result = await createUser(fd);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.email).toBe("customer@theirshop.co.uk"); // lowercased
      expect(result.password).toHaveLength(12);
    }
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/users");
  });

  it("rolls back the auth user if profile update fails", async () => {
    const supabase = adminClientDouble({
      profileUpdateError: { message: "constraint violation" },
    });
    createAdminClientMock.mockResolvedValue(supabase);
    const fd = new FormData();
    fd.set("email", "x@y.com");
    fd.set("displayName", "Test");
    fd.set("role", "trade");
    const result = await createUser(fd);
    expect(result.ok).toBe(false);
    expect(supabase.auth.admin.deleteUser).toHaveBeenCalledWith("new-user");
  });

  it("surfaces auth createUser errors", async () => {
    createAdminClientMock.mockResolvedValue(
      adminClientDouble({ createUserError: { message: "email already in use" } }),
    );
    const fd = new FormData();
    fd.set("email", "dup@x.com");
    fd.set("displayName", "Dup");
    fd.set("role", "trade");
    const result = await createUser(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("email already in use");
  });
});

describe("deleteUser", () => {
  it("throws when userId is missing", async () => {
    const fd = new FormData();
    await expect(deleteUser(fd)).rejects.toThrow(/missing user id/i);
  });

  it("prevents admin from deleting themselves", async () => {
    const fd = new FormData();
    fd.set("userId", "admin-1");
    await expect(deleteUser(fd)).rejects.toThrow(/own account/i);
  });

  it("deletes a different user and revalidates", async () => {
    createAdminClientMock.mockResolvedValue(adminClientDouble({}));
    const fd = new FormData();
    fd.set("userId", "u-victim");
    await deleteUser(fd);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/users");
  });

  it("throws when Supabase delete returns an error", async () => {
    createAdminClientMock.mockResolvedValue(
      adminClientDouble({ deleteUserError: { message: "not found" } }),
    );
    const fd = new FormData();
    fd.set("userId", "u-victim");
    await expect(deleteUser(fd)).rejects.toThrow(/not found/);
  });
});

describe("updateUserRole", () => {
  it("rejects when userId is missing", async () => {
    const fd = new FormData();
    fd.set("role", "admin");
    const result = await updateUserRole(fd);
    expect(result.ok).toBe(false);
  });

  it("prevents admin from changing their own role", async () => {
    const fd = new FormData();
    fd.set("userId", "admin-1");
    fd.set("role", "trade");
    const result = await updateUserRole(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/own role/i);
  });

  it("rejects invalid roles", async () => {
    const fd = new FormData();
    fd.set("userId", "u-2");
    fd.set("role", "superadmin");
    const result = await updateUserRole(fd);
    expect(result.ok).toBe(false);
  });

  it("updates role and revalidates on success", async () => {
    createAdminClientMock.mockResolvedValue(adminClientDouble({}));
    const fd = new FormData();
    fd.set("userId", "u-2");
    fd.set("role", "admin");
    const result = await updateUserRole(fd);
    expect(result.ok).toBe(true);
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/users");
  });
});

describe("resetUserPassword", () => {
  it("rejects when userId is missing", async () => {
    const fd = new FormData();
    const result = await resetUserPassword(fd);
    expect(result.ok).toBe(false);
  });

  it("returns email and a 12-char password on success", async () => {
    createAdminClientMock.mockResolvedValue(adminClientDouble({}));
    const fd = new FormData();
    fd.set("userId", "u-3");
    const result = await resetUserPassword(fd);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.password).toHaveLength(12);
      expect(result.email).toBe("u@x.com");
    }
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/users");
  });

  it("surfaces Supabase errors", async () => {
    createAdminClientMock.mockResolvedValue(
      adminClientDouble({
        updateUserResult: null,
        updateUserError: { message: "user not found" },
      }),
    );
    const fd = new FormData();
    fd.set("userId", "u-ghost");
    const result = await resetUserPassword(fd);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/not found/);
  });
});
