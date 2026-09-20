"use client";

import { useState } from "react";
import { CUSTOM_MAX_USD, CUSTOM_MIN_USD, DONATION_PRESETS } from "@/lib/donate";

export function DonationOfferings({
  configured,
}: {
  configured: boolean;
  mode: "test" | "live" | "unknown";
}) {
  const [custom, setCustom] = useState("15");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function start(usd: number, key: string) {
    setError("");
    setBusy(key);
    try {
      const res = await fetch("/api/donate/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usd }),
      });
      const data = (await res.json()) as { ok?: boolean; checkout_url?: string; error?: string };
      if (!res.ok || !data.checkout_url) {
        setError("Checkout did not open. No charge was made.");
        return;
      }
      window.location.href = data.checkout_url;
    } catch {
      setError("The network failed before checkout opened. No charge was made.");
    } finally {
      setBusy(null);
    }
  }

  const customUsd = Number(custom);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {DONATION_PRESETS.map((tier) => (
          <div key={tier.usd} className="flex flex-col rounded-sm bg-surface-low p-4">
            <p className="font-display text-[22px] text-primary">${tier.usd}</p>
            <p className="mt-2 flex-1 text-xs text-on-surface-variant">{tier.body}</p>
            <button
              type="button"
              disabled={!configured || Boolean(busy)}
              onClick={() => start(tier.usd, String(tier.usd))}
              className="mt-4 rounded-sm bg-primary px-3 py-2 text-[11px] font-semibold tracking-wider text-on-primary uppercase disabled:opacity-60"
            >
              {busy === String(tier.usd) ? "Opening…" : `Give $${tier.usd}`}
            </button>
          </div>
        ))}
      </div>
      <div className="rounded-sm bg-surface-low p-4">
        <h3 className="text-[12px] font-semibold tracking-wider uppercase">Another amount</h3>
        <p className="mt-2 text-xs text-on-surface-variant">
          Whole dollars from ${CUSTOM_MIN_USD} to ${CUSTOM_MAX_USD}.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="text-sm text-on-surface">
            $
            <input
              type="number"
              min={CUSTOM_MIN_USD}
              max={CUSTOM_MAX_USD}
              step={1}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="ml-2 w-24 rounded-sm border border-outline-variant/40 bg-surface px-2 py-1.5"
            />
          </label>
          <button
            type="button"
            disabled={!configured || Boolean(busy)}
            onClick={() => start(Math.round(customUsd), "custom")}
            className="rounded-sm border border-primary/40 px-4 py-2 text-[11px] font-semibold tracking-wider text-primary uppercase disabled:opacity-60"
          >
            {busy === "custom" ? "Opening…" : "Give this amount"}
          </button>
        </div>
      </div>
      {error ? <p className="text-sm text-secondary">{error}</p> : null}
    </div>
  );
}
