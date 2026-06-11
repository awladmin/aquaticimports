import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";
import { BrandLogo } from "@/components/brand-logo";
import { AdminNav } from "./admin-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <BrandLogo size="sm" />
              <Badge variant="outline" className="border-brand-300 bg-brand-50 text-brand-700">
                Admin
              </Badge>
            </div>

            <AdminNav />

            <div className="mt-4 rounded-lg bg-muted/60 p-3">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="text-sm font-medium">{session.displayName ?? session.email}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="flex-1 justify-start px-2"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                    Back to site
                  </Link>
                </Button>
                <form action={logoutAction}>
                  <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
