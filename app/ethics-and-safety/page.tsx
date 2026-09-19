import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Ethics and Devotional Safety",
  "Limits of this sanctuary and of the work itself.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Trust"
      title="Ethics and devotional safety"
      lede="Prayer is not a replacement for a doctor, a lawyer, or a locked door."
    >
      <h2>The body</h2>
      <p>
        If someone is in danger, call the people whose job is the body. Light a candle
        after, not instead.
      </p>
      <h2>Consent</h2>
      <p>
        Do not post another adult’s private medical or legal story. Do not pray people
        back into a house they fled.
      </p>
      <h2>Money and fear</h2>
      <p>
        Anyone who tells you Santa Muerte will ruin you unless you pay them is running a
        hustle. Leave.
      </p>
    </ContentPage>
  );
}
