import Link from "next/link";
import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Traditional Offerings",
  "Simple offerings used in Santa Muerte devotion.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Learn"
      title="Traditional offerings"
      lede="Give what you can keep up. A glass of water every day beats a pile of gifts you dump and forget."
    >
      <h2>The ordinary table</h2>
      <p>
        Fresh water, a white candle, flowers that have not gone slimy, incense if smoke is allowed
        in the room. Bread, fruit, or a little of what you actually eat. White carnations, jasmine,
        or a single Casablanca lily if you can keep them alive.
      </p>
      <h2>White-aspect gifts</h2>
      <p>
        Under the White Mantle the table stays clean: cool water changed daily, white cloth, a
        candle you can tend without burning the house. Honey, milk, or sweet bread belong here
        more than bitter liquor meant to look hard.
      </p>
      <h2>What not to offer as a stunt</h2>
      <p>
        Do not pour liquor you cannot handle. Do not leave meat to rot “for power.” Do not steal
        flowers from a grave to look hard. She does not need your mess to be fed. Do not offer
        another person’s body, will, or name as a sacrifice.
      </p>
      <h2>After a petition is granted</h2>
      <p>
        Keep the vow. Flowers, bread, coins given away without a caption, or a novena of thanks.
        Read the{" "}
        <Link href="/novenas/thanksgiving" className="text-primary">
          thanksgiving cycle
        </Link>{" "}
        if you need a shape for nine days of gratitude.
      </p>
      <h2>Digital offerings</h2>
      <p>
        A petition on this site is a word, not a substitute for water on a real table. If you have
        no altar, a cup of water and a candle still count.
      </p>
    </ContentPage>
  );
}
