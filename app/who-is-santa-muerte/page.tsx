import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Who is Santa Muerte",
  "A plain introduction to Santa Muerte and the white aspect honored here.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Learn"
      title="Who is Santa Muerte"
      lede="Santa Muerte is Holy Death — a folk saint of Mexico and the Mexican diaspora, approached for protection, healing, justice, and a death that is not abandoned."
    >
      <h2>Not a costume, not a mascot</h2>
      <p>
        People keep her as a companion at the edge of danger: illness, prisons, night work,
        migration, and the ordinary fear of dying alone. She is not a Halloween prop and
        she is not a brand mascot.
      </p>
      <h2>Why Niña Blanca</h2>
      <p>
        Devotees speak of her in colors. White is the aspect of cleansing, peace, and the
        untying of knots. This site stays with that current so the house has a clear job.
      </p>
      <h2>What we will not pretend</h2>
      <p>
        We are not the Vatican and we are not a cartel chapel. We are a small public table
        for prayer and study. If you need a living godparent, find one in the flesh. This
        page cannot replace that.
      </p>
    </ContentPage>
  );
}
