import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.join("=") || true];
  }),
);

const email = args.email;
const role = args.role ?? "trade";
const displayName = args.name ?? null;
const password = args.password ?? generatePassword();

if (!email) {
  console.error("Usage: node --env-file=.env.local scripts/create-user.mjs --email=... [--role=admin|trade] [--name=...] [--password=...]");
  process.exit(1);
}
if (role !== "admin" && role !== "trade") {
  console.error("--role must be 'admin' or 'trade'");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Failed to create auth user:", error.message);
  process.exit(1);
}

const userId = data.user.id;

const { error: profileError } = await supabase
  .from("profiles")
  .update({ role, display_name: displayName })
  .eq("id", userId);

if (profileError) {
  console.error("User created but profile update failed:", profileError.message);
  process.exit(1);
}

console.log("OK");
console.log(`  email:    ${email}`);
console.log(`  password: ${password}`);
console.log(`  role:     ${role}`);
console.log(`  user id:  ${userId}`);
console.log("");
console.log("Share these credentials with the user via a secure channel.");

function generatePassword() {
  return randomBytes(9).toString("base64").replace(/[+/=]/g, "").slice(0, 12);
}
