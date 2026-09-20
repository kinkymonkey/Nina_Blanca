import Link from "next/link";
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
        migration, and the ordinary fear of dying alone. She is not a Halloween prop and she is
        not a brand mascot. A skull in a shop window is not the same work as water on a table.
      </p>
      <h2>Folk saint, not a Vatican file</h2>
      <p>
        Devotees were often raised Catholic. The institutional Church does not approve this
        devotion. People still pray. This house does not pretend to settle that argument, and it
        does not sell a rank that replaces a living godparent.
      </p>
      <h2>Why Niña Blanca</h2>
      <p>
        Devotees speak of her in colors. White is the aspect of cleansing, peace, and the untying
        of knots. This site stays with that current so the house has a clear job. Other robes are
        taught on{" "}
        <Link href="/colors-and-aspects" className="text-primary">
          Aspects &amp; Colors
        </Link>{" "}
        so you are not lost in a catalog.
      </p>
      <h2>What we will not pretend</h2>
      <p>
        We are not the Vatican and we are not a cartel chapel. We are a small public table for
        prayer and study. If you need a living teacher, find one in the flesh. This page cannot
        replace that.
      </p>
      <h2>Where to go next</h2>
      <p>
        Read{" "}
        <Link href="/learn" className="text-primary">
          Learn
        </Link>
        , keep a glass of water as in{" "}
        <Link href="/altar-care" className="text-primary">
          Altar care
        </Link>
        , or leave a word on the{" "}
        <Link href="/petitions" className="text-primary">
          petition wall
        </Link>{" "}
        without naming harm.
      </p>
    </ContentPage>
  );
}
