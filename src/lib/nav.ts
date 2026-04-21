export type NavItem = {
  href: string;
  label: string;
  gated?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/shipment-schedule", label: "Shipment Schedule", gated: true },
  { href: "/suppliers", label: "Supplier Info", gated: true },
  { href: "/news", label: "News", gated: true },
  { href: "/place-order", label: "Place Order", gated: true },
  { href: "/contact", label: "Contact Us" },
];

export function visibleNav(isLoggedIn: boolean) {
  return NAV_ITEMS.filter((item) => !item.gated || isLoggedIn);
}
