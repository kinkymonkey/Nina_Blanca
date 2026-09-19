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
        Healing, peace in a house, safe travel, work that does not steal, thanks for what
        already came, grief that needs company.
      </p>
      <h2>Not allowed</h2>
      <p>
        Harm aimed at a named person. Sexual content involving minors. Ads. Recruiting for
        a paid brujo. Doxxing. Using the wall to hunt dates.
      </p>
      <h2>What we will do</h2>
      <p>
        Hide a post. Ban a pattern of abuse. We are small. We will miss things. Email will
        appear here when moderation has a mailbox.
      </p>
    </ContentPage>
  );
}
