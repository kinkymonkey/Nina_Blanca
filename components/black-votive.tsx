"use client";

import { useState, useTransition } from "react";
import { offerBlackVotiveAction } from "@/app/actions";
import { Glyph } from "@/components/glyph";

export function BlackVotive({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(async () => {
          const ok = await offerBlackVotiveAction();
          if (!ok) return;
          setCount((value) => value + 1);
        });
      }}
      className="flex w-full items-center justify-between rounded-sm bg-surface-container p-4 text-left hover:bg-surface-high"
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-highest ${
            count > 0 ? "text-primary" : "text-outline"
          }`}
        >
          <Glyph name="candle" size={24} filled={count > 0} />
        </span>
        <div>
          <div className="text-[12px] font-semibold tracking-wider text-on-surface uppercase">
            Black votive offering
          </div>
          <div className="text-sm text-on-surface-variant">candles burning in vigil</div>
        </div>
      </div>
      <span className="font-display text-[28px] leading-none text-primary">{count.toLocaleString("en-US")}</span>
    </button>
  );
}
