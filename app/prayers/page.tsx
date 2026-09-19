import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Prayer Library",
  "Short prayers for Santa Muerte in her white aspect.",
);

export default function PrayersPage() {
  return (
    <ContentPage
      kicker="Orations"
      title="Prayer library"
      lede="Say these out loud or in the mouth. They are short on purpose. A prayer you finish is better than a page you skip."
    >
      <h2>In the morning</h2>
      <p>
        Niña Blanca, I get up under your robe. Keep my hands clean in the work. Keep my
        mouth from making a smaller world. Walk me to the door and wait for me at night.
      </p>
      <h2>For a sickroom</h2>
      <p>
        White Mother, you know beds. Sit with this body. Cool what burns. If healing
        comes, let it come without humiliation. If death comes, let it come with company.
      </p>
      <h2>For a house that will not settle</h2>
      <p>
        Lady of the clean table, take the shouting out of these rooms. If we must speak
        hard things, let us speak them without breaking the plates. Guard the children
        first.
      </p>
      <h2>For the road</h2>
      <p>
        Santa Muerte Blanca, you keep the crossing. Let this trip be boring. Let the
        arrival be ordinary. If someone is waiting, let them still be waiting.
      </p>
      <h2>When something already moved</h2>
      <p>
        I do not only knock. I name what you already did. Thank you. I will not spend
        the gift as if it were nothing.
      </p>
    </ContentPage>
  );
}
