"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Trash2, KeyRound, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreateUserSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="brand"
      disabled={pending}
      aria-busy={pending}
      className="h-9 min-w-[110px]"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-label="Creating" />
      ) : (
        <>
          <UserPlus className="mr-1 h-4 w-4" />
          Create
        </>
      )}
    </Button>
  );
}

export function ResetPasswordSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="sm"
      variant="ghost"
      disabled={pending}
      aria-busy={pending}
      className="text-xs"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-label="Resetting" />
      ) : (
        <>
          <KeyRound className="mr-1 h-4 w-4" />
          Reset password
        </>
      )}
    </Button>
  );
}

export function DeleteUserSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="sm"
      variant="ghost"
      disabled={pending}
      aria-busy={pending}
      className="text-destructive"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-label="Deleting" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
