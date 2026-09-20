"use client";

import { useEffect, useState } from "react";
import { CopyShareButton } from "@/components/copy-share";
import { Glyph } from "@/components/glyph";
import { offerSilentCandleAction } from "@/app/actions";

const EN = [
  "Sovereign Lady of the White Veil, Holy Mother and Guardian of the Transition, I awaken into this daylight under the shelter of your immaculate shroud. Before my feet touch the earthly path, I offer the first pulse of my breath to your holy presence.",
  "Cleanse what is darkened in my mind; soften what has grown cruel in my speech; defend my threshold from deceit, envy, and untimely shadows.",
  "Take into your hands my labors of this day. Grant that I may carry the scales of justice in my heart and the gentle scythe that cuts through vanity and false illusion. With this offering of clean, clear water and fragrant light, I place myself, my loved ones, and the breath of our home in your sacred trust.",
];

const ES = [
  "Soberana Señora del Manto Blanco, Santa Niña y Guardiana del Albor, despierto ante la luz de este día bajo el cobijo de tu sagrada presencia. Antes de que mis pies pisen la tierra, entrego el primer aliento de mi pecho a tu dulce protección.",
  "Limpia lo entenebrecido en mi pensamiento; serena lo áspero de mis palabras; y resguarda las puertas de mi hogar contra toda envidia, discordia y sombra desdichada.",
  "Toma en tus manos bienhechoras mis obras de hoy. Hazme portador de tu balanza de justicia y de tu sagrada guadaña que corta toda mentira y vanidad mundana. Ante este vaso de agua fresca y esta llama que te honra, deposito mi destino en tu perpetuo amparo.",
];

export function MorningOfferingPanel({ lamps = 0 }: { lamps?: number }) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [saved, setSaved] = useState(false);
  const lines = lang === "en" ? EN : ES;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("nina-devotional-prayers") || "[]";
      const list = JSON.parse(raw) as string[];
      setSaved(list.includes("morning-offering"));
    } catch {
      setSaved(false);
    }
  }, []);

  return (
    <section className="relative overflow-hidden rounded-lg bg-surface-low shadow-xl">
      <div className="relative z-10 space-y-8 p-6 md:p-10 lg:p-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                Solemn Daily Rite
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-outline-variant" />
              <span className="text-[11px] font-semibold tracking-wider text-secondary uppercase">
                White Robe Aspect
              </span>
            </div>
            <h2 className="font-display text-[28px] leading-9 text-on-surface lg:text-[34px]">
              The Traditional Morning Offering to Niña Blanca
            </h2>
          </div>
          <div className="inline-flex rounded-sm bg-surface-lowest p-0.5">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={
                lang === "en"
                  ? "rounded-sm bg-primary-container px-3 py-1 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                  : "rounded-sm px-3 py-1 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
              }
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              className={
                lang === "es"
                  ? "rounded-sm bg-primary-container px-3 py-1 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                  : "rounded-sm px-3 py-1 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
              }
            >
              Español
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <p className="font-display text-[22px] leading-8 text-on-surface">
              <span className="float-left pr-4 pt-1 font-display text-6xl leading-[0.8] text-primary md:text-7xl">
                O
              </span>
              {lines[0]}
            </p>
            <blockquote className="rounded-lg bg-surface-lowest/80 p-5 pl-6 font-display text-[22px] leading-8 text-primary italic">
              “{lines[1]}”
            </blockquote>
            <p className="text-lg leading-relaxed text-on-surface-variant">{lines[2]}</p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm italic text-on-surface-variant">
              <span>{lang === "en" ? "Amen. Así sea." : "Amén. Así sea."}</span>
              <span className="h-px w-8 bg-outline-variant" />
              <span>
                {lang === "en"
                  ? "In the Name of the Most Holy White Mother."
                  : "En el nombre de la Santísima Muerte Blanca."}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <form action={offerSilentCandleAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                >
                  <Glyph name="local_fire_department" filled size={16} />
                  Light Lamp for this Prayer ({lamps.toLocaleString("en-US")})
                </button>
              </form>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm bg-surface-high px-4 py-2.5 text-[11px] font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-bright"
                onClick={() => {
                  try {
                    const raw = window.localStorage.getItem("nina-devotional-prayers") || "[]";
                    const list = JSON.parse(raw) as string[];
                    const next = list.includes("morning-offering")
                      ? list
                      : [...list, "morning-offering"];
                    window.localStorage.setItem("nina-devotional-prayers", JSON.stringify(next));
                    setSaved(true);
                  } catch {
                    setSaved(false);
                  }
                }}
              >
                <Glyph name="bookmark_add" size={16} />
                {saved ? "Saved to Devotional" : "Save to Devotional"}
              </button>
              <CopyShareButton
                title="The Traditional Morning Offering to Niña Blanca"
                path="/prayers"
                label="Share Prayer"
                className="inline-flex items-center rounded-sm bg-surface-high px-4 py-2.5 text-[11px] font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-bright"
              />
            </div>
          </div>

          <aside className="space-y-5 rounded-xl bg-surface-container p-6 lg:col-span-4">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Devotional Rubric
            </p>
            <h3 className="font-display text-[22px] leading-7 text-on-surface">Ritual Accompaniment</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-on-surface-variant">
              <li className="flex items-start gap-2">
                <Glyph name="water_drop" size={16} />
                Present a fresh glass of spring water on the right side of the image before speaking.
              </li>
              <li className="flex items-start gap-2">
                <Glyph name="candle" size={16} />
                Light a single pure white candle or tapers made of natural beeswax.
              </li>
              <li className="flex items-start gap-2">
                <Glyph name="self_improvement" size={16} />
                Bow your head three times at the conclusion while offering silent thanks.
              </li>
            </ul>
            <div className="rounded-lg bg-surface-lowest p-4">
              <p className="text-[11px] font-semibold tracking-wider text-on-surface uppercase">
                Recitation Hour
              </p>
              <p className="font-display text-[22px] text-primary">Dawn / 06:00 AM</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
