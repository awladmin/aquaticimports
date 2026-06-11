import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";
import { visibleNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brand-logo";
import { NavLink } from "./nav-link";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

export async function SiteHeader() {
  const session = await getSession();
  const isLoggedIn = !!session;
  const nav = visibleNav(isLoggedIn);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <BrandLogo />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              activeClassName="bg-accent text-accent-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-2"
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <User className="h-3.5 w-3.5" />
                </span>
                <span className="hidden text-sm font-medium sm:inline">
                  {session?.displayName ?? session?.email}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {session?.displayName ?? session?.email}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground capitalize">
                      {session?.role === "admin"
                        ? "Administrator"
                        : "Trade account"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session?.role === "admin" && (
                  <DropdownMenuItem
                    render={
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Admin dashboard
                      </Link>
                    }
                  />
                )}
                <DropdownMenuSeparator />
                <form action={logoutAction}>
                  <DropdownMenuItem
                    render={
                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    }
                  />
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5"
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              Trade login
            </Link>
          )}

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "lg:hidden"
              )}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <BrandLogo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                    activeClassName="bg-accent text-accent-foreground"
                  >
                    {item.label}
                  </NavLink>
                ))}
                {!isLoggedIn && (
                  <NavLink
                    href="/login"
                    className="mt-2 rounded-md bg-gradient-to-b from-brand-400 to-brand-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:from-brand-500 hover:to-brand-700"
                  >
                    Trade login →
                  </NavLink>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
