export type NavItem = {
  href: string;
  label: string;
  gated?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/stocklists", label: "Stocklists", gated: true },
  { href: "/contact", label: "Contact Us" },
];

export function visibleNav(isLoggedIn: boolean) {
  return NAV_ITEMS.filter((item) => !item.gated || isLoggedIn);
}
