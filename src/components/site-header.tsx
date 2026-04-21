import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";
import { visibleNav } from "@/lib/nav";
import { BrandLogo } from "./brand-logo";
import { NavLink } from "./nav-link";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
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
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  <span className="hidden text-sm font-medium sm:inline">
                    {session?.username}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {session?.username}
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
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="mr-2 h-4 w-4" />
                    My account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={logoutAction} className="w-full">
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <Link href="/login">
                <ShieldCheck className="h-4 w-4" />
                Trade login
              </Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
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
                    className="mt-2 rounded-md bg-brand-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
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
