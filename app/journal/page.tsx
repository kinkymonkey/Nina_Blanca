import Link from "next/link";
import { Glyph } from "@/components/glyph";
import { JournalDispatchForm } from "@/components/journal-dispatch-form";
import { getFeaturedPost, listJournalPosts, type JournalTopic } from "@/lib/journal";
import { getNovena } from "@/lib/novena";
import { getCounter } from "@/lib/petitions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "The Sanctuary Journal",
  description: "Writings on faith, tradition, and the Sacred White Mantle of Santa Muerte.",
  path: "/journal",
});
export const dynamic = "force-dynamic";

const FILTERS: { id: "all" | JournalTopic; label: string }[] = [
  { id: "all", label: "All Writings" },
  { id: "theology", label: "Sacred Theology" },
  { id: "altar", label: "Altar Craft & Herbalism" },
  { id: "history", label: "Historical Lineage" },
  { id: "testimony", label: "Devotee Testimonies" },
  { id: "seasons", label: "Liturgical Seasons" },
];

const TOPIC_ICON: Record<JournalTopic, string> = {
  theology: "psychiatry",
  altar: "spa",
  history: "church",
  testimony: "favorite",
  seasons: "hourglass_bottom",
  liturgy: "flare",
  ethics: "balance",
};

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; q?: string }>;
}) {
  const { topic, q } = await searchParams;
  const posts = listJournalPosts();
  const featured = getFeaturedPost();
  const active = FILTERS.some((item) => item.id === topic) ? topic : "all";
  const query = (q ?? "").trim().toLowerCase();
  const matches = (post: NonNullable<typeof featured>) => {
    if (active !== "all" && post.topic !== active) return false;
    if (!query) return true;
    return `${post.title} ${post.summary} ${post.kicker} ${post.tags.join(" ")}`.toLowerCase().includes(query);
  };
  const GRID_LIMIT = 9;
  const rest = posts.filter((post) => post.slug !== featured?.slug && matches(post));
  const visible = rest.slice(0, GRID_LIMIT);
  const showFeatured = Boolean(featured) && matches(featured!);
  const novena = getNovena();
  let candles = 0;
  try {
    candles = await getCounter("silent_candles");
  } catch {
    candles = 0;
  }

  const countFor = (id: "all" | JournalTopic) =>
    id === "all" ? posts.length : posts.filter((post) => post.topic === id).length;

  return (
    <div className="relative w-full overflow-hidden bg-surface pb-16">
      <div className="mx-auto max-w-[1200px] px-5 pb-16 lg:px-12">
        <header className="flex flex-col items-start gap-4 pt-8 pb-12">
          <div className="inline-flex items-center gap-2 rounded-sm bg-surface-high px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Sanctuary Archive • Reflections & Theology
          </div>
          <div className="max-w-4xl space-y-1">
            <h1 className="font-display text-[40px] leading-[1.1] tracking-tight text-on-surface md:text-[52px]">
              The Sanctuary Journal
            </h1>
            <p className="font-display text-[24px] leading-8 font-normal text-primary italic">
              Writings on Faith, Tradition, & the Sacred White Mantle
            </p>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">
            Thoughtful theological inquiries, historical research, altar keeping guides, and reflections
            written under the holy guidance of La Niña Blanca.
          </p>
          <div className="mt-4 w-full space-y-4">
            <form action="/journal" className="relative w-full">
              {active !== "all" ? <input type="hidden" name="topic" value={active} /> : null}
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline">
                <Glyph name="search" size={18} />
              </span>
              <input
                name="q"
                defaultValue={q ?? ""}
                placeholder="Search articles, subjects, historical rites, or tags..."
                className="w-full rounded-sm bg-surface-low py-3 pr-4 pl-10 text-on-surface placeholder:text-outline"
              />
            </form>
            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((item) => {
                const count = countFor(item.id);
                return (
                  <Link
                    key={item.id}
                    href={item.id === "all" ? "/journal" : `/journal?topic=${item.id}`}
                    className={
                      active === item.id
                        ? "rounded-sm bg-primary-container px-4 py-1.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                        : "rounded-sm bg-surface-high px-4 py-1.5 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
                    }
                  >
                    {item.label} ({count})
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {showFeatured && featured ? (
          <section className="mb-16">
            <article className="grid grid-cols-1 overflow-hidden rounded-sm bg-surface-container shadow-xl lg:grid-cols-12">
              <div className="relative min-h-[380px] lg:col-span-6 lg:min-h-full">
                {featured.cover ? (
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                ) : null}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex rounded-sm bg-surface-lowest/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase backdrop-blur-sm">
                    Featured Essay • {featured.kicker}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-5 p-6 lg:col-span-6 lg:p-10">
                <div className="space-y-3">
                  <p className="text-[11px] tracking-wide text-on-surface-variant">
                    Reading Time: {featured.minutes} <span className="px-1">•</span> Novena of All Souls
                  </p>
                  <h2 className="font-display text-[28px] leading-9 text-on-surface lg:text-[34px]">
                    {featured.title}
                  </h2>
                  <p className="leading-relaxed text-on-surface-variant">{featured.summary}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-surface-high px-2 py-0.5 text-[11px] text-on-surface-variant"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-4 pt-4 sm:flex-row sm:items-center">
                  <Link
                    href={`/journal/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                  >
                    Read Full Essay
                    <Glyph name="arrow_forward" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        <div className="mb-6 flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <h2 className="font-display text-[22px] leading-7 text-on-surface">
              Recent Sanctuary Studies & Chronicles
            </h2>
          </div>
          <span className="hidden text-[11px] tracking-widest text-on-surface-variant uppercase sm:inline">
            Showing {visible.length} of {posts.length} Manuscripts
          </span>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <Link key={item.slug} href={`/journal/${item.slug}`} className="block h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-sm bg-surface-container shadow-md transition-transform hover:-translate-y-1">
                <div className="relative h-56 w-full overflow-hidden">
                  {item.cover ? (
                    <img src={item.cover} alt={item.title} className="h-full w-full object-cover object-center" />
                  ) : null}
                  <div className="absolute top-3 left-3 rounded-sm bg-surface-lowest/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                    {item.kicker} • {item.minutes} read
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-[22px] leading-7 text-on-surface">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">{item.summary}</p>
                  </div>
                  <p className="flex items-center justify-between pt-4 text-[11px] tracking-wider text-on-surface-variant uppercase">
                    <span className="inline-flex items-center gap-1">
                      <Glyph name={TOPIC_ICON[item.topic]} size={16} />
                      {formatDate(item.date)}
                    </span>
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <div className="mb-16 flex justify-center">
          <Link
            href="/journal/archive"
            className="inline-flex items-center gap-2 rounded-sm bg-surface-high px-5 py-2.5 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
          >
            Browse the Full Directory
            <Glyph name="arrow_forward" size={16} />
          </Link>
        </div>

        <section className="mb-16 grid grid-cols-1 gap-6 rounded-sm bg-surface-low p-6 md:grid-cols-4 lg:p-8">
          <div className="space-y-1 text-left">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">Repository Status</p>
            <p className="font-display text-[22px] text-on-surface">{posts.length} Canonical Texts</p>
            <p className="text-sm text-on-surface-variant">Archived across the journal</p>
          </div>
          <div className="space-y-1 text-left">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Active Community Novena
            </p>
            <p className="font-display text-[22px] text-on-surface">
              Day {novena.day} of {novena.total}
            </p>
            <p className="text-sm text-on-surface-variant">{novena.title}</p>
          </div>
          <div className="space-y-1 text-left">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">Votive Count</p>
            <p className="font-display text-[22px] text-on-surface">{candles.toLocaleString("en-US")} Lighted</p>
            <p className="text-sm text-on-surface-variant">Consecrated on the Community Wall</p>
          </div>
          <div className="space-y-1 text-left">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">Liturgical Cycle</p>
            <p className="font-display text-[22px] text-on-surface">Waxing Devotional</p>
            <p className="text-sm text-on-surface-variant">Traditional Autumnal Solace Observance</p>
          </div>
        </section>

        <section id="dispatch" className="relative mb-16 overflow-hidden rounded-sm bg-surface-low p-6 shadow-xl lg:p-10">
          <div className="relative z-10 mx-auto max-w-2xl space-y-3 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary">
              <Glyph name="mark_email_unread" size={24} />
            </div>
            <h2 className="font-display text-[28px] leading-9 text-on-surface">
              Receive the Sanctuary Dispatches & Liturgical Calendar
            </h2>
            <p className="leading-relaxed text-on-surface-variant">
              Every new moon, we send deep-dive essays, liturgical calendar notifications, upcoming community
              novena dates, and altar care reflections directly to your quiet inbox. Never commercial, 100%
              ad-free, unsubscribe at any moment.
            </p>
            <JournalDispatchForm />
            <p className="pt-1 text-[11px] text-outline">
              Your email is held in reverent confidence and never shared.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-6 rounded-sm bg-secondary-container p-6 shadow-2xl text-on-surface md:flex-row md:items-center lg:p-10">
          <div className="max-w-xl space-y-2 text-left">
            <p className="text-[11px] font-semibold tracking-widest text-secondary uppercase">
              Sacred Practice • The Living Votive
            </p>
            <h2 className="font-display text-[28px] leading-9">Inspired to deepen your practice?</h2>
            <p className="text-on-surface-variant">
              Light a consecrated white vigil candle on our digital altar or unite your prayers with hundreds
              of devotees in our continuous 9-day novena cycle.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              href="/novenas"
              className="inline-flex items-center gap-2 rounded-sm bg-surface-highest px-5 py-2.5 text-xs font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-bright"
            >
              <Glyph name="menu_book" size={16} />
              Join Active Novena
            </Link>
            <Link
              href="/support#offerings"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-on-primary uppercase"
            >
              <Glyph name="local_fire_department" size={16} />
              Light Sanctuary Candle
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
