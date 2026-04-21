"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  ROLE_COOKIE,
  type DemoRole,
} from "./auth";

export async function loginAction(formData: FormData) {
  const username =
    (formData.get("username") as string | null)?.trim() || "trade-demo";
  const role = ((formData.get("role") as string | null) ?? "trade") as DemoRole;
  const store = await cookies();
  store.set(SESSION_COOKIE, username, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  store.set(ROLE_COOKIE, role, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  const redirectTo = (formData.get("redirectTo") as string | null) || "/";
  redirect(redirectTo);
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(ROLE_COOKIE);
  redirect("/");
}
