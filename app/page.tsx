import Link from "next/link";
import { joinVigilAction } from "@/app/actions";
import { Glyph, IconWell } from "@/components/glyph";
import { PetitionCard } from "@/components/petition-card";
import { SilentCandleOffer } from "@/components/silent-candle-offer";
import { getNovena } from "@/lib/novena";
import { countVisiblePetitions, getCounter, listPetitions } from "@/lib/petitions";
import { DEFAULT_DESCRIPTION } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const maxDuration = 10;
export const metadata = buildPageMetadata({
  title: "Prayer under the Mantle of Santa Muerte",
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

async function loadHome() {
  try {
    return await Promise.race([
      (async () => {
        const [listed, petitionCount, vigil] = await Promise.all([
          listPetitions(),
          countVisiblePetitions(),
          getCounter("novena_vigil"),
        ]);
        return { petitions: listed.slice(0, 3), petitionCount, vigil };
      })(),
      new Promise<{ petitions: never[]; petitionCount: number; vigil: number }>((_, reject) => {
        setTimeout(() => reject(new Error("timeout")), 2500);
      }),
    ]);
  } catch {
    return { petitions: [], petitionCount: 0, vigil: 0 };
  }
}

export default async function HomePage() {
  const novena = getNovena();
  const { petitions, petitionCount, vigil } = await loadHome();

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[78vh] overflow-hidden lg:min-h-[88vh]">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/homepage-banner.jpg"
            alt="Santa Muerte in white on the sanctuary altar, among candles, roses, and offerings"
            className="h-full w-full object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface from-0% via-surface/85 via-[28%] to-transparent to-[58%]" />
        </div>
        <div className="relative mx-auto flex min-h-[78vh] max-w-[1200px] flex-col items-center justify-end px-5 pb-10 pt-[46vh] text-center lg:min-h-[88vh] lg:px-12 lg:pb-14">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-high/90 px-4 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-tertiary uppercase">
              Sanctuary of Silent Reverence
            </span>
          </div>
          <h1 className="font-display mb-6 max-w-4xl text-[36px] leading-[1.12] tracking-tight text-on-surface md:text-[52px] lg:text-[60px]">
            Prayer, Devotion, and Community
            <span className="mt-2 block italic text-primary">under the Mantle of Santa Muerte.</span>
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-8 text-on-surface-variant">
            A calm sanctuary for heartfelt petitions, guided novenas, and sacred contemplation.
            Welcoming all respectful devotees and sincere seekers with reverent clarity and care.
          </p>
          <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/petitions#offer"
              className="burgundy-glow inline-flex items-center gap-2 rounded-sm bg-secondary-container px-8 py-3.5 text-sm font-semibold tracking-wider text-on-surface uppercase hover:bg-on-secondary"
            >
              <Glyph name="candle" size={18} />
              Submit a Petition
            </Link>
            <Link
              href="#devotion-pillars"
              className="inline-flex items-center gap-2 rounded-sm border border-outline-variant/40 bg-surface-high/50 px-8 py-3.5 text-sm font-semibold tracking-wider text-tertiary uppercase hover:border-primary/40 hover:text-primary"
            >
              Explore the Devotion
              <Glyph name="arrow_downward" size={16} />
            </Link>
          </div>
          <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-4 rounded-lg border border-primary/10 bg-surface-low/85 px-8 py-4 text-[11px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase md:flex-row">
            <span className="inline-flex items-center gap-2">
              <Glyph name="local_fire_department" size={18} />
              {petitionCount > 0 ? (
                <>
                  <strong className="text-on-surface">{petitionCount}</strong> petitions lifted in vigil
                </>
              ) : (
                <>The petition wall is open</>
              )}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-surface-highest md:block" />
            <span className="inline-flex items-center gap-2">
              <Glyph name="event_repeat" size={18} />
              Current novena · Day <strong className="text-on-surface">{novena.day}</strong> of {novena.total}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-surface-highest md:block" />
            <span className="inline-flex items-center gap-2">
              <Glyph name="public" size={18} />
              Global circle of prayer
            </span>
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-12">
          <div className="relative overflow-hidden rounded-lg bg-surface-container p-6 shadow-xl lg:p-10">
            <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-sm bg-primary-container/30 px-3 py-1 text-[11px] font-semibold tracking-widest text-primary uppercase">
                    Active community novena
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-secondary uppercase">
                    <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
                    Day {novena.day} of {novena.total}
                  </span>
                </div>
                <h2 className="font-display text-[32px] leading-10 text-on-surface lg:text-[40px]">
                  {novena.title}
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px] text-on-surface-variant">
                    <span>
                      Current stage:{" "}
                      <span className="font-medium text-on-surface">{novena.today.title}</span>
                    </span>
                    <span className="font-semibold text-primary">
                      Day {novena.day} / {novena.total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-highest">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-primary"
                      style={{ width: `${novena.percent}%` }}
                    />
                  </div>
                </div>
                <blockquote className="font-display pt-1 text-[22px] leading-8 text-on-surface-variant italic">
                  “{novena.today.prayer}”
                </blockquote>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/novenas"
                    className="candle-glow inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-2.5 text-xs font-semibold tracking-wider text-on-primary uppercase"
                  >
                    <Glyph name="menu_book" size={18} />
                    Join today’s prayer (Day {novena.day})
                  </Link>
                  <Link
                    href="/novenas"
                    className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-on-surface-variant uppercase hover:text-primary"
                  >
                    View full 9-day guide
                    <Glyph name="arrow_forward" size={16} />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl bg-surface-low p-8 text-center shadow-md lg:col-span-4">
                <SilentCandleOffer initialCount={vigil} />
                <p className="text-[10px] font-semibold tracking-widest text-on-surface-variant/80 uppercase">
                  White candle vigil · refreshed daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devotion-pillars" className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] space-y-10 px-5 lg:px-12">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
              Spiritual anchors
            </p>
            <h2 className="font-display text-[32px] leading-10 lg:text-[40px]">
              Devotional Resource Pillars
            </h2>
            <p className="text-on-surface-variant">
              Structured spaces to elevate your personal practice, deepen understanding, and offer
              quiet community communion.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Pillar
              icon="local_florist"
              kicker="01 · Petitions"
              title="The Petition Wall"
              body="Share your intentions with fellow believers or light a quiet digital vigil candle. Moderated daily with devotion, gentleness, and uncompromising privacy safeguards."
              href="/petitions"
              cta="Visit Petition Wall"
            />
            <Pillar
              icon="auto_stories"
              kicker="02 · Orations"
              title="Prayer Library"
              body="Authentic historic and traditional invocations, rosaries, orations of gratitude, and peaceful morning and evening blessings, categorized by specific spiritual need."
              href="/prayers"
              cta="Explore Prayers"
            />
            <Pillar
              icon="history_edu"
              kicker="03 · Heritage"
              title="Learning & Tradition"
              body="Distinguish authentic traditional practice, contemporary devotion, and thoughtful altar keeping with scholarly grounding and profound devotional respect."
              href="/learn"
              cta="Begin Learning"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] space-y-10 px-5 lg:px-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                Shared vigil · moderated daily
              </p>
              <h2 className="font-display text-[32px] leading-10 lg:text-[40px]">
                Recent Petitions & Whispers of Gratitude
              </h2>
            </div>
            <Link
              href="/petitions"
              className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-tertiary uppercase hover:text-primary"
            >
              View all petitions
              <Glyph name="arrow_forward" size={16} />
            </Link>
          </div>
          {petitions.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {petitions.map((petition) => (
                <PetitionCard key={petition.id} petition={petition} joinAction={joinVigilAction} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className="flex min-h-[220px] flex-col justify-between rounded-lg bg-surface-container p-6 shadow-md"
                >
                  <div className="space-y-3">
                    <div className="h-3 w-24 rounded-sm bg-surface-high" />
                    <div className="h-5 w-3/4 rounded-sm bg-surface-high" />
                    <div className="h-16 w-full rounded-sm bg-surface-low" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[12px] font-semibold tracking-wider uppercase">
            <Link href="/petitions" className="inline-flex items-center gap-1 text-primary hover:text-primary-container">
              View all petitions & light a candle
              <Glyph name="candle" size={16} />
            </Link>
            <span className="text-surface-highest">•</span>
            <Link href="/petitions#offer" className="inline-flex items-center gap-1 text-secondary hover:text-on-surface">
              Submit a Petition
              <Glyph name="arrow_forward" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] space-y-10 px-5 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
              Calm welcome & understanding
            </p>
            <h2 className="font-display text-[32px] leading-10 lg:text-[40px]">What is Niña Blanca?</h2>
            <p className="mt-2 leading-relaxed text-on-surface-variant">
              The veneration of Santa Muerte encompasses various aspects and colors, each speaking to
              distinct facets of human experience. Here, we gather predominantly under her white veil.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Note
              icon="wb_twilight"
              title="The White Aspect"
              body="Known intimately as Niña Blanca, her white cloak embodies total purification, peace of mind, unshakeable protection of the hearth, physical and spiritual healing, and the serene untangling of strife."
              tag="Purification · Peace"
              href="/colors-and-aspects"
            />
            <Note
              icon="church"
              title="A sanctuary of care"
              body="An uncorrupted, tranquil space free from sensationalist mythologies. We ground our practice in historical reverence, contemplative prayer, and mutual care for all seekers."
              tag="Reverence · History"
              href="/learn"
            />
            <Note
              icon="shield"
              title="Privacy and respect"
              body="Your intentions remain sacred and guarded. Devotees may petition publicly, anonymously, or keep prayers entirely confidential without scrutiny or judgment."
              tag="Discretion · Safety"
              href="/privacy-and-anonymity"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1000px] px-5 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-8 rounded-lg bg-surface-container p-6 shadow-lg lg:flex-row lg:p-10">
            <div className="max-w-xl space-y-3">
              <p className="inline-flex items-center gap-1.5 rounded-sm bg-surface-high px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                <Glyph name="verified" size={14} />
                Voluntary support
              </p>
              <h2 className="font-display text-[26px] leading-8">Sustaining the sanctuary</h2>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Niña Blanca is maintained as an ad-free, non-commercial devotional sanctuary supported
                by voluntary community offerings. Donations fund quiet server infrastructure, community
                novena booklets, and physical altar candles kept in perpetual vigil.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col items-center gap-2 md:w-auto md:items-end">
              <Link
                href="/support"
                className="candle-glow inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-on-primary uppercase md:w-auto"
              >
                <Glyph name="favorite" size={18} />
                Support Niña Blanca
              </Link>
              <span className="text-[11px] tracking-wider text-on-surface-variant">
                Private, anonymous giving welcomed
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Pillar({
  icon,
  kicker,
  title,
  body,
  href,
  cta,
}: {
  icon: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-surface-container shadow-lg">
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between">
          <Glyph name={icon} size={28} />
          <p className="text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase">{kicker}</p>
        </div>
        <h3 className="font-display text-[26px] leading-8">{title}</h3>
        <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
      </div>
      <div className="px-6 pb-6">
        <Link href={href} className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-primary uppercase hover:text-primary-container">
          {cta}
          <Glyph name="arrow_forward" size={16} />
        </Link>
      </div>
    </div>
  );
}

function Note({
  icon,
  title,
  body,
  tag,
  href,
}: {
  icon: string;
  title: string;
  body: string;
  tag: string;
  href: string;
}) {
  return (
    <Link href={href} className="block space-y-3 rounded-lg bg-surface-container p-6 shadow-md hover:shadow-xl">
      <IconWell name={icon} tone="muted" />
      <h3 className="font-display text-[22px] leading-7">{title}</h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
      <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">{tag}</p>
    </Link>
  );
}
