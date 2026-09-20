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
