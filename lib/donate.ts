/** Fallback only — used when the live rate fetch fails. Kept close to reality by hand. */
export const USD_TO_PHP_RATE = 62;

export const DONATION_PRESETS = [
  {
    usd: 5,
    title: "$5",
    body: "A small gift toward keeping the site online.",
  },
  {
    usd: 10,
    title: "$10",
    body: "Helps with hosting and writing.",
  },
  {
    usd: 20,
    title: "$20",
    body: "A larger gift for the same work.",
  },
] as const;

export const CUSTOM_MIN_USD = 3;
export const CUSTOM_MAX_USD = 250;

export function phpFromUsd(usd: number, rate: number = USD_TO_PHP_RATE): number {
  return Math.round(usd * rate);
}

export function phpCentavosFromUsd(usd: number, rate: number = USD_TO_PHP_RATE): number {
  return phpFromUsd(usd, rate) * 100;
}
