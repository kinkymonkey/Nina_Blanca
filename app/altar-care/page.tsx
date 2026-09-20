import Link from "next/link";
import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta("Altar Care", "How to keep a small Santa Muerte altar.");

export default function Page() {
  return (
    <ContentPage
      kicker="Learn"
      title="Altar care"
      lede="An altar is a workplace. Dust it. Change the water. Do not treat it like a shelf of trophies."
    >
      <h2>Place</h2>
      <p>
        A stable surface, out of the walkway, away from pets that will knock it. High enough that
        children cannot pull a flame into a curtain. North-facing is traditional in some houses;
        a quiet corner you will actually tend is better than a perfect compass you ignore.
      </p>
      <h2>Daily</h2>
      <p>
        Fresh water. Trim or replace the candle. Speak one sentence, even if you are late and
        tired. That is the work. If the water clouds or evaporates fast, discard it outside,
        rinse the glass with salt, and pour again. Do not invent a drama around it.
      </p>
      <h2>Flowers and smoke</h2>
      <p>
        White blooms that have gone slimy are not an offering. Remove them. Copal or incense
        belongs only where the room can take smoke. Open a window. Read{" "}
        <Link href="/journal/blessed-botany" className="text-primary">
          Blessed botany
        </Link>{" "}
        if you want the longer teaching.
      </p>
      <h2>Several colors on one shelf</h2>
      <p>
        Traditional keepers give La Niña Negra her own glass of water if she shares space with
        white. Do not mix every petition into one bowl and call it seven powers. See{" "}
        <Link href="/colors-and-aspects" className="text-primary">
          Aspects &amp; Colors
        </Link>
        .
      </p>
      <h2>When you travel</h2>
      <p>
        Put the flame out. Cover the statue if dust or disrespect will reach it. She does not
        require you to burn the apartment down to prove faith. A petition on the{" "}
        <Link href="/petitions" className="text-primary">
          wall
        </Link>{" "}
        can hold a name until you return.
      </p>
    </ContentPage>
  );
}
