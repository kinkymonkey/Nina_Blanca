import Link from "next/link";
import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Community Guidelines",
  "Rules for the Niña Blanca petition wall.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Trust"
      title="Community guidelines"
      lede="This is a prayer wall, not a comments section."
    >
      <h2>Allowed</h2>
      <p>
        Healing, peace in a house, safe travel, work that does not steal, thanks for what already
        came, grief that needs company. Names of the living who asked to be named. Initials when
        a full name would put someone at risk.
      </p>
      <h2>Not allowed</h2>
      <p>
        Harm aimed at a named person. Binding, domination, or “return to me” aimed at someone who
        left. Sexual content involving minors. Ads. Recruiting for a paid brujo. Doxxing. Using
        the wall to hunt dates. Invented miracles posted as proof this site runs an altar in
        another city.
      </p>
      <h2>Tone</h2>
      <p>
        Write as if a tired person will read it at 2 a.m. No all-caps curses. No screenshots of
        other people’s medical charts. No tags that turn a petition into a pile-on.
      </p>
      <h2>What we will do</h2>
      <p>
        Hide a post. Ban a pattern of abuse. We are small. We will miss things.
      </p>
      <h2>Related</h2>
      <p>
        <Link href="/privacy-and-anonymity" className="text-primary">
          Privacy
        </Link>
        ,{" "}
        <Link href="/ethics-and-safety" className="text-primary">
          Ethics
        </Link>
        , and the{" "}
        <Link href="/petitions" className="text-primary">
          petition wall
        </Link>
        .
      </p>
    </ContentPage>
  );
}
