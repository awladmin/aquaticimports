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

  await supabase.from("stocklist_order").delete().in("name", names);

  revalidatePath("/admin/stocklists");
  revalidatePath("/stocklists");
}

export async function reorderStocklists(orderedNames: string[]): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  const names = orderedNames.map(String).filter(Boolean);
  if (names.length === 0) return;

  const rows = names.map((name, i) => ({ name, position: i + 1 }));

  const { error: deleteError } = await supabase
    .from("stocklist_order")
    .delete()
    .in("name", names);
  if (deleteError) {
    throw new Error(`Failed to clear positions: ${deleteError.message}`);
  }

  const { error: insertError } = await supabase
    .from("stocklist_order")
    .insert(rows);
  if (insertError) {
    throw new Error(`Failed to save positions: ${insertError.message}`);
  }

  revalidatePath("/admin/stocklists");
  revalidatePath("/stocklists");
}
