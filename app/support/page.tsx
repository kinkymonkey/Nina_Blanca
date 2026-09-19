import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Support",
  "How Niña Blanca is paid for, and what we will not sell.",
);

export default function SupportPage() {
  return (
    <ContentPage
      kicker="Stewardship"
      title="Support Niña Blanca"
      lede="This site is not a shop. When money is asked for, it will be for hosting and for candles — named, not vague."
    >
      <h2>What you are not buying</h2>
      <p>
        A petition on this wall is not a paid working. No one here will “do a job” on a
        named enemy for a fee. If a page ever claims that, it is not this sanctuary.
      </p>
      <h2>What money would actually do</h2>
      <p>
        Domain, Vercel, the database, and — if a physical altar is kept — wax, oil, water,
        and flowers. We will post that accounting on Transparent Stewardship when there is
        anything to count.
      </p>
      <h2>For now</h2>
      <p>
        There is no payment button yet. If you want the house to continue, keep the wall
        decent, share a prayer, and come back tomorrow. A giving link will appear here
        when it exists, with the same plain language.
      </p>
    </ContentPage>
  );
}
