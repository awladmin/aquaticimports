"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DownloadStockButton({
  supplierName,
  fileName,
  variant = "default",
  size = "default",
  className,
  iconOnly = false,
}: {
  supplierName: string;
  fileName: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  iconOnly?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    toast.success("Stock list ready", {
      description: `${fileName} · ${supplierName}`,
    });
  }

  if (iconOnly) {
    return (
      <Button
        size="icon"
        variant="ghost"
        onClick={handle}
        aria-label={`Download ${supplierName} stock list`}
        className={cn(
          "text-brand-600 hover:bg-brand-100 hover:text-brand-700",
          className
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handle}
      variant={variant}
      size={size}
      className={cn(
        variant === "default" && "bg-brand-500 text-white hover:bg-brand-600",
        className
      )}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
      ) : (
        <FileDown className="mr-1.5 h-4 w-4" />
      )}
      {loading ? "Preparing…" : "Download stock list"}
    </Button>
  );
}
