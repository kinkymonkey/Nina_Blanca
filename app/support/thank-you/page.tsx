import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = {
  ...buildPageMetadata({
    title: "Thank you",
    description: "A quiet thanks for a gift to Niña Blanca.",
    path: "/support/thank-you",
  }),
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ usd?: string }>;
}) {
  const { usd } = await searchParams;
  const amount = usd && /^\d+(\.\d+)?$/.test(usd) ? usd : null;

  return (
    <div className="pb-16">
      <PageHero
        kicker="Thank you"
        title="The gift is received"
        lede="If checkout finished, thank you. Prayer on this site stays free."
      />
      <section className="mx-auto max-w-[720px] space-y-5 px-5 lg:px-12">
        <p className="text-sm leading-relaxed text-on-surface-variant">
          {amount ? <>You chose ${amount}.</> : null} Donations keep the site running and help pay
          for writing.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/petitions#offer"
            className="inline-flex rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-on-primary uppercase"
          >
            Submit a Petition
          </Link>
          <Link href="/" className="inline-flex text-xs font-semibold tracking-wider text-primary uppercase">
            Home
          </Link>
        </div>
      </section>
    </div>
  );
}
