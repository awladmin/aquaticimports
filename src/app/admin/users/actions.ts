"use server";

import { revalidatePath } from "next/cache";
import { randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export type CreateUserResult =
  | { ok: true; email: string; password: string }
  | { ok: false; error: string };

function generatePassword() {
  return randomBytes(9).toString("base64").replace(/[+/=]/g, "").slice(0, 12);
}

export async function createUser(formData: FormData): Promise<CreateUserResult> {
  await requireAdmin();

  const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? "";
  const role = (formData.get("role") as string | null) ?? "trade";
  const displayName = (formData.get("displayName") as string | null)?.trim() ?? "";

  if (!email) return { ok: false, error: "Email is required." };
  if (!displayName) return { ok: false, error: "Name is required." };
  if (role !== "admin" && role !== "trade") {
    return { ok: false, error: "Invalid role." };
  }

  const password = generatePassword();
  const admin = await createAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) return { ok: false, error: error.message };

  const { error: profileError } = await admin
    .from("profiles")
    .update({ role, display_name: displayName })
    .eq("id", data.user.id);
  if (profileError) {
    // Roll back auth user so we don't leave an orphaned account.
    await admin.auth.admin.deleteUser(data.user.id);
    return { ok: false, error: profileError.message };
  }

  revalidatePath("/admin/users");
  return { ok: true, email, password };
}

export async function deleteUser(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const userId = (formData.get("userId") as string | null) ?? "";

  if (!userId) throw new Error("Missing user id.");
  if (userId === session.userId) {
    throw new Error("You can't delete your own account.");
  }

  const admin = await createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}

export async function updateUserRole(formData: FormData) {
  const session = await requireAdmin();
  const userId = (formData.get("userId") as string | null) ?? "";
  const role = (formData.get("role") as string | null) ?? "";

  if (!userId) return { ok: false, error: "Missing user id." };
  if (userId === session.userId) {
    return { ok: false, error: "You can't change your own role." };
  }
  if (role !== "admin" && role !== "trade") {
    return { ok: false, error: "Invalid role." };
  }

  const admin = await createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ role })
    .eq("id", userId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

export type ResetPasswordResult =
  | { ok: true; email: string; password: string }
  | { ok: false; error: string };

export async function resetUserPassword(
  formData: FormData,
): Promise<ResetPasswordResult> {
  await requireAdmin();
  const userId = (formData.get("userId") as string | null) ?? "";
  if (!userId) return { ok: false, error: "Missing user id." };

  const password = generatePassword();
  const admin = await createAdminClient();

  const { data, error } = await admin.auth.admin.updateUserById(userId, {
    password,
  });
  if (error || !data.user) {
    return { ok: false, error: error?.message ?? "Could not reset password." };
  }

  revalidatePath("/admin/users");
  return { ok: true, email: data.user.email ?? "", password };
}
