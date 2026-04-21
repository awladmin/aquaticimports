import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  variant = "horizontal",
  size = "md",
}: {
  className?: string;
  variant?: "horizontal" | "mark";
  size?: "sm" | "md" | "lg";
}) {
  const markSize =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const iconSize =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-full text-white shadow-sm ring-1 ring-black/5",
          markSize
        )}
        style={{ backgroundColor: "#73C9B4" }}
      >
        <svg
          viewBox="0 0 24 24"
          className={iconSize}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 8 0" />
          <path d="M3 17c2.5-3 5.5-3 8 0s5.5 3 8 0" />
          <circle cx="17" cy="7.5" r="1.3" fill="currentColor" />
        </svg>
      </span>
      {variant === "horizontal" && (
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Independent
          </span>
          <span
            className={cn(
              "font-semibold tracking-tight text-foreground",
              size === "sm"
                ? "text-sm"
                : size === "lg"
                  ? "text-xl"
                  : "text-base"
            )}
          >
            Aquatic Imports
            <span className="ml-1 align-super text-[0.6em] font-medium text-muted-foreground">
              Ltd
            </span>
          </span>
        </span>
      )}
    </div>
  );
}
