import { SacredColorsPage } from "@/components/sacred-colors-page";
import { pageMeta } from "@/components/content-page";
import { getCounter } from "@/lib/petitions";

export const metadata = pageMeta(
  "The Sacred Colors & Aspects",
  "The seven robes of Santa Muerte: white, black, red, gold, green, blue, purple, bone, and the seven powers.",
  "/colors-and-aspects",
);
export const dynamic = "force-dynamic";

export default async function ColorsPage({
  searchParams,
}: {
  searchParams: Promise<{ robe?: string }>;
}) {
  const { robe } = await searchParams;
  const allowed = new Set(["all", "negra", "roja", "dorada", "verde", "azul", "morada", "hueso", "potencias"]);
  const filter = robe && allowed.has(robe) ? robe : "all";
  let blackVotive = 0;
  try {
    blackVotive = await getCounter("black_votive");
  } catch {
    blackVotive = 0;
  }
  return <SacredColorsPage filter={filter} blackVotive={blackVotive} />;
}
