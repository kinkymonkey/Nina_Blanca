"use client";

import { useState, useTransition } from "react";
import { joinNovenaVigilAction } from "@/app/actions";
import { Glyph } from "@/components/glyph";

export function SilentCandleOffer({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [label, setLabel] = useState("Offer Silent Candle");
  const [glow, setGlow] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <>
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-high">
        <div
          className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
            glow ? "bg-primary/50" : "bg-primary/20"
          }`}
        />
        <span className={glow ? "inline-flex scale-125 transition-transform duration-300" : "inline-flex transition-transform duration-300"}>
          <Glyph name="mode_heat" filled size={32} />
        </span>
      </div>
      <div>
        <p className="font-display text-[32px] leading-none font-semibold tracking-wide text-primary">
          {count.toLocaleString("en-US")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          devotees currently holding vigil together
        </p>
      </div>
      <button
        type="button"
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-surface-highest px-4 py-2 text-[11px] font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-high"
        onClick={() => {
          setCount((value) => value + 1);
          setLabel("Candle Kindled in Prayer");
          setGlow(true);
          window.setTimeout(() => setGlow(false), 300);
          startTransition(() => {
            void joinNovenaVigilAction();
          });
        }}
      >
        <Glyph name="local_fire_department" size={16} />
        {label}
      </button>
    </>
  );
}
