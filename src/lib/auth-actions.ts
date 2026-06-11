"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function loginAction(formData: FormData) {
  const email = (formData.get("username") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";
  const redirectTo = (formData.get("redirectTo") as string | null) || "/";

  if (!email || !password) {
    redirect(`/login?error=missing&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      `/login?error=invalid&redirectTo=${encodeURIComponent(redirectTo)}`,
    );
  }

  redirect(redirectTo);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
