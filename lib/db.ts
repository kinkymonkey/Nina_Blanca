import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local.");
  }
  return neon(url);
}

export async function ensureSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS petitions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      body text NOT NULL,
      category text NOT NULL,
      display_name text,
      privacy text NOT NULL DEFAULT 'public',
      vigil_count integer NOT NULL DEFAULT 1,
      candle boolean NOT NULL DEFAULT false,
      hidden boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS sanctuary_counters (
      key text PRIMARY KEY,
      value integer NOT NULL DEFAULT 0
    )
  `;
  await sql`
    INSERT INTO sanctuary_counters (key, value)
    VALUES ('silent_candles', 0), ('novena_vigil', 0)
    ON CONFLICT (key) DO NOTHING
  `;
}
