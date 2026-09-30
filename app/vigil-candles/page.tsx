import { offerSilentCandleAction } from "@/app/actions";
import { PendingButton, ToastForm } from "@/components/action-button";
import { PageHero } from "@/components/page-hero";
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
    <div className="pb-16">
      <PageHero
        kicker="Devotion"
        title="Vigil candles"
        lede="White candles offered in silent vigil."
      />
      <section className="mx-auto max-w-[720px] space-y-6 px-5">
        <p className="font-display text-[48px] leading-none text-primary">{count}</p>
        <ToastForm action={offerSilentCandleAction} success="Silent candle offered.">
          <PendingButton
            pendingLabel="Offering…"
            className="rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-on-primary uppercase"
          >
            Offer Silent Candle
          </PendingButton>
        </ToastForm>
      </section>
    </div>
  );
}
