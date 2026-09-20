import Link from "next/link";
import { Glyph, IconWell } from "@/components/glyph";
import { NovenaCycleActions } from "@/components/novena-cycle-actions";
import { NovenaVigilCount } from "@/components/novena-vigil-count";
import { ARCHIVE_NOVENAS, type NovenaKind } from "@/lib/novena-archive";
import { getNovena } from "@/lib/novena";
import { getCounter } from "@/lib/petitions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Devotional Novenas of the White Mantle",
  description:
    "Consecrated nine-day cycles of prayer, spiritual purification, and maternal solace under the White Mantle of Santa Muerte.",
  path: "/novenas",
});
export const dynamic = "force-dynamic";

const FILTERS: { id: "all" | NovenaKind; label: string }[] = [
  { id: "all", label: "All Novenas" },
  { id: "healing", label: "Healing & Solace" },
  { id: "protection", label: "Protection" },
  { id: "peace", label: "Peace in Home" },
  { id: "gratitude", label: "Gratitude & Vows" },
];

export default async function NovenasPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const { kind } = await searchParams;
  const novena = getNovena();
  const activeKind = FILTERS.some((item) => item.id === kind) ? (kind as "all" | NovenaKind) : "all";
  const archive =
    activeKind === "all" ? ARCHIVE_NOVENAS : ARCHIVE_NOVENAS.filter((item) => item.kind === activeKind);
  let vigil = 0;
  try {
    vigil = await getCounter("novena_vigil");
  } catch {
    vigil = 0;
  }

  return (
    <div className="relative w-full overflow-hidden bg-surface pb-16">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-[520px] right-0 h-[420px] w-[420px] rounded-full bg-secondary-container/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-16 lg:px-12">
        <div className="flex items-center justify-between pb-4 pt-6">
          <p className="text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase">
            Sanctuary <span className="text-primary/40">•</span> Ritual Observances{" "}
            <span className="text-primary/40">•</span>{" "}
            <span className="font-semibold text-primary">Consecrated Cycles</span>
          </p>
          <p className="hidden items-center gap-2 text-[11px] tracking-wider text-on-surface-variant uppercase sm:flex">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-primary" />
            <span className="text-on-surface">Community Vigil Active</span>
          </p>
        </div>

        <section className="mb-10 py-4">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-sm bg-surface-high px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                <Glyph name="auto_awesome" size={14} />
                Solemn Community Novenas
              </span>
              <h1 className="font-display text-[40px] leading-[1.08] font-normal tracking-tight text-on-surface md:text-[52px]">
                Devotional Novenas of the <span className="italic text-primary">White Mantle</span>
              </h1>
              <p className="max-w-2xl pt-1 text-lg font-light leading-relaxed text-on-surface-variant">
                Consecrated nine-day cycles of prayer, spiritual purification, and maternal solace. Join
                thousands walking the sacred path together in unhurried silence.
              </p>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:items-end">
              <div className="w-full max-w-xs rounded-sm bg-surface-container p-4 shadow-xl">
                <div className="mb-1 flex items-center justify-between text-[11px] tracking-wider text-on-surface-variant uppercase">
                  <span>Sanctuary Accord</span>
                  <span className="text-primary">Canonical Rite</span>
                </div>
                <p className="font-display text-[22px] font-normal text-on-surface">Month of Solace</p>
                <p className="mt-1 text-sm text-on-surface-variant/80">
                  Unified devotion at twilight (7:00 PM local) or dawn.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="current" className="mb-16">
          <div className="overflow-hidden rounded-sm bg-surface-low shadow-2xl">
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative min-h-[440px] overflow-hidden bg-surface-lowest lg:col-span-5 lg:min-h-full">
                <img
                  src="/homepage-banner.jpg"
                  alt="Santa Muerte in white on the sanctuary altar, among candles, roses, and offerings"
                  className="h-full w-full object-cover object-[center_top]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-low via-surface-low/30 to-transparent" />
                <div className="absolute top-4 left-4 rounded-sm bg-surface-lowest/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
                  <span className="text-[11px] tracking-widest text-primary uppercase">
                    Day {novena.day} of {novena.total} Consecration
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-sm bg-surface-high/90 p-3 shadow-md backdrop-blur-md">
                  <div>
                    <p className="font-display text-[28px] leading-none text-on-surface">
                      <NovenaVigilCount initial={vigil} />
                    </p>
                    <p className="text-[10px] tracking-wider text-on-surface-variant uppercase">
                      Devotees in Vigil
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider text-primary uppercase">United</span>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-5 p-6 lg:col-span-7 lg:p-10">
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-sm bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-widest text-primary uppercase">
                      Current Community Cycle
                    </span>
                    <span className="text-[11px] tracking-wider text-on-surface-variant uppercase">
                      Day Closes at Midnight MST
                    </span>
                  </div>
                  <h2 className="font-display text-[32px] leading-10 text-on-surface">{novena.title}</h2>
                  <p className="mt-1 text-on-surface-variant">Focus: {novena.today.focus}</p>
                </div>

                <div className="space-y-2 rounded-sm bg-surface-lowest p-4 shadow-inner">
                  <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">
                    <span>Cycle Progression</span>
                    <span className="text-primary">{novena.today.stage}</span>
                  </div>
                  <div className="grid grid-cols-9 gap-1.5 pt-1">
                    {Array.from({ length: novena.total }, (_, i) => {
                      const day = i + 1;
                      const done = day < novena.day;
                      const current = day === novena.day;
                      return (
                        <div key={day} className={`flex flex-col items-center gap-1 ${!done && !current ? "opacity-40" : ""}`}>
                          <div
                            className={
                              current
                                ? "h-2 w-full animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(235,192,117,0.7)]"
                                : done
                                  ? "h-2 w-full rounded-full bg-primary/80"
                                  : "h-2 w-full rounded-full bg-surface-highest"
                            }
                          />
                          <span
                            className={
                              current
                                ? "text-[10px] font-bold text-primary"
                                : "text-[10px] text-on-surface-variant"
                            }
                          >
                            D{day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 rounded-sm bg-surface-container p-4 shadow-md">
                  <p className="font-display text-[20px] leading-7 text-primary">
                    {novena.today.meditation}
                  </p>
                  <p className="rounded-sm bg-surface-low px-3 py-2 text-sm italic text-on-surface-variant/90">
                    Prescribed Offering for Today: {novena.today.offering}
                  </p>
                  <p className="border-l-2 border-primary/40 pl-3 font-display text-[20px] leading-8 text-on-surface/90 italic">
                    “{novena.today.prayer}”
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Recite one Our Father or three heartfelt silent aspirations, renewing the cool water
                    offer with absolute stillness.
                  </p>
                </div>

                <NovenaCycleActions day={novena.day} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 space-y-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
                Sacred Compendium
              </p>
              <h2 className="font-display text-[32px] font-normal leading-10 text-on-surface">
                Archive of Devotional Novenas
              </h2>
              <p className="mt-1 text-on-surface-variant">
                Select an intention to undertake individually or track upcoming community synchronizations.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 rounded-sm bg-surface-container p-1">
              {FILTERS.map((item) => (
                <Link
                  key={item.id}
                  href={item.id === "all" ? "/novenas" : `/novenas?kind=${item.id}`}
                  className={
                    activeKind === item.id
                      ? "rounded-sm bg-primary px-3 py-1.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                      : "rounded-sm px-3 py-1.5 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
                  }
                >
                  {item.id === "all" ? `All Novenas (${ARCHIVE_NOVENAS.length})` : item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((item) => (
              <Link key={item.slug} href={item.href || `/novenas/${item.slug}`} className="block h-full">
                <article className="flex h-full flex-col justify-between space-y-4 rounded-lg bg-surface-container p-6 gold-stroke hover:border-primary/40">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                        {item.kindLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider text-on-surface-variant uppercase">
                        <Glyph name="calendar_today" size={14} />
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="font-display text-[22px] leading-7">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                    <p className="text-sm text-on-surface-variant">
                      <span className="font-semibold text-on-surface">Prescribed Elements: </span>
                      {item.offer}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] tracking-wider text-on-surface-variant uppercase">
                      {item.pace}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                      {item.cta}
                      <Glyph name="arrow_forward" size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative my-16 overflow-hidden rounded-sm bg-surface-lowest px-6 py-16 lg:px-12">
          <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-3xl space-y-3 text-center">
            <p className="font-display text-[32px] leading-10 font-normal text-on-surface md:text-[36px]">
              “She asks for nothing that wounds another. What is given in purity is multiplied in peace.”
            </p>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-primary/80 uppercase">
              Sanctuary Principle · Traditional Mexican Devotional Canon
            </p>
          </div>
        </section>

        <section className="mb-16 text-left">
          <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
            Canonical Instruction
          </p>
          <h2 className="font-display text-[32px] leading-10 font-normal text-on-surface">
            How to Pray a Novena with Reverence
          </h2>
          <p className="mt-2 max-w-2xl text-on-surface-variant">
            A novena is not a demand upon the divine, but a solemn discipline of nine days wherein the soul
            prepares itself to receive grace, guidance, and peace.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "water_drop",
                "Preparing Your Space",
                "Clear a quiet corner or altar surface. Cleanse with cold fresh water. Place a single unblemished glass of clear water, one white candle, and a white blossom. Silence external devices.",
                "Water & Silence",
              ],
              [
                "shield",
                "Setting the Intention",
                "State your prayer clearly from a position of unconditional respect. Sanctuary ethics forbid petitions intended to coerce, bind, or harm another soul. Pray solely for light, health, and peace.",
                "Pure Devotion Only",
              ],
              [
                "hourglass_empty",
                "Daily Recitation",
                "Observe the appointed orations at the same designated hour each day, preferably at dawn or twilight. Never rush through the words; speak softly or recite in quiet contemplation.",
                "Rhythm & Constancy",
              ],
              [
                "balance",
                "Honoring the Vow",
                "On the ninth day, fulfill your concluding offering of thanksgiving. If you promised flowers, bread to the hungry, or quiet gratitude, render it faithfully. Her justice is balance.",
                "Sacred Reciprocity",
              ],
            ].map(([icon, title, body, tag]) => (
              <div key={title} className="flex flex-col justify-between space-y-3 rounded-sm bg-surface-container p-6 shadow-md">
                <div className="space-y-2">
                  <IconWell name={icon} tone="muted" />
                  <h3 className="pt-2 font-display text-[20px] leading-7 text-on-surface">{title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
                </div>
                <p className="pt-2 text-[10px] font-semibold tracking-wider text-primary uppercase">{tag}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-6 rounded-sm bg-surface-high p-6 shadow-xl md:flex-row md:items-center lg:p-10">
          <div className="max-w-2xl space-y-2 text-left">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Spiritual Accompaniment
            </p>
            <h2 className="font-display text-[28px] leading-9 text-on-surface">
              Would you like our Sanctuary Keepers to light a candle on your behalf?
            </h2>
            <p className="text-on-surface-variant">
              If you are traveling, indisposed, or unable to keep a physical altar at home, you may register
              your intention for our collective altar vigil.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row md:w-auto">
            <Link
              href="/support#offerings"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary-container px-6 py-2.5 text-xs font-semibold tracking-wider text-on-surface uppercase hover:bg-on-secondary"
            >
              <Glyph name="candle" size={16} />
              Request Sanctuary Candle
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
