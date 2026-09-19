import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "History and FAQ",
  "Plain questions about Santa Muerte devotion.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Learn"
      title="History and FAQ"
      lede="Folk practice is older than any one website. These answers are short so they stay honest."
    >
      <h2>Is this Catholic?</h2>
      <p>
        Many devotees were raised Catholic. The institutional Church does not approve this
        devotion. People still pray. We do not settle that argument here.
      </p>
      <h2>Is Santa Muerte only for criminals?</h2>
      <p>
        No. News cameras like a skull next to a crime scene. Nurses, mothers, migrants, and
        night-shift workers keep her too. Crime is not a sacrament.
      </p>
      <h2>Do I need to be Mexican?</h2>
      <p>
        You need respect, not a costume. If this is not your culture, learn before you
        decorate your body with her. Do not lecture people who grew up with the work.
      </p>
      <h2>Can I ask her to hurt someone?</h2>
      <p>
        Not on this wall. Take that request somewhere else, or better, put it down.
      </p>
    </ContentPage>
  );
}
