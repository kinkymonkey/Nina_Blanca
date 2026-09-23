import { ensureSchema, getSql } from "@/lib/db";
import { assertRateLimit } from "@/lib/rate-limit";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function addNewsletterSignup(email: string) {
  const clean = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    throw new Error("Enter a valid email.");
  }
  await ensureSchema();
  await assertRateLimit("newsletter");
  const sql = getSql();
  await sql`
    INSERT INTO newsletter_signups (email)
    VALUES (${clean})
    ON CONFLICT (email) DO NOTHING
  `;
}
