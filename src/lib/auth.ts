import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export type Role = "admin" | "trade";

export type Session = {
  userId: string;
  email: string;
  role: Role;
  displayName: string | null;
};

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, display_name")
    .eq("id", user.id)
    .single();

  return {
    userId: user.id,
    email: user.email ?? "",
    role: (profile?.role as Role) ?? "trade",
    displayName: profile?.display_name ?? null,
  };
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (session.role !== "admin") redirect("/");
  return session;
}
