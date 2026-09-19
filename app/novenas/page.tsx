import Link from "next/link";
import { joinNovenaVigilAction } from "@/app/actions";
import { getNovena } from "@/lib/novena";
import { getCounter } from "@/lib/petitions";

export const metadata = { title: "Novenas" };
export const dynamic = "force-dynamic";

export default async function NovenasPage() {
  const novena = getNovena();
  let vigil = 0;
  try {
    vigil = await getCounter("novena_vigil");
  } catch {
    vigil = 0;
  }

  return (
    <div className="mx-auto max-w-[800px] space-y-8 px-5 py-12">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
        Nine days · one house
      </p>
      <h1 className="font-display text-[40px] leading-[48px]">{novena.title}</h1>
      <p className="text-lg text-on-surface-variant">
        This novena started 16 September 2026 and repeats in a nine-day cycle. Today is day{" "}
        {novena.day}: {novena.today.title}.
      </p>
      <div className="rounded-lg bg-surface-container p-6 gold-stroke">
        <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
          Day {novena.day} of {novena.total} · {novena.today.focus}
        </p>
        <blockquote className="font-display mt-4 text-[22px] leading-8 italic text-on-surface">
          “{novena.today.prayer}”
        </blockquote>
        <form action={joinNovenaVigilAction} className="mt-6">
          <button
            type="submit"
            className="rounded-sm bg-primary px-5 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase"
          >
            I prayed today ({vigil} marked)
          </button>
        </form>
      </div>
      <p className="text-sm text-on-surface-variant">
        Full day-by-day prayers live on this page as the cycle turns. For a single oration
        outside the novena, see the{" "}
        <Link href="/prayers" className="text-primary">
          prayer library
        </Link>
        .
      </p>
    </div>
  );
}
