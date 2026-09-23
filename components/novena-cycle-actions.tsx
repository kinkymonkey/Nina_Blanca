"use client";

import { useEffect, useState, useTransition } from "react";
import { joinNovenaVigilAction } from "@/app/actions";
import { Glyph } from "@/components/glyph";

const LIT_KEY = "nina-day-candle";

function todayStamp(day: number) {
  return `${new Date().toISOString().slice(0, 10)}-${day}`;
}

export function NovenaCycleActions({ day }: { day: number }) {
  const [done, setDone] = useState(false);
  const [lit, setLit] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const today = todayStamp(day);
      setDone(window.localStorage.getItem("nina-novena-complete") === today);
      setLit(window.sessionStorage.getItem(LIT_KEY) === today);
    } catch {
      setDone(false);
      setLit(false);
    }
  }, [day]);

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button
        type="button"
        className={
          lit
            ? "inline-flex items-center gap-2 rounded-sm bg-primary-container px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase shadow-[0_0_24px_rgba(235,192,117,0.8)]"
            : "inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
        }
        onClick={() => {
          const next = !lit;
          setLit(next);
          try {
            const today = todayStamp(day);
            if (next) window.sessionStorage.setItem(LIT_KEY, today);
            else window.sessionStorage.removeItem(LIT_KEY);
          } catch {
            /* ignore */
          }
          if (!next) {
            window.dispatchEvent(new CustomEvent("nina-novena-vigil", { detail: -1 }));
            return;
          }
          startTransition(async () => {
            const ok = await joinNovenaVigilAction();
            if (!ok) {
              setLit(false);
              try {
                window.sessionStorage.removeItem(LIT_KEY);
              } catch {
                /* ignore */
              }
              return;
            }
            window.dispatchEvent(new CustomEvent("nina-novena-vigil", { detail: 1 }));
          });
        }}
      >
        <span className={lit ? "inline-flex animate-bounce" : "inline-flex"}>
          <Glyph name="local_fire_department" size={18} />
        </span>
        {lit ? "Votive Burning (Luminosity Active)" : `Light Day ${day} Candle`}
      </button>
      <button
        type="button"
        className={
          done
            ? "inline-flex items-center gap-2 rounded-sm bg-surface-highest px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-surface uppercase opacity-80"
            : "inline-flex items-center gap-2 rounded-sm bg-secondary-container px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-surface uppercase"
        }
        onClick={() => {
          const next = !done;
          setDone(next);
          try {
            const today = todayStamp(day);
            if (next) window.localStorage.setItem("nina-novena-complete", today);
            else window.localStorage.removeItem("nina-novena-complete");
          } catch {
            setDone(false);
          }
        }}
      >
        {done ? (
          <>
            <Glyph name="check_circle" size={16} />
            Day {day} Completed In Vigil
          </>
        ) : (
          `Mark Day ${day} Complete`
        )}
      </button>
    </div>
  );
}
