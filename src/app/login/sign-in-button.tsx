"use client";

import { useFormStatus } from "react-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="brand"
      className="w-full"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-label="Signing in" />
      ) : (
        <>
          <ShieldCheck className="mr-1.5 h-4 w-4" />
          Sign in
        </>
      )}
    </Button>
  );
}
