import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "stocklists";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const supabase = await createClient();

  // Auth: must be a logged-in user. RLS on storage.objects handles
  // whether they're actually allowed to read this specific file.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { filename: encoded } = await params;
  const filename = decodeURIComponent(encoded);

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .download(filename);

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const arrayBuffer = await data.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": data.type || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, '\\"')}"`,
      "Content-Length": String(arrayBuffer.byteLength),
      // Prevent CDN/proxy caching since the file may be replaced/deleted
      // and access is per-user. Short browser cache is OK.
      "Cache-Control": "private, no-store",
    },
  });
}
