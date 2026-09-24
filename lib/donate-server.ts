import { USD_TO_PHP_RATE } from "./donate";

const RATE_TTL_MS = 6 * 60 * 60 * 1000; // API updates ~daily; recheck a few times a day
let cachedRate: { value: number; at: number } | null = null;

export async function getUsdToPhpRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedRate.at < RATE_TTL_MS) {
    return cachedRate.value;
  }
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`rate API ${res.status}`);
    const data = (await res.json()) as { rates?: Record<string, number> };
    const rate = data.rates?.PHP;
    if (!rate || !Number.isFinite(rate)) throw new Error("no PHP rate in response");
    cachedRate = { value: rate, at: Date.now() };
    return rate;
  } catch {
    return USD_TO_PHP_RATE;
  }
}

export function paymongoConfigured(): boolean {
  return Boolean(process.env.PAYMONGO_SECRET_KEY?.trim());
}

export function paymongoMode(): "test" | "live" | "unknown" {
  const secret = process.env.PAYMONGO_SECRET_KEY?.trim() || "";
  const mode = process.env.PAYMONGO_MODE?.trim().toLowerCase();
  if (secret.startsWith("sk_live") || mode === "live") return "live";
  if (secret.startsWith("sk_test") || mode === "test") return "test";
  return secret ? "unknown" : "unknown";
}
