import Link from "next/link";
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
        If someone is in danger, call the people whose job is the body. Light a candle after, not
        instead. A novena does not set a broken bone. A petition does not stop a fist.
      </p>
      <h2>Consent</h2>
      <p>
        Do not post another adult’s private medical or legal story. Do not pray people back into
        a house they fled. Do not ask the White Mantle to bind a lover. That work is refused
        here.
      </p>
      <h2>Money and fear</h2>
      <p>
        Anyone who tells you Santa Muerte will ruin you unless you pay them is running a hustle.
      </p>
      <h2>Fire and rooms</h2>
      <p>
        Never leave a flame unattended. Glass votives crack. Pets knock tables. If you cannot
        keep fire, keep water and a word. See{" "}
        <Link href="/altar-care" className="text-primary">
          Altar care
        </Link>
        .
      </p>
      <h2>The reciprocal cut</h2>
      <p>
        If you come to the black robe out of spite, this house still will not help you name a
        target. Read{" "}
        <Link href="/colors-and-aspects?robe=negra" className="text-primary">
          La Niña Negra
        </Link>{" "}
        for the teaching, not for a working.
      </p>
    </ContentPage>
  );
}
