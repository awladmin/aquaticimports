"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileSpreadsheet, Image as ImageIcon, Save, Upload } from "lucide-react";

export function NewSupplierForm({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Freshwater",
  ]);
  const [xlsxName, setXlsxName] = useState<string | null>(null);
  const [imgName, setImgName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function toggleCategory(c: string) {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast.success("Supplier created", {
      description:
        "Saved as draft. Trade customers won't see it until you publish.",
    });
    router.push("/admin/suppliers");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="border-border/70">
        <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Supplier name *</Label>
            <Input id="name" placeholder="e.g. Negombo Marine" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input id="country" placeholder="e.g. Sri Lanka" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">ISO country code</Label>
            <Input id="code" placeholder="e.g. LK" maxLength={2} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="summary">Short summary</Label>
            <Input
              id="summary"
              placeholder="One-line summary shown on supplier cards"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Long-form description shown on the supplier page"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => {
                const active = selectedCategories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={
                      active
                        ? "rounded-full border border-brand-500 bg-brand-500 px-3 py-1 text-xs font-medium text-white"
                        : "rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:border-brand-300 hover:text-foreground"
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardContent className="space-y-5 p-6">
          <div>
            <h3 className="text-base font-semibold">Stock list &amp; image</h3>
            <p className="text-sm text-muted-foreground">
              Upload the current .xlsx stock list and a representative image.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FileDrop
              icon={FileSpreadsheet}
              label="Stock list (.xlsx)"
              accept=".xlsx,.xls,.csv"
              fileName={xlsxName}
              onFile={(f) => setXlsxName(f.name)}
            />
            <FileDrop
              icon={ImageIcon}
              label="Company image"
              accept="image/*"
              fileName={imgName}
              onFile={(f) => setImgName(f.name)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold">Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Draft saves privately. Publishing makes the supplier visible to
              all trade users.
            </p>
            <div className="mt-3 flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <Checkbox defaultChecked />
                Show in public supplier directory
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                Featured supplier
              </label>
            </div>
          </div>
          <Select defaultValue="draft">
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Save as draft</SelectItem>
              <SelectItem value="publish">Publish now</SelectItem>
              <SelectItem value="schedule">Schedule publish…</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {selectedCategories.length} categories ·{" "}
          {xlsxName ? "stock list attached" : "no stock list yet"}
          {selectedCategories.length > 0 && (
            <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
              {selectedCategories.slice(0, 3).map((c) => (
                <Badge key={c} variant="outline" className="text-[10px]">
                  {c}
                </Badge>
              ))}
            </span>
          )}
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-brand-500 text-white hover:bg-brand-600"
          >
            <Save className="mr-1.5 h-4 w-4" />
            {saving ? "Saving…" : "Create supplier"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function FileDrop({
  icon: Icon,
  label,
  accept,
  fileName,
  onFile,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  accept: string;
  fileName: string | null;
  onFile: (f: File) => void;
}) {
  return (
    <label
      className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/70 bg-muted/30 p-6 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/40"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-brand-600 ring-1 ring-border/70 group-hover:text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium">{label}</span>
      {fileName ? (
        <span className="text-xs font-medium text-brand-700">{fileName}</span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Upload className="h-3 w-3" />
          Click to upload
        </span>
      )}
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </label>
  );
}
