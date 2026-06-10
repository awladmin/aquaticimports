import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";
type Variant = "default" | "white";

export function BrandLogo({
  className,
  size = "md",
  variant = "default",
}: {
  className?: string;
  size?: Size;
  variant?: Variant;
}) {
  const heights: Record<Size, number> = {
    sm: 28,
    md: 64,
    lg: 76,
    xl: 96,
    "2xl": 140,
  };
  const h = heights[size];
  const src = variant === "white" ? "/logo-white.svg" : "/logo.svg";

  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ height: h }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Independent Aquatic Imports"
        className="h-full w-auto"
        style={{ height: h }}
      />
    </span>
  );
}
