"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ai-cookie-acknowledged";
const CUSTOM_EVENT = "cookie-banner-change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  // 'storage' fires across tabs; the custom event covers the current tab.
  window.addEventListener("storage", callback);
  window.addEventListener(CUSTOM_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CUSTOM_EVENT, callback);
  };
}

function getSnapshot(): "show" | "hide" {
  try {
    return localStorage.getItem(STORAGE_KEY) ? "hide" : "show";
  } catch {
    // Private mode / disabled storage — fail closed so we don't show a banner
    // that the user can never dismiss.
    return "hide";
  }
}

function getServerSnapshot(): "show" | "hide" {
  // Don't render server-side; the client effect decides.
  return "hide";
}

export function CookieBanner() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(CUSTOM_EVENT));
    }
  };

  if (state === "hide") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed right-4 bottom-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-card p-4 shadow-lg shadow-foreground/5"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-2 right-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="pr-6 text-sm text-foreground">
        We use essential cookies to keep you signed in and deliver
        stocklists. See our{" "}
        <Link href="/privacy" className="underline hover:text-brand-700">
          privacy policy
        </Link>{" "}
        for details.
      </p>
      <div className="mt-3 flex justify-end">
        <Button onClick={dismiss} size="sm" variant="brand">
          OK
        </Button>
      </div>
    </div>
  );
}
