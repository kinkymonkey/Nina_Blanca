import { offerSilentCandleAction } from "@/app/actions";
import { getCounter } from "@/lib/petitions";

export const metadata = { title: "Vigil Candles" };
export const dynamic = "force-dynamic";

export default async function Page() {
  let count = 0;
  try {
    count = await getCounter("silent_candles");
  } catch {
    count = 0;
  }

  return (
    <div className="mx-auto max-w-[720px] space-y-6 px-5 py-12">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
        Devotion
      </p>
      <h1 className="font-display text-[40px] leading-[48px]">Vigil candles</h1>
      <p className="text-lg text-on-surface-variant">
        Each mark here is a person who asked to add a white candle to the count. It is not
        yet a lamp on a street-side shrine unless we say so on Stewardship.
      </p>
      <p className="font-display text-[40px] text-primary">{count}</p>
      <form action={offerSilentCandleAction}>
        <button
          type="submit"
          className="rounded-sm bg-primary px-5 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase"
        >
          Offer a silent candle
        </button>
      </form>
    </div>
  );
}
