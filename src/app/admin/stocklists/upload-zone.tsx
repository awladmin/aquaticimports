"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "stocklists";

type UploadProgress = { current: number; total: number };

export function UploadZone() {
  const [supabase] = useState(() => createClient());
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ name: string; error: string }[]>([]);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const upload = (selected: File[]) => {
    const list = selected.length > 0 ? selected : files;
    if (list.length === 0) return;
    setErrors([]);
    setProgress({ current: 0, total: list.length });
    startTransition(async () => {
      const newErrors: { name: string; error: string }[] = [];
      for (let i = 0; i < list.length; i++) {
        const f = list[i];
        setProgress({ current: i + 1, total: list.length });
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(f.name, f, {
            upsert: true,
            contentType: f.type || undefined,
          });
        if (error) newErrors.push({ name: f.name, error: error.message });
      }
      setErrors(newErrors);
      if (newErrors.length === 0) {
        setFiles([]);
        if (inputRef.current) inputRef.current.value = "";
      } else {
        setFiles(
          list.filter((f) => newErrors.some((x) => x.name === f.name)),
        );
      }
      setProgress(null);
      router.refresh();
    });
  };

  const fileWord = (n: number) => (n === 1 ? "file" : "files");

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
        if (e.currentTarget === e.target) setDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const dropped = Array.from(e.dataTransfer.files);
        if (dropped.length > 0) {
          setFiles(dropped);
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
        Drop stocklists here, or pick files below
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        XLSX, PDF or any file. Drop or select multiple at once. Files with the
        same name will be overwritten.
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        className="sr-only"
      />
      <div className="mt-5 flex flex-col items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          Choose files
        </Button>
        {files.length > 0 && !pending && (
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">
              Ready to upload{" "}
              <span className="font-medium text-foreground">
                {files.length} {fileWord(files.length)}
              </span>
              :
            </p>
            <ul className="space-y-0.5">
              {files.map((f) => (
                <li key={f.name} className="text-foreground">
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button
          type="button"
          variant="brand"
          onClick={() => upload([])}
          disabled={files.length === 0 || pending}
        >
          <Upload className="mr-1 h-4 w-4" />
          {pending && progress
            ? `Uploading ${progress.current} of ${progress.total}…`
            : `Upload${files.length > 1 ? ` ${files.length} files` : ""}`}
        </Button>
      </div>
      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-destructive">
          {errors.map((e) => (
            <li key={e.name}>
              <span className="font-medium">{e.name}:</span> {e.error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
