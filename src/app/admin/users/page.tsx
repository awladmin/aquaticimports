import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { createUser, deleteUser, resetUserPassword } from "./actions";
import {
  CreateUserSubmit,
  DeleteUserSubmit,
  ResetPasswordSubmit,
} from "./submit-buttons";

type SearchParams = Promise<{
  action?: "created" | "reset";
  email?: string;
  password?: string;
  error?: string;
}>;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await requireAdmin();
  const { action, email: shownEmail, password: shownPassword, error } =
    await searchParams;

  const admin = await createAdminClient();
  const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 200 });
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, role, display_name");

  const profileMap = new Map(
    (profiles ?? []).map((p) => [
      p.id,
      { role: p.role as "admin" | "trade", displayName: p.display_name as string | null },
    ]),
  );

  const users = (usersData?.users ?? [])
    .map((u) => ({
      id: u.id,
      email: u.email ?? "",
      createdAt: u.created_at,
      role: profileMap.get(u.id)?.role ?? "trade",
      displayName: profileMap.get(u.id)?.displayName ?? null,
    }))
    .sort((a, b) => a.email.localeCompare(b.email));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Trade users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create accounts for trade customers, reset forgotten passwords, and
          remove users who no longer need access.
        </p>
      </header>

      {action && shownEmail && shownPassword && (
        <div className="relative rounded-lg border border-emerald-200 bg-emerald-50 p-4 pr-10 text-sm">
          <Link
            href="/admin/users"
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-md p-1 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900"
          >
            <X className="h-4 w-4" />
          </Link>
          <p className="font-semibold text-emerald-900">
            {action === "created" ? "User created." : "Password reset."}
          </p>
          <p className="mt-1 text-emerald-800">
            {action === "created"
              ? "Share these credentials securely. The password is shown once and won't be visible after you leave this page."
              : "Share this new password securely. It's shown once and won't be visible after you leave this page."}
          </p>
          <dl className="mt-3 grid gap-1 font-mono text-xs text-emerald-900">
            <div><span className="opacity-60">Email:&nbsp;</span>{shownEmail}</div>
            <div><span className="opacity-60">Password:&nbsp;</span>{shownPassword}</div>
          </dl>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <CreateUserForm />

      <div className="overflow-hidden rounded-lg border border-border/70 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {users.map((u) => {
              const isSelf = u.id === session.userId;
              return (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{u.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.displayName ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        u.role === "admin"
                          ? "border-brand-300 bg-brand-50 text-brand-700"
                          : ""
                      }
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {isSelf ? (
                        <span className="text-xs italic text-muted-foreground">
                          (you)
                        </span>
                      ) : (
                        <>
                          <form action={handleResetPassword}>
                            <input type="hidden" name="userId" value={u.id} />
                            <ResetPasswordSubmit />
                          </form>
                          <form action={deleteUser}>
                            <input type="hidden" name="userId" value={u.id} />
                            <DeleteUserSubmit />
                          </form>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

async function handleResetPassword(formData: FormData) {
  "use server";
  const result = await resetUserPassword(formData);
  const { redirect } = await import("next/navigation");
  if (result.ok) {
    redirect(
      `/admin/users?action=reset&email=${encodeURIComponent(result.email)}&password=${encodeURIComponent(result.password)}`,
    );
  } else {
    redirect(`/admin/users?error=${encodeURIComponent(result.error)}`);
  }
}

function CreateUserForm() {
  async function handleCreate(formData: FormData) {
    "use server";
    const result = await createUser(formData);
    const { redirect } = await import("next/navigation");
    if (result.ok) {
      redirect(
        `/admin/users?action=created&email=${encodeURIComponent(result.email)}&password=${encodeURIComponent(result.password)}`,
      );
    } else {
      redirect(`/admin/users?error=${encodeURIComponent(result.error)}`);
    }
  }

  return (
    <form
      action={handleCreate}
      className="rounded-lg border border-border/70 bg-card p-4"
    >
      <p className="text-sm font-semibold">Add a user</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        A 12-character password is auto-generated. You&apos;ll see it once
        immediately after creation.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_140px_auto]">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="customer@theirshop.co.uk"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="displayName" className="text-xs">Name</Label>
          <Input
            id="displayName"
            name="displayName"
            placeholder="Their Shop Ltd"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role" className="text-xs">Role</Label>
          <select
            id="role"
            name="role"
            defaultValue="trade"
            className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="trade">Trade</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-end">
          <CreateUserSubmit />
        </div>
      </div>
    </form>
  );
}
