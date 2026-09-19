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
      <p>The name you type is shown. Use an initial if a full name would put someone at risk.</p>
      <h2>Veiled</h2>
      <p>The wall shows “A devotee in prayer.” The words still appear.</p>
      <h2>Silent vigil</h2>
      <p>
        The words are stored so the house can count them, but they do not appear on the
        public wall. Do not put secrets you could not bear a database leak to hold.
      </p>
      <h2>Accounts</h2>
      <p>There are no logins yet. There is no profile to steal. Do not paste passwords here.</p>
    </ContentPage>
  );
}
