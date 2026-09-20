import Link from "next/link";
import { joinVigilAction, submitPetitionAction } from "@/app/actions";
import { Glyph } from "@/components/glyph";
import { PetitionCard } from "@/components/petition-card";
import { petitionCategories } from "@/lib/nav";
import { getNovena } from "@/lib/novena";
import {
  countVisiblePetitions,
  getCounter,
  listPetitions,
  type Petition,
} from "@/lib/petitions";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = buildPageMetadata({
  title: "Petition Wall",
  description:
    "Leave a petition under the White Mantle of Santa Muerte. The wall is free. Harm toward a named person is not received here.",
  path: "/petitions",
});

const FILTERS = [
  { id: "all", label: "All Intentions", match: null as string[] | null },
  { id: "healing", label: "Health & Healing", match: ["healing"] },
  { id: "home-peace", label: "Home & Peace", match: ["home", "peace"] },
  { id: "reconciliation", label: "Reconciliation", match: ["reconciliation"] },
  { id: "gratitude", label: "Gratitude & Answered", match: ["gratitude"] },
] as const;

function matchesFilter(petition: Petition, category?: string) {
  const chip = FILTERS.find((item) => item.id === category) ?? FILTERS[0];
  if (!chip.match) return true;
  return (chip.match as readonly string[]).includes(petition.category);
}

