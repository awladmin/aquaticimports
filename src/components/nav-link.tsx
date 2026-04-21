"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
  className,
  activeClassName,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors",
        className,
        isActive && (activeClassName ?? "text-brand-600")
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
