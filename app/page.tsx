import Link from "next/link";
import {
  joinNovenaVigilAction,
  joinVigilAction,
  offerSilentCandleAction,
} from "@/app/actions";
import { PetitionCard } from "@/components/petition-card";
import { getNovena } from "@/lib/novena";
import { countVisiblePetitions, getCounter, listPetitions } from "@/lib/petitions";

export const dynamic = "force-dynamic";

async function loadHome() {
  try {
    const [petitions, petitionCount, novenaVigil, silentCandles] = await Promise.all([
      listPetitions(),
      countVisiblePetitions(),
      getCounter("novena_vigil"),
      getCounter("silent_candles"),
    ]);
    return { petitions: petitions.slice(0, 3), petitionCount, novenaVigil, silentCandles };
  } catch {
    return { petitions: [], petitionCount: 0, novenaVigil: 0, silentCandles: 0 };
  }
}

export default async function HomePage() {
  const novena = getNovena();
  const { petitions, petitionCount, novenaVigil, silentCandles } = await loadHome();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/altar-hero.png"
            alt="Sanctuary altar with candles, white roses, and drapery"
            className="h-full w-full scale-105 object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/85 to-surface" />
        </div>
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 py-16 text-center lg:px-12">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-high/90 px-4 py-1 text-[11px] font-semibold tracking-[0.14em] text-tertiary uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Sanctuary of Silent Reverence
          </p>
          <h1 className="font-display mb-4 max-w-4xl text-[38px] leading-[44px] tracking-tight text-on-surface lg:text-[56px] lg:leading-[64px]">
            Prayer, Devotion, and Community under the Mantle of Santa Muerte.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-7 text-on-surface-variant">
            A calm house for petitions, guided novenas, and study. We gather under the
            white veil — purification, protection of the hearth, and care for the living
            and the dying.
          </p>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/petitions#offer"
              className="burgundy-glow inline-flex items-center rounded-sm bg-secondary-container px-6 py-3 text-sm font-semibold tracking-wider text-on-surface uppercase hover:bg-on-secondary"
            >
              Submit a Petition
            </Link>
            <Link
              href="#devotion-pillars"
              className="inline-flex items-center rounded-sm bg-surface-high/70 px-6 py-3 text-sm font-semibold tracking-wider text-tertiary uppercase hover:text-primary"
            >
              Explore the Devotion
            </Link>
          </div>
          <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-3 rounded-lg bg-surface-low/90 px-6 py-3 text-[12px] font-semibold tracking-wider text-on-surface-variant uppercase md:flex-row">
            <span>
              <strong className="text-on-surface">{petitionCount}</strong> petitions on the wall
            </span>
            <span>
              Novena <strong className="text-on-surface">Day {novena.day} of {novena.total}</strong>
            </span>
            <span>{silentCandles} silent candles offered</span>
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest py-16">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-12">
          <div className="relative overflow-hidden rounded-lg bg-surface-container p-6 gold-stroke lg:p-10">
            <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-sm bg-primary-container/30 px-3 py-0.5 text-[11px] font-semibold tracking-widest text-primary uppercase">
                    Active community novena
                  </span>
                  <span className="text-[11px] font-semibold tracking-widest text-secondary uppercase">
                    Day {novena.day} of {novena.total}
                  </span>
                </div>
                <h2 className="font-display text-[32px] leading-10 text-on-surface">{novena.title}</h2>
                <div className="space-y-1">
                  <div className="flex justify-between text-[12px] text-on-surface-variant">
                    <span>
                      Today: <span className="font-medium text-on-surface">{novena.today.title}</span>
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
                <blockquote className="font-display text-[22px] leading-7 text-on-surface-variant italic">
                  “{novena.today.prayer}”
                </blockquote>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/novenas"
                    className="candle-glow inline-flex rounded-sm bg-primary px-6 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase"
                  >
                    Join today’s prayer
                  </Link>
                  <Link
                    href="/novenas"
                    className="inline-flex items-center text-xs font-semibold tracking-wider text-on-surface-variant uppercase hover:text-primary"
                  >
                    View the 9-day guide
                  </Link>
                </div>
              </div>
              <div className="space-y-4 rounded-lg bg-surface-low p-6 text-center lg:col-span-4">
                <p className="font-display text-[26px] text-primary">{novenaVigil}</p>
                <p className="text-sm text-on-surface-variant">
                  people have marked today’s vigil since this count began
                </p>
                <form action={joinNovenaVigilAction}>
                  <button
                    type="submit"
                    className="w-full rounded-sm bg-surface-highest px-4 py-2 text-[11px] font-semibold tracking-wider uppercase hover:bg-surface-high"
                  >
                    Offer silent candle
                  </button>
                </form>
                <form action={offerSilentCandleAction}>
                  <button type="submit" className="text-[10px] tracking-widest text-on-surface-variant uppercase">
                    Add to the white candle tally
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devotion-pillars" className="bg-surface-lowest py-16">
        <div className="mx-auto max-w-[1200px] space-y-10 px-5 lg:px-12">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">Spiritual anchors</p>
            <h2 className="font-display text-[32px] leading-10">Devotional Resource Pillars</h2>
            <p className="text-on-surface-variant">
              Places to leave a petition, learn a prayer, and keep an altar without spectacle.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Pillar
              kicker="01 · Petitions"
              title="The Petition Wall"
              body="Leave an intention in public, under a veil, or in silent count. The wall is moderated. No hunting for contact. No harm asked in another person’s name."
              href="/petitions"
              cta="Visit Petition Wall"
            />
            <Pillar
              kicker="02 · Orations"
              title="Prayer Library"
              body="Short prayers you can actually say: morning, night, the sickroom, the road, and thanks when something already moved."
              href="/prayers"
              cta="Explore Prayers"
            />
            <Pillar
              kicker="03 · Heritage"
              title="Learning & Tradition"
              body="Who she is, why white, what belongs on an altar, and what this house will not do. Written for people who want the work, not a costume."
              href="/learn"
              cta="Begin Learning"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1200px] space-y-10 px-5 lg:px-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                Shared vigil
              </p>
              <h2 className="font-display text-[32px] leading-10">Recent petitions</h2>
            </div>
            <Link href="/petitions" className="text-xs font-semibold tracking-wider text-tertiary uppercase hover:text-primary">
              View all petitions
            </Link>
          </div>
          {petitions.length === 0 ? (
            <p className="text-on-surface-variant">
              The wall is quiet until the database is connected. You can still read the prayers and
              the novena.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {petitions.map((petition) => (
                <PetitionCard key={petition.id} petition={petition} joinAction={joinVigilAction} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1200px] space-y-10 px-5 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
              Calm welcome
            </p>
            <h2 className="font-display text-[32px] leading-10">What is Niña Blanca?</h2>
            <p className="mt-2 leading-relaxed text-on-surface-variant">
              Santa Muerte is approached in many colors. This sanctuary gathers mainly under the
              white aspect: peace, cleansing, healing, and a death that is not mocked.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Note
              title="The White Aspect"
              body="Known as Niña Blanca, the white cloak is purification, protection of the hearth, and the untying of strife. We stay with that work here."
              tag="Purification · Peace"
            />
            <Note
              title="A sanctuary of care"
              body="No carnival skulls for clicks. No invented ranks. Practice here is prayer, history, and how you treat the living people in the room."
              tag="Reverence · History"
            />
            <Note
              title="Privacy and respect"
              body="You may sign a name, use a veil, or keep the petition off the wall entirely. We do not sell lists. We do not broker introductions."
              tag="Discretion · Safety"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest py-16">
        <div className="mx-auto max-w-[1000px] px-5 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-8 rounded-lg bg-surface-container p-6 gold-stroke lg:flex-row lg:p-10">
            <div className="max-w-xl space-y-3">
              <p className="inline-flex rounded-sm bg-surface-high px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                Transparent stewardship · voluntary
              </p>
              <h2 className="font-display text-[26px] leading-8">Sustaining the sanctuary</h2>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Niña Blanca is meant to stay ad-free. Offerings, when they come, pay for hosting
                and for candles on a physical altar. Nothing on this site is a paid spell.
              </p>
            </div>
            <Link
              href="/support"
              className="candle-glow inline-flex rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-on-primary uppercase"
            >
              Support Niña Blanca
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Pillar({
  kicker,
  title,
  body,
  href,
  cta,
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-surface-container gold-stroke">
      <div className="space-y-3 p-6">
        <p className="text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase">{kicker}</p>
        <h3 className="font-display text-[26px] leading-8">{title}</h3>
        <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
      </div>
      <div className="px-6 pb-6">
        <Link href={href} className="text-xs font-semibold tracking-wider text-primary uppercase hover:text-primary-container">
          {cta}
        </Link>
      </div>
    </div>
  );
}

function Note({ title, body, tag }: { title: string; body: string; tag: string }) {
  return (
    <div className="space-y-3 rounded-lg bg-surface-container p-6 gold-stroke">
      <h3 className="font-display text-[22px] leading-7">{title}</h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
      <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">{tag}</p>
    </div>
  );
}