export default async function PetitionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string; received?: string; error?: string }>;
}) {
  const { category, q, sort, received, error } = await searchParams;
  const novena = getNovena();
  let live: Petition[] = [];
  let liveCount = 0;
  let candles = 0;
  try {
    const [listed, visible, candleCount] = await Promise.all([
      listPetitions(),
      countVisiblePetitions(),
      getCounter("silent_candles"),
    ]);
    live = listed;
    liveCount = visible;
    candles = candleCount;
  } catch {
    live = [];
  }

  const query = (q ?? "").trim().toLowerCase();
  let wall = live.filter((item) => matchesFilter(item, category));
  if (query) {
    wall = wall.filter((item) =>
      `${item.title} ${item.body} ${item.displayName}`.toLowerCase().includes(query),
    );
  }
  if (sort === "vigil") {
    wall = [...wall].sort((a, b) => b.vigilCount - a.vigilCount);
  } else if (sort === "answered") {
    wall = wall.filter((item) => item.answered || item.category === "gratitude");
  }
  const shownCount = liveCount;

  return (
    <div className="relative w-full overflow-hidden bg-surface pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-surface-lowest to-transparent opacity-40" />

      <div className="relative mx-auto max-w-[1200px] px-5 pt-8 lg:px-12 lg:pt-10">
        <p className="mb-2 text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase">
          Sanctuary of Peace <span className="text-primary">• Devotional Intentions</span>
        </p>
        <div className="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-8">
            <h1 className="font-display text-[38px] leading-none tracking-tight lg:text-[56px]">
              The Petition Wall
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-on-surface-variant">
              Place your heartfelt intentions beneath the mantle of the White Robe. Whether
              whispered aloud in community or held in quiet anonymity, every prayer is met with
              sacred reverence and grace.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-2 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
            <Link
              href="#offer"
              className="burgundy-glow inline-flex items-center justify-center gap-2 rounded-sm bg-secondary-container px-6 py-2 text-xs font-semibold tracking-wider text-on-surface uppercase hover:bg-on-secondary"
            >
              <Glyph name="candle" size={16} />
              Submit a Petition
            </Link>
            <span className="text-[11px] text-on-surface-variant/80">
              {shownCount} {shownCount === 1 ? "intention visible on the wall" : "intentions visible on the wall"}
            </span>
          </div>
        </div>

        <div className="mb-10 rounded-sm bg-surface-low p-6 shadow-sm lg:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary">
                <Glyph name="verified" size={20} />
              </div>
              <div>
                <h2 className="font-display text-[22px] leading-7 text-primary">
                  Sacred Sanctuary Trust & Anonymity
                </h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Every petition is human-moderated for respect, peace, and spiritual protection. No
                  harmful intentions or unsolicited contact. Pseudonyms and silent vigil are always
                  respected.
                </p>
              </div>
            </div>
            <Link
              href="/ethics-and-safety"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-primary uppercase hover:text-primary-container"
            >
              Devotional Ethics
              <Glyph name="arrow_forward" size={14} />
            </Link>
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-sm bg-surface-lowest shadow-md">
          <div className="grid min-h-[300px] grid-cols-1 lg:grid-cols-12">
            <div className="relative h-64 overflow-hidden lg:col-span-7 lg:h-auto">
              <img
                src="/perpetual-altar.jpg"
                alt="High altar of Santa Muerte Blanca with white lace, votive candles, and lilies"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-surface-lowest/70 to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center bg-surface-low p-8 lg:col-span-5 lg:p-10">
              <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-primary uppercase">
                <Glyph name="church" size={16} />
                Sanctuary of the White Veil
              </p>
              <h2 className="font-display mb-6 text-[26px] leading-8">The Perpetual Altar</h2>
              <div className="flex items-center gap-8">
                <div>
                  <span className="block font-display text-[22px] font-semibold text-primary">{candles}</span>
                  <span className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                    White candles marked
                  </span>
                </div>
                <div className="h-8 w-px bg-surface-highest" />
                <div>
                  <span className="block font-display text-[22px] font-semibold text-primary">
                    {novena.day}/{novena.total}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                    Community novena day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="offer"
          className="mb-10 rounded-sm p-6 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6),0_0_20px_rgba(130,37,48,0.2)] lg:p-10"
          style={{
            background: "linear-gradient(145deg, rgb(43, 14, 20) 0%, rgb(28, 8, 12) 100%)",
            border: "1px solid rgba(130, 37, 48, 0.4)",
          }}
        >
          <div className="mb-6 flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-[26px] leading-8">Submit a Petition</h2>
              <p className="text-sm text-on-surface-variant">
                Your voice is welcomed into the sacred mantle of the Niña Blanca.
              </p>
            </div>
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-1.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
            >
              <Glyph name="favorite" size={16} />
              Support Niña Blanca
            </Link>
          </div>
          {received === "1" ? (
            <p className="mb-6 flex items-start gap-2 rounded-sm bg-surface-lowest/80 px-4 py-3 text-sm text-primary">
              <Glyph name="sentiment_satisfied" size={20} />
              <span>
                Your intention has been received with reverence. It has been commended to the altar
                and will appear on the wall following customary moderation.
              </span>
            </p>
          ) : null}
          {error === "1" ? (
            <p className="mb-6 rounded-sm bg-surface-lowest/80 px-4 py-3 text-sm text-secondary">
              That petition could not be saved. Please try again.
            </p>
          ) : null}
          <form action={submitPetitionAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1 text-[12px] font-semibold tracking-wider uppercase">
                Intention Summary / Focus
                <input
                  required
                  name="title"
                  maxLength={140}
                  className="mt-1 w-full rounded-sm bg-surface-lowest px-4 py-2 text-base font-normal tracking-normal normal-case text-on-surface shadow-inner"
                  placeholder="e.g., Solace for my mother during treatment, Peace in our family home..."
                />
              </label>
              <label className="space-y-1 text-[12px] font-semibold tracking-wider uppercase">
                Spiritual Aspect
                <select
                  name="category"
                  className="mt-1 w-full rounded-sm bg-surface-lowest px-4 py-2 text-base font-normal tracking-normal normal-case text-on-surface"
                >
                  {petitionCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block text-[12px] font-semibold tracking-wider uppercase">
              The Words of Your Heart
              <textarea
                required
                name="body"
                rows={4}
                maxLength={2000}
                className="mt-1 w-full resize-y rounded-sm bg-surface-lowest p-4 text-base font-normal tracking-normal normal-case text-on-surface shadow-inner"
                placeholder="Speak openly to the Most Holy Mother. Lay down burdens of illness, discord, grief, or offer thanks. Speak truthfully..."
              />
            </label>
            <label className="block text-[12px] font-semibold tracking-wider uppercase">
              How to show your name
              <input
                name="displayName"
                maxLength={80}
                className="mt-1 w-full rounded-sm bg-surface-lowest px-4 py-2 text-base font-normal tracking-normal normal-case text-on-surface"
                placeholder="Maria C., Guadalajara — ignored if you choose veiled or silent"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
              <Privacy
                value="public"
                label="Public Community"
                body="Display initial and location (e.g. Maria C., Guadalajara)"
                defaultChecked
              />
              <Privacy
                value="anonymous"
                label="Veiled Anonymous"
                body={'Displayed simply as “A devotee in prayer”'}
              />
              <Privacy
                value="silent"
                label="Silent Vigil"
                body="Hidden from wall; held silently in sanctuary count"
              />
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-sm bg-surface-lowest/50 p-4 sm:flex-row sm:items-center">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" name="candle" className="mt-1 accent-primary" />
                <span>
                  <strong className="block text-on-surface">Light a 9-Day White Sanctuary Candle</strong>
                  <span className="text-on-surface-variant">
                    A consecrated tallow candle placed on the perpetual altar for this intention.
                  </span>
                </span>
              </label>
              <Link
                href="/support#offerings"
                className="shrink-0 rounded-sm bg-secondary-container px-4 py-2 text-[11px] font-semibold tracking-wider text-on-surface uppercase"
              >
                Dedicate Candle
              </Link>
            </div>
            <p className="inline-flex items-center gap-1 text-[11px] text-on-surface-variant">
              <Glyph name="lock" size={16} />
              All prayers held in sacred non-commercial trust.
            </p>
            <div className="flex justify-end gap-4">
              <button type="reset" className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                Clear
              </button>
              <button
                type="submit"
                className="candle-glow inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase"
              >
                <Glyph name="candle" size={16} />
                Place Intention on Altar
              </button>
            </div>
          </form>
        </section>

        <div className="mb-10 flex flex-col justify-between gap-4 rounded-sm bg-surface-high p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-surface shadow-[0_0_12px_rgba(130,37,48,0.5)]">
              <Glyph name="flare" size={24} />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                Active Devotion • Day {novena.day} of {novena.total}
              </p>
              <h2 className="font-display text-[26px] leading-8">{novena.title}</h2>
              <p className="text-sm text-on-surface-variant">
                Today’s community meditation: {novena.today.focus}. Devotees on this wall are invited
                to unify their intentions.
              </p>
            </div>
          </div>
          <Link
            href="/novenas"
            className="inline-flex items-center gap-2 rounded-sm bg-surface-lowest px-4 py-2 text-xs font-semibold tracking-wider uppercase"
          >
            <Glyph name="menu_book" size={16} />
            Read Day {novena.day} Rosary
          </Link>
        </div>

        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <Link
                key={item.id}
                href={item.id === "all" ? "/petitions" : `/petitions?category=${item.id}`}
                className={
                  (category ?? "all") === item.id
                    ? "rounded-sm bg-primary px-3 py-1.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
                    : "rounded-sm bg-surface-highest px-3 py-1.5 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
                }
              >
                {item.label}
                {item.id === "all" ? ` (${shownCount})` : ""}
              </Link>
            ))}
          </div>
          <form className="relative flex flex-1 items-center gap-2 sm:max-w-md lg:flex-none" action="/petitions">
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
              <Glyph name="search" size={18} />
            </span>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search intentions..."
              className="w-full rounded-sm bg-surface-lowest py-1.5 pr-3 pl-10 text-sm text-on-surface sm:w-56"
            />
            <select
              name="sort"
              defaultValue={sort ?? "recent"}
              className="rounded-sm bg-surface-lowest px-2 py-2 text-[11px] font-semibold tracking-wider text-on-surface uppercase"
            >
              <option value="recent">Most Recent</option>
              <option value="vigil">In Active Vigil</option>
              <option value="answered">Answered Prayers</option>
            </select>
            <button type="submit" className="text-[11px] font-semibold tracking-wider text-primary uppercase">
              Apply
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wall.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} joinAction={joinVigilAction} vigilIcon="local_fire_department" />
          ))}
        </div>

        <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-display text-[22px] leading-7 text-primary">What is the White Aspect?</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              The Niña Blanca represents purity, spiritual healing, purification of discord, and
              bodily protection. Petitions placed here avoid worldly retribution or coercion,
              inviting instead truth, peace, and restorative grace.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[22px] leading-7 text-primary">How Vigil Candles Work</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Clicking “Join Vigil” increments our shared prayer chain and records your silent
              assent. Devotees around the globe pause together at morning and evening bells to hold
              these written names before the blessed mother.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[22px] leading-7 text-primary">Fulfilling Devotional Promises</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              If an intention has met with answer or alleviation, devotees return to post an Ex-Voto
              or note of gratitude. The white altar flourishes upon heartfelt sincerity, clear water,
              and fragrant flowers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Privacy({
  value,
  label,
  body,
  defaultChecked,
}: {
  value: string;
  label: string;
  body: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-sm bg-surface-lowest p-3 text-sm">
      <input
        type="radio"
        name="privacy"
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 accent-primary"
      />
      <span>
        <strong className="block font-semibold text-primary">{label}</strong>
        <span className="text-on-surface-variant">{body}</span>
      </span>
    </label>
  );
}
