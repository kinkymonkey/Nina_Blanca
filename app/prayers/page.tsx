import Link from "next/link";
import { Glyph } from "@/components/glyph";
import { MorningOfferingPanel } from "@/components/morning-offering-panel";
import { ORATION_FILTERS, ORATIONS } from "@/lib/orations";
import { getCounter } from "@/lib/petitions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sacred Prayers & Invocations",
  description:
    "A consecrated compendium of historic prayers, litanies, daily orations, and the Holy Rosary of the White Veil.",
  path: "/prayers",
});
export const dynamic = "force-dynamic";

export default async function PrayersPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; q?: string }>;
}) {
  const { kind, q } = await searchParams;
  const filter = ORATION_FILTERS.some((item) => item.id === kind) ? kind! : "all";
  const query = (q ?? "").trim().toLowerCase();
  let lamps = 0;
  try {
    lamps = await getCounter("silent_candles");
  } catch {
    lamps = 0;
  }

  const catalog = ORATIONS.filter((item) => item.slug !== "morning-offering");
  const list = catalog.filter((item) => {
    if (filter === "bilingual") return false;
    if (filter !== "all" && item.category !== filter) return false;
    if (!query) return true;
    return `${item.title} ${item.summary} ${item.kicker} ${item.lines.join(" ")}`.toLowerCase().includes(query);
  });
  const showFeatured =
    (filter === "all" || filter === "daily" || filter === "bilingual") &&
    (!query || "morning offering nina blanca soberana".includes(query) || query.length < 3);

  const chipHref = (id: string) => {
    const params = new URLSearchParams();
    if (id !== "all") params.set("kind", id);
    if (query) params.set("q", q ?? "");
    const qs = params.toString();
    return qs ? `/prayers?${qs}` : "/prayers";
  };

  return (
    <div className="relative w-full overflow-hidden bg-surface pb-16">
      <section className="relative -mt-[8.75rem] overflow-hidden bg-surface-lowest px-5 pb-16 pt-40 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-25 mix-blend-screen"
          style={{ backgroundImage: "url(/homepage-banner.jpg)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/90 to-surface" />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-high/80 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
              Sanctified Orations & Devotional Liturgy
            </span>
          </div>
          <h1 className="max-w-3xl font-display text-[40px] leading-[1.12] tracking-tight text-on-surface md:text-[52px]">
            Sacred Prayers & Invocations
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            A consecrated compendium of historic prayers, litanies, daily orations, and the Holy Rosary of
            the White Veil. Offer each line with still breath and pure intention.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
              <span className="text-on-surface">{lamps.toLocaleString("en-US")}</span> Lamps lit
            </span>
            <span className="h-1 w-1 rounded-full bg-outline" />
            <span className="inline-flex items-center gap-1">
              <Glyph name="menu_book" size={16} />
              {ORATIONS.length} consecrated texts
            </span>
          </div>
        </div>
      </section>

      <section className="sticky top-[8.75rem] z-40 w-full bg-surface-low/95 py-4 shadow-md backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] space-y-3 px-5 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <form action="/prayers" className="relative w-full md:w-96">
              {filter !== "all" ? <input type="hidden" name="kind" value={filter} /> : null}
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline">
                <Glyph name="search" size={18} />
              </span>
              <input
                name="q"
                defaultValue={q ?? ""}
                placeholder="Search prayers by title, intention, or line..."
                className="w-full rounded-sm bg-surface-lowest py-2.5 pr-4 pl-10 text-sm text-on-surface placeholder:text-outline"
              />
            </form>
          </div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
            {ORATION_FILTERS.map((item) => (
              <Link
                key={item.id}
                href={chipHref(item.id)}
                className={
                  filter === item.id
                    ? "rounded-sm bg-primary-container px-3.5 py-1.5 text-[11px] font-semibold tracking-widest text-on-primary uppercase"
                    : "rounded-sm bg-surface-container px-3.5 py-1.5 text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase hover:text-on-surface"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] space-y-16 px-5 py-16 lg:px-12">
        {showFeatured ? <MorningOfferingPanel lamps={lamps} /> : null}

        <section className="space-y-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">Sanctum Canon</p>
              <h2 className="font-display text-[32px] leading-10 text-on-surface">
                Consecrated Orations & Liturgical Mysteries
              </h2>
            </div>
            <p className="max-w-md text-sm text-on-surface-variant">
              Filtered orations reflect verified oral, historical, and chapel sources preserved by traditional
              devotos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => (
              <Link key={item.slug} href={`/prayers/${item.slug}`} className="group block h-full">
                <article className="flex h-full flex-col justify-between space-y-6 rounded-xl bg-surface-low p-6 gold-stroke transition-colors hover:bg-surface-container">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-sm bg-surface-high px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary uppercase">
                        {item.kicker}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider text-on-surface-variant uppercase">
                        <Glyph name="schedule" size={14} />
                        {item.minutes}
                      </span>
                    </div>
                    <h3 className="font-display text-[22px] leading-7 text-on-surface group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">{item.summary}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-semibold tracking-wider text-on-surface-variant uppercase">
                      {item.tag}
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

        <section className="relative overflow-hidden rounded-xl bg-surface-high p-8 shadow-xl md:p-12">
          <div className="relative z-10 max-w-3xl space-y-6 text-left">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              <Glyph name="auto_stories" size={18} />
              Devotional Formation & Sanctuary Ethics
            </p>
            <h2 className="font-display text-[32px] leading-10 text-on-surface">The Anatomy of a Holy Prayer</h2>
            <p className="leading-relaxed text-on-surface-variant">
              Devotion to Santa Muerte is grounded in honesty, equality, and conscious presence. Authentic
              prayers are neither demands nor spells, but honest conversations with the final patroness of
              mortal existence.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "1",
                "Intention (La Intención)",
                "Approach with clarity. Clarify in silence what you truly seek before speaking a word. She looks past gilded speech into the hidden state of the heart.",
              ],
              [
                "2",
                "Humble Address (El Saludo)",
                "Acknowledge her holy office with reverence. Santa Muerte is approached as a protective mother, just judge, and constant companion.",
              ],
              [
                "3",
                "The Offering (La Ofrenda)",
                "Never ask empty-handed of spirit. Offer water, a flame, fragrant incense, or a pledge of good conduct toward others in her sacred name.",
              ],
              [
                "4",
                "Gratitude & Peace (La Gratitud)",
                "Conclude in solemn acceptance. Honor whatever outcome emerges with dignity, returning to give thanks when hardship passes.",
              ],
            ].map(([num, title, body]) => (
              <div key={title} className="space-y-2 rounded-lg bg-surface-low p-5">
                <p className="font-display text-[28px] text-primary">{num}</p>
                <h3 className="text-[11px] font-semibold tracking-widest text-primary uppercase">{title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/ethics-and-safety"
            className="mt-8 inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-primary uppercase"
          >
            Explore Complete Guide to Altar Ethics & Rituals
            <Glyph name="north_east" size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
