import { createHash } from "crypto";
import { headers } from "next/headers";
import { getSql } from "@/lib/db";

const LIMITS = {
  petition: 5,
  newsletter: 5,
  counter: 30,
} as const;

export class RateLimitError extends Error {
  constructor() {
    super("Please wait a while before sending another one.");
  }
}

export async function assertRateLimit(action: keyof typeof LIMITS) {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim() || headerList.get("x-real-ip") || "local";
  const key = createHash("sha256").update(`nina-blanca|${action}|${ip}`).digest("hex");
  const sql = getSql();
  const rows = await sql`
    INSERT INTO rate_limits (key, count, window_start)
    VALUES (${key}, 1, now())
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN rate_limits.window_start < now() - interval '1 hour' THEN 1
        ELSE rate_limits.count + 1
      END,
      window_start = CASE
        WHEN rate_limits.window_start < now() - interval '1 hour' THEN now()
        ELSE rate_limits.window_start
      END
    RETURNING count
  `;
  const count = Number((rows[0] as { count: number }).count);
  if (count > LIMITS[action]) {
    throw new RateLimitError();
  }
}
