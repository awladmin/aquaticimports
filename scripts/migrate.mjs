import 'dotenv/config';
import pg from 'pg';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('SUPABASE_DB_URL not set');
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();

await client.query(`
  create table if not exists public.schema_migrations (
    version text primary key,
    applied_at timestamptz not null default now()
  )
`);

const dir = 'supabase/migrations';
const files = (await readdir(dir)).filter(f => f.endsWith('.sql')).sort();

let applied = 0;
for (const file of files) {
  const version = file.replace(/\.sql$/, '');
  const { rows } = await client.query(
    'select 1 from public.schema_migrations where version = $1',
    [version]
  );
  if (rows.length) {
    console.log(`skip  ${version}`);
    continue;
  }
  const sql = await readFile(join(dir, file), 'utf8');
  console.log(`apply ${version}...`);
  await client.query('begin');
  try {
    await client.query(sql);
    await client.query(
      'insert into public.schema_migrations (version) values ($1)',
      [version]
    );
    await client.query('commit');
    console.log(`      ${version} applied`);
    applied++;
  } catch (e) {
    await client.query('rollback');
    console.error(`      FAIL ${version}: ${e.message}`);
    await client.end();
    process.exit(1);
  }
}

await client.end();
console.log(`done. ${applied} new migration(s) applied.`);
