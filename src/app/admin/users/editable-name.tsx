"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserName } from "./actions";

export function EditableName({
  userId,
  name,
}: {
  userId: string;
  name: string | null;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const cancel = () => {
    setValue(name ?? "");
    setError(null);
    setEditing(false);
  };

  const save = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Name is required.");
      return;
    }
    if (trimmed === (name ?? "")) {
      setEditing(false);
      return;
    }
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("userId", userId);
      fd.set("displayName", trimmed);
      const result = await updateUserName(fd);
      if (result.ok) {
        setEditing(false);
      } else {
        setError(result.error);
      }
    });
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <span className={name ? "" : "text-muted-foreground"}>
          {name ?? "-"}
        </span>
        <button
          type="button"
          onClick={() => {
            setValue(name ?? "");
            setError(null);
            setEditing(true);
          }}
          aria-label="Edit name"
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Pencil className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              save();
            } else if (e.key === "Escape") {
              e.preventDefault();
              cancel();
            }
          }}
          autoFocus
          disabled={pending}
          className="h-8 min-w-0 flex-1"
          aria-label="Display name"
        />
        <Button
          type="button"
          variant="brand"
          size="sm"
          onClick={save}
          disabled={pending}
          aria-label="Save name"
          className="h-8 w-8 p-0"
        >
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={cancel}
          disabled={pending}
          aria-label="Cancel"
          className="h-8 w-8 p-0"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
