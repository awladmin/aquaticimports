"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadStocklist } from "./actions";

export function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const upload = (selected: File | null) => {
    const f = selected ?? file;
    if (!f) return;
    const formData = new FormData();
    formData.set("file", f);
    setError(null);
    startTransition(async () => {
      const result = await uploadStocklist(formData);
      if (result.ok) {
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        // Only deactivate when leaving the drop zone itself, not children.
        if (e.currentTarget === e.target) setDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) {
          setFile(dropped);
          upload(dropped);
        }
      }}
      className={cn(
        "rounded-lg border-2 border-dashed p-8 text-center transition-colors",
        dragActive
          ? "border-brand-500 bg-brand-50"
          : "border-border bg-card",
        pending && "opacity-60 pointer-events-none",
      )}
    >
      <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
      <p className="mt-3 text-sm font-medium">
        Drop a stocklist here, or pick a file below
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        XLSX, PDF or any file. A file with the same name will be overwritten.
      </p>
      <input
        ref={inputRef}
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="sr-only"
      />
      <div className="mt-5 flex flex-col items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          Choose file
        </Button>
        {file && !pending && (
          <p className="text-xs text-muted-foreground">
            Ready:{" "}
            <span className="font-medium text-foreground">{file.name}</span>
          </p>
        )}
        <Button
          type="button"
          variant="brand"
          onClick={() => upload(null)}
          disabled={!file || pending}
        >
          <Upload className="mr-1 h-4 w-4" />
          {pending ? "Uploading…" : "Upload"}
        </Button>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
}
