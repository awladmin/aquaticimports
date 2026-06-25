// Bulk-create trade users from an XLSX. Reads Email 1 + Store/Name columns,
// dedupes by lowercased email, falls back to a derived name (email prefix
// with capitalised first letter) when Store/Name is blank.
//
//   node --env-file=.env.local scripts/bulk-create-users.mjs <path-to-xlsx>
//     -> dry run: prints what would be created, no Supabase writes
//
//   node --env-file=.env.local scripts/bulk-create-users.mjs <path-to-xlsx> --commit
//     -> live: creates each user with a generated password, writes a CSV of
//        results next to the input file
//
// Output CSV columns: email, name, password, status

import XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { dirname, basename, join } from "node:path";

const args = process.argv.slice(2);
const commit = args.includes("--commit");
const inputPath = args.find((a) => !a.startsWith("--"));

if (!inputPath) {
  console.error("Usage: node --env-file=.env.local scripts/bulk-create-users.mjs <xlsx-path> [--commit]");
  process.exit(1);
}

const wb = XLSX.readFile(inputPath);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

function deriveName(email) {
  const prefix = email.split("@")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function generatePassword() {
  return randomBytes(12).toString("base64url").slice(0, 12);
}

// Pass 1: collect any non-blank names per email so duplicates don't lose them.
const givenNames = new Map();
for (const r of rows) {
  const email = String(r["Email 1"] ?? "").trim().toLowerCase();
  const name = String(r["Store/Name"] ?? "").trim();
  if (email && name && !givenNames.has(email)) {
    givenNames.set(email, name);
  }
}

// Pass 2: build deduped entry list in source order.
const entries = [];
const seen = new Set();
for (const r of rows) {
  const email = String(r["Email 1"] ?? "").trim().toLowerCase();
  if (!email || seen.has(email)) continue;
  seen.add(email);
  entries.push({ email, name: givenNames.get(email) ?? deriveName(email) });
}

console.log(`Read ${rows.length} rows from ${basename(inputPath)} -> ${entries.length} unique users.`);
const derivedCount = entries.filter((e) => !givenNames.has(e.email)).length;
console.log(`Of those, ${derivedCount} have names derived from the email prefix.`);
console.log();
console.log("Preview (first 10 + last 5):");
for (const e of entries.slice(0, 10)) {
  console.log(`  ${e.email.padEnd(48)} ${e.name}`);
}
console.log("  ...");
for (const e of entries.slice(-5)) {
  console.log(`  ${e.email.padEnd(48)} ${e.name}`);
}

if (!commit) {
  console.log();
  console.log("Dry run. Pass --commit to actually create users in Supabase.");
  process.exit(0);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log();
console.log(`Creating ${entries.length} users in Supabase...`);

const results = [];
let okCount = 0;
let skipCount = 0;
let failCount = 0;

for (const e of entries) {
  const password = generatePassword();
  const { data, error } = await supabase.auth.admin.createUser({
    email: e.email,
    password,
    email_confirm: true,
  });
  if (error) {
    const already = /already.*registered|already exists|duplicate/i.test(error.message);
    if (already) {
      skipCount++;
      results.push({ ...e, password: "", status: "already exists" });
      console.log(`SKIP ${e.email} (already exists)`);
    } else {
      failCount++;
      results.push({ ...e, password: "", status: error.message });
      console.error(`FAIL ${e.email}: ${error.message}`);
    }
    continue;
  }
  const userId = data.user.id;
  const { error: profError } = await supabase
    .from("profiles")
    .update({ display_name: e.name, role: "trade" })
    .eq("id", userId);
  if (profError) {
    await supabase.auth.admin.deleteUser(userId);
    failCount++;
    results.push({ ...e, password: "", status: `profile: ${profError.message}` });
    console.error(`FAIL ${e.email} (profile rollback): ${profError.message}`);
    continue;
  }
  okCount++;
  results.push({ ...e, password, status: "created" });
  console.log(`OK   ${e.email}`);
}

const outDir = dirname(inputPath);
const outName = basename(inputPath, ".xlsx") + "-credentials.csv";
const outPath = join(outDir, outName);

const csv = [
  "email,name,password,status",
  ...results.map((r) =>
    [
      r.email,
      `"${r.name.replace(/"/g, '""')}"`,
      r.password,
      `"${r.status.replace(/"/g, '""')}"`,
    ].join(","),
  ),
].join("\n");
writeFileSync(outPath, csv);

console.log();
console.log(`Done. ${okCount} created, ${skipCount} already existed, ${failCount} failed.`);
console.log(`Credentials written to: ${outPath}`);
