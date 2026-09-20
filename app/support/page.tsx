import { DonationOfferings } from "@/components/donation-offerings";
import { paymongoConfigured, paymongoMode } from "@/lib/donate-server";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Donate",
  description: "Voluntary donations keep Niña Blanca online and help pay for writing and ordinary upkeep. Prayer stays free.",
  path: "/support",
  image: "/support-twilight-altar.jpg",
});

export default function SupportPage() {
  return (
    <div className="pb-16">
      <div className="mx-auto max-w-[1200px] px-5 pt-8 lg:px-12">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Support</p>
        <h1 className="mt-2 font-display text-[36px] leading-tight text-on-surface md:text-[48px]">Donate</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          Prayer, petitions, and the library stay free. A gift here is optional.
        </p>
      </div>

      <section
        id="offerings"
        className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-12 lg:px-12"
      >
        <article className="rounded-lg bg-surface-container p-6 gold-stroke lg:col-span-6 lg:p-8">
          <h2 className="font-display text-[26px] leading-8">Give</h2>
          <p className="mt-2 text-sm text-on-surface-variant">$5, $10, $20, or another amount.</p>
          <div className="mt-6">
            <DonationOfferings configured={paymongoConfigured()} mode={paymongoMode()} />
          </div>
        </article>

        <article className="space-y-5 lg:col-span-6">
          <h2 className="font-display text-[26px] leading-8">Where donations are used</h2>
          <p className="leading-7 text-on-surface-variant">
            Donations keep the site running. They help pay for hosting, writing new pages and
            journal pieces, and ordinary upkeep so prayer can stay free.
          </p>
        </article>
      </section>
    </div>
  );
}
