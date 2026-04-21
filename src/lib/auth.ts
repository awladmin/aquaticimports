import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "ai_demo_session";
export const ROLE_COOKIE = "ai_demo_role";

export type DemoRole = "trade" | "admin";

export async function getSession() {
  const store = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;
  const role = store.get(ROLE_COOKIE)?.value as DemoRole | undefined;
  if (!session) return null;
  return {
    username: session,
    role: role ?? "trade",
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
