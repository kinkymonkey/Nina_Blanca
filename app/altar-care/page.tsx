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
        A stable surface, out of the walkway, away from pets that will knock it. High enough
        that children cannot pull a flame into a curtain.
      </p>
      <h2>Daily</h2>
      <p>
        Fresh water. Trim or replace the candle. Speak one sentence, even if you are late
        and tired. That is the work.
      </p>
      <h2>When you travel</h2>
      <p>
        Put the flame out. Cover the statue if dust or disrespect will reach it. She does
        not require you to burn the apartment down to prove faith.
      </p>
    </ContentPage>
  );
}
