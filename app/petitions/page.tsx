import Link from "next/link";
import { joinVigilAction, submitPetitionAction } from "@/app/actions";
import { PetitionCard } from "@/components/petition-card";
import { petitionCategories } from "@/lib/nav";
import { getNovena } from "@/lib/novena";
import {
  countVisiblePetitions,
  getCounter,
  listPetitions,
  type Petition,
} from "@/lib/petitions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Petition Wall" };

export default async function PetitionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const novena = getNovena();
  let petitions: Petition[] = [];
  let count = 0;
  let candles = 0;
  try {
    petitions = await listPetitions(category);
    count = await countVisiblePetitions();
    candles = await getCounter("silent_candles");
  } catch {
    petitions = [];
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-10 px-5 py-10 lg:px-12">
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-8">
          <p className="text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase">
            Sanctuary of Peace · Devotional intentions
          </p>
          <h1 className="font-display text-[38px] leading-none tracking-tight lg:text-[56px]">
            The Petition Wall
          </h1>
          <p className="max-w-2xl text-lg leading-7 text-on-surface-variant">
            Place an intention under the white robe. Public, veiled, or held only in the
            silent count. Harm toward a named person is not received here.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link
            href="#offer"
            className="burgundy-glow inline-flex rounded-sm bg-secondary-container px-6 py-2 text-xs font-semibold tracking-wider text-on-surface uppercase"
          >
            Offer your petition
          </Link>
          <p className="mt-2 text-[12px] text-on-surface-variant">
            {count} intentions visible on the wall
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-sm bg-surface-low p-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-[22px] text-primary">Sacred trust and anonymity</h2>
          <p className="mt-1 max-w-3xl text-sm text-on-surface-variant">
            Write as if a stranger will read it. Do not include phone numbers, addresses, or
            another person’s full legal name. Silent vigil stays off this list.
          </p>
        </div>
        <Link href="/ethics-and-safety" className="text-xs font-semibold tracking-wider text-primary uppercase">
          Devotional ethics
        </Link>
      </div>

      <div className="overflow-hidden rounded-sm bg-surface-lowest gold-stroke">
        <div className="grid min-h-[280px] grid-cols-1 lg:grid-cols-12">
          <div className="relative h-64 lg:col-span-7 lg:h-auto">
            <img
              src="/altar-hero.png"
              alt="Perpetual altar with white cloth and votive candles"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-surface-lowest/70 to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center bg-surface-low p-8 lg:col-span-5">
            <p className="mb-2 text-[11px] font-semibold tracking-widest text-primary uppercase">
              Sanctuary of the White Veil
            </p>
            <h2 className="font-display mb-2 text-[26px]">The Perpetual Altar</h2>
            <p className="mb-4 text-on-surface-variant">
              The wall is digital. The candle count is real to this site. A physical altar
              is a later offering, not a claim we make until it exists.
            </p>
            <p className="font-display text-[22px] text-primary">{candles}</p>
            <p className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
              White candles marked here
            </p>
          </div>
        </div>
      </div>

      <section
        id="offer"
        className="rounded-sm p-6 lg:p-10"
        style={{
          background: "linear-gradient(145deg, rgb(43, 14, 20) 0%, rgb(28, 8, 12) 100%)",
          border: "1px solid rgba(130, 37, 48, 0.4)",
        }}
      >
        <h2 className="font-display mb-1 text-[26px]">Offer your petition</h2>
        <p className="mb-6 text-sm text-on-surface-variant">
          Your words are received as prayer, not as a purchased working.
        </p>
        <form action={submitPetitionAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-1 text-[12px] font-semibold tracking-wider uppercase">
              Intention summary
              <input
                required
                name="title"
                maxLength={140}
                className="mt-1 w-full rounded-sm bg-surface-lowest px-4 py-2 text-base font-normal tracking-normal normal-case text-on-surface"
                placeholder="e.g. Peace in our house this week"
              />
            </label>
            <label className="space-y-1 text-[12px] font-semibold tracking-wider uppercase">
              Spiritual aspect
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
            The words of your heart
            <textarea
              required
              name="body"
              rows={4}
              maxLength={2000}
              className="mt-1 w-full rounded-sm bg-surface-lowest p-4 text-base font-normal tracking-normal normal-case text-on-surface"
              placeholder="Speak plainly. Leave out other people’s private details."
            />
          </label>
          <label className="block text-[12px] font-semibold tracking-wider uppercase">
            How to show your name
            <input
              name="displayName"
              maxLength={80}
              className="mt-1 w-full rounded-sm bg-surface-lowest px-4 py-2 text-base font-normal tracking-normal normal-case text-on-surface"
              placeholder="M. from Chicago — ignored if you choose veiled or silent"
            />
          </label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Privacy value="public" label="Public" body="Show the name you typed." defaultChecked />
            <Privacy value="anonymous" label="Veiled" body="Shown as a devotee in prayer." />
            <Privacy value="silent" label="Silent vigil" body="Off the wall. Counted only." />
          </div>
          <label className="flex items-center gap-3 rounded-sm bg-surface-low p-4 text-sm">
            <input type="checkbox" name="candle" className="accent-primary" />
            Mark a white candle with this intention
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="candle-glow rounded-sm bg-primary px-6 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase"
            >
              Place intention on altar
            </button>
          </div>
        </form>
      </section>

      <div className="flex flex-col justify-between gap-4 rounded-sm bg-surface-high p-6 md:flex-row md:items-center">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
            Active devotion · Day {novena.day} of {novena.total}
          </p>
          <h2 className="font-display text-[26px]">{novena.title}</h2>
          <p className="text-sm text-on-surface-variant">{novena.today.focus}</p>
        </div>
        <Link href="/novenas" className="rounded-sm bg-surface-lowest px-4 py-2 text-xs font-semibold tracking-wider uppercase">
          Read today’s prayer
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip href="/petitions" active={!category}>
          All
        </FilterChip>
        {petitionCategories.map((item) => (
          <FilterChip
            key={item.id}
            href={`/petitions?category=${item.id}`}
            active={category === item.id}
          >
            {item.label.split(",")[0]}
          </FilterChip>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {petitions.map((petition) => (
          <PetitionCard key={petition.id} petition={petition} joinAction={joinVigilAction} />
        ))}
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
        <strong className="block text-primary">{label}</strong>
        <span className="text-on-surface-variant">{body}</span>
      </span>
    </label>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-sm bg-primary px-3 py-1.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase"
          : "rounded-sm bg-surface-highest px-3 py-1.5 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface"
      }
    >
      {children}
    </Link>
  );
}
