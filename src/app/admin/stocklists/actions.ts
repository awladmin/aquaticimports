"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

const BUCKET = "stocklists";

export async function uploadStocklist(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file selected." };
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(file.name, file, { upsert: true, contentType: file.type });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/stocklists");
  revalidatePath("/stocklists");
  return { ok: true };
}

export async function deleteStocklists(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  const names = formData.getAll("name").map(String).filter(Boolean);
  if (names.length === 0) return;

  const { error } = await supabase.storage.from(BUCKET).remove(names);
  if (error) throw new Error(`Failed to delete: ${error.message}`);

  revalidatePath("/admin/stocklists");
  revalidatePath("/stocklists");
}
