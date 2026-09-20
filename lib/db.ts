import postgres from "postgres";

let sql: postgres.Sql | null = null;

function databaseUrl() {
  const raw = process.env.DATABASE_URL?.replace(/^["']|["']$/g, "").trim();
  if (!raw) {
    throw new Error("DATABASE_URL is missing. Add your Supabase Postgres URI to .env.local.");
  }
  try {
    void new URL(raw);
    return raw;
  } catch {
    const stripped = raw.replace(/^postgres(ql)?:\/\//, "");
    const at = stripped.lastIndexOf("@");
    if (at < 0) {
      throw new Error("DATABASE_URL is invalid.");
    }
    const userinfo = stripped.slice(0, at);
    const host = stripped.slice(at + 1);
    const colon = userinfo.indexOf(":");
    const user = encodeURIComponent(colon >= 0 ? userinfo.slice(0, colon) : userinfo);
    const pass = encodeURIComponent(colon >= 0 ? userinfo.slice(colon + 1) : "");
    const proto = raw.startsWith("postgresql") ? "postgresql" : "postgres";
    return `${proto}://${user}:${pass}@${host}`;
  }
}

export function getSql() {
  if (sql) return sql;
  sql = postgres(databaseUrl(), {
    ssl: "require",
    prepare: false,
    max: 4,
    connect_timeout: 3,
    idle_timeout: 10,
  });
  return sql;
}

export async function ensureSchema() {
  const client = getSql();
  await client`
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
  await client`
    CREATE TABLE IF NOT EXISTS sanctuary_counters (
      key text PRIMARY KEY,
      value integer NOT NULL DEFAULT 0
    )
  `;
  await client`
    INSERT INTO sanctuary_counters (key, value)
    VALUES ('silent_candles', 0), ('novena_vigil', 0), ('black_votive', 0)
    ON CONFLICT (key) DO NOTHING
  `;
  await client`
    CREATE TABLE IF NOT EXISTS newsletter_signups (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL UNIQUE,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;
}
