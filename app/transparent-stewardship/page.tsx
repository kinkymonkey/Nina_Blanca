import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Transparent Stewardship",
  "How Niña Blanca will account for money and claims.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Trust"
      title="Transparent stewardship"
      lede="Until there is income, there is nothing to hide and nothing to boast."
    >
      <h2>Right now</h2>
      <p>
        The costs are a domain, GitHub, Vercel, and a database. No donation button is live.
        No one is on a payroll from this site.
      </p>
      <h2>When money moves</h2>
      <p>
        This page will list month, amount, and what it bought. If a physical altar is lit
        in correspondence with this wall, we will say where and who tends it — or we will
        not claim it.
      </p>
    </ContentPage>
  );
}
