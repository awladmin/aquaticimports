import 'dotenv/config';
import pg from 'pg';

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('SUPABASE_DB_URL not set in .env.local');
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
try {
  await client.connect();
  const { rows } = await client.query("SELECT NOW() AS now, current_user, version() AS pg_version");
  console.log('OK', rows[0]);
} catch (e) {
  console.error('FAIL', e.message);
  process.exit(1);
} finally {
  await client.end();
}
