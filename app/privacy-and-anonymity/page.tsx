import Link from "next/link";
import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Privacy and Anonymity",
  "How names appear on the Niña Blanca wall.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Trust"
      title="Privacy and anonymity"
      lede="Three ways to leave a petition. Pick the one that lets you sleep."
    >
      <h2>Public</h2>
      <p>
        The name you type is shown. Use an initial if a full name would put someone at risk. Do
        not paste a passport number, a hospital room, or a street address.
      </p>
      <h2>Veiled</h2>
      <p>The wall shows “A devotee in prayer.” The words still appear. The name does not.</p>
      <h2>Silent vigil</h2>
      <p>
        The words are stored so the house can count them, but they do not appear on the public
        wall. Do not put secrets you could not bear a database leak to hold. Prayer is not a
        vault.
      </p>
      <h2>Accounts and tracking</h2>
      <p>
        There are no logins yet. There is no profile to steal. Do not paste passwords here. This
        site is not a church registry and not a police blotter.
      </p>
      <h2>Other people</h2>
      <p>
        Do not post another adult’s private medical or legal story. Do not name a child in a way
        that would identify a school or a custody fight. See{" "}
        <Link href="/community-guidelines" className="text-primary">
          Community guidelines
        </Link>
        .
      </p>
    </ContentPage>
  );
}
