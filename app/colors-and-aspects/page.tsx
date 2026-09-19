import { ContentPage, pageMeta } from "@/components/content-page";

export const metadata = pageMeta(
  "Colors and Aspects",
  "How color is used in Santa Muerte devotion, and why this house keeps white.",
);

export default function Page() {
  return (
    <ContentPage
      kicker="Learn"
      title="Colors and aspects"
      lede="Color on an altar is a way of naming the work. It is not a menu of spells."
    >
      <h2>White</h2>
      <p>
        Cleansing, peace, protection of the home, healing, blessing a new table. This is
        the robe of Niña Blanca.
      </p>
      <h2>Other colors, named without selling them</h2>
      <p>
        Red is often love and blood-heat. Gold is often livelihood. Black is often
        shielding and the grave itself. We mention them so you are not lost in a shop.
        We do not run those workings on this site.
      </p>
      <h2>Mixing</h2>
      <p>
        Many devotees keep more than one robe. If you do, keep the jobs distinct. Do not
        dump every fear onto one candle and call it tradition.
      </p>
    </ContentPage>
  );
}
