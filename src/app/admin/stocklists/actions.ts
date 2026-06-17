"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

const BUCKET = "stocklists";

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
