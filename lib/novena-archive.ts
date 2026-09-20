export type NovenaKind = "healing" | "protection" | "peace" | "gratitude";

export type ArchiveNovena = {
  slug: string;
  title: string;
  body: string;
  offer: string;
  kind: NovenaKind;
  kindLabel: string;
  duration: string;
  pace: string;
  cta: string;
  href?: string;
  days: string[];
};

export const ARCHIVE_NOVENAS: ArchiveNovena[] = [
  {
    slug: "bodily-health",
    title: "Novena for Restoration of Bodily Health",
    body: "Invoking the soothing touch of the White Sister over chronic infirmity, convalescence, and mental exhaustion.",
    offer: "Seven fresh white carnations, clean well water changed each morning, unlit white tapers.",
    kind: "healing",
    kindLabel: "Healing & Solace",
    duration: "9 Days",
    pace: "Cycle starts: Nov 1st",
    cta: "Begin Novena",
    days: [
      "Day 1 — Name the body without drama. Water. Sit.",
      "Day 2 — Physicians and the people on the night shift.",
      "Day 3 — Pain that will not perform for visitors.",
      "Day 4 — Sleep, if it will come; company if it will not.",
      "Day 5 — The room: keep it clean enough to heal in.",
      "Day 6 — Fear of the scan, the bill, the wait.",
      "Day 7 — Those who cannot visit.",
      "Day 8 — If healing comes, without humiliation.",
      "Day 9 — Thanks, or a decent ending, or both.",
    ],
  },
  {
    slug: "peaceful-sleep",
    title: "Novena of Peaceful Sleep & Stillness of Mind",
    body: "Dedicated to those enduring nighttime agitation, intrusive anxieties, terror, and the quiet heaviness of sorrow.",
    offer: "Glass of water with natural salt beneath the bed, dried lavender, quiet twilight recitations.",
    kind: "peace",
    kindLabel: "Peace in Home",
    duration: "9 Days",
    pace: "Self-Paced Rite",
    cta: "Begin Novena",
    days: [
      "Day 1 — Put the phone down. Name the hour you will pray.",
      "Day 2 — The argument that wants to replay.",
      "Day 3 — The body that will not unclench.",
      "Day 4 — Sorrow that is not content.",
      "Day 5 — Terror that has no plot.",
      "Day 6 — The people who share the bed or the wall.",
      "Day 7 — Dawn that comes too fast.",
      "Day 8 — A mind that can be still for one decade of breath.",
      "Day 9 — Thanks for any night that was only a night.",
    ],
  },
  {
    slug: "maternal-protection",
    title: "Novena of Maternal Protection from Harms & Envy",
    body: "Traditional Mexican lineage prayer establishing the impenetrable shield of the Holy White Veil across your family.",
    offer: "White silk ribbon, white votive candle anointed with frankincense or rosemary oil.",
    kind: "protection",
    kindLabel: "Protection",
    duration: "9 Days",
    pace: "Active Community Novena",
    cta: "View Day 4",
    href: "/novenas#current",
    days: [
      "Day 1 — The door, the lintel, the first step inside.",
      "Day 2 — Envy that is not imagined and envy that is.",
      "Day 3 — The children, named.",
      "Day 4 — The street and the walk home.",
      "Day 5 — Discord in the shared rooms.",
      "Day 6 — Gossip that wants a seat at the table.",
      "Day 7 — Work that follows you through the door.",
      "Day 8 — Keep us from becoming cruel while we are afraid.",
      "Day 9 — Tie the ribbon. Change the water. Do not boast.",
    ],
  },
  {
    slug: "reconciling-families",
    title: "Novena of Reconciling Estranged Families",
    body: "Softening bitter speech, dissolving ancient resentments between bloodlines, and invoking maternal equanimity.",
    offer: "Pure wild honey in a small earthen dish, sweet bread (pan dulce), family name written in pencil.",
    kind: "peace",
    kindLabel: "Peace in Home",
    duration: "9 Days",
    pace: "Self-Paced Rite",
    cta: "Begin Novena",
    days: [
      "Day 1 — Write the names. Do not send the message yet.",
      "Day 2 — The hard word that already landed.",
      "Day 3 — The apology that will not come yet.",
      "Day 4 — Your own mouth.",
      "Day 5 — The living who are tired of the feud.",
      "Day 6 — The dead who are used as weapons.",
      "Day 7 — If a heart can turn, turn it. If it cannot, keep us from theater.",
      "Day 8 — Bread on the table even if they do not come.",
      "Day 9 — Erase nothing. Soften what you can. Do not fake a reunion for the feed.",
    ],
  },
  {
    slug: "thanksgiving",
    title: "Novena of Thanksgiving & Fulfilled Promises (Ex-Voto)",
    body: "Prayed in quiet celebration after a grave petition has been granted or a perilous trial has been peacefully navigated.",
    offer: "Red and golden apples, polished coins offered to charity, fragrant copal incense.",
    kind: "gratitude",
    kindLabel: "Gratitude & Vows",
    duration: "9 Days",
    pace: "Cycle starts: Any time",
    cta: "Begin Novena",
    days: [
      "Day 1 — Name what already arrived, specifically.",
      "Day 2 — Who else was in the room when it happened.",
      "Day 3 — The promise you made. Keep a piece of it today.",
      "Day 4 — Money or bread given away without a caption.",
      "Day 5 — Do not spend the gift as if it were nothing.",
      "Day 6 — The people still waiting. Do not mock them.",
      "Day 7 — Smoke, if the house allows it.",
      "Day 8 — Public thanks if it will not endanger anyone.",
      "Day 9 — Close without slamming the door.",
    ],
  },
  {
    slug: "perpetual",
    title: "The Perpetual Novena to Niña Blanca",
    body: "An ongoing rhythmic cycle observed internationally starting the 1st of every month without interruption.",
    offer: "Daily lit 7-day glass votive, fresh water, perpetual intention book inscribed with names.",
    kind: "protection",
    kindLabel: "Protection & Devotion",
    duration: "Perpetual",
    pace: "Starts 1st of each month",
    cta: "Join Perpetual",
    days: [
      "This is not nine unique plots. It is a habit: water, names, a candle if fire is safe.",
      "Day 1 of the month — Open the book. Add no harm.",
      "Mid-month — Cross out nothing living out of spite.",
      "Last days — If you missed a week, begin again. She is not a parking meter.",
      "Keep the current community cycle on the Novenas page as well.",
    ],
  },
  {
    slug: "seven-powers",
    title: "Novena of Las Siete Potencias — The Seven Powers Cloak",
    body: "When an individual faces complex, multi-layered crises—such as simultaneous job loss, bitter legal trials, failing health, and marriage collapse—Las Siete Potencias unites all color frequencies into one harmonious garment. It aligns the totality of existence back into sacred equilibrium.",
    offer: "Seven-day striped paraffin candles, multi-colored ribbon braids, a full floral bouquet with seven different blossoms, fresh bread, and seven clean coins.",
    kind: "protection",
    kindLabel: "The Rainbow Mantle",
    duration: "7 Days",
    pace: "Major life passages",
    cta: "Begin Novena",
    days: [
      "Day 1 — La Blanca. Purification, peace of the house, clear water.",
      "Day 2 — La Negra. Defense, severance of malice, a black votive if you keep one.",
      "Day 3 — La Roja. Family concord, mended speech, no binding of another’s will.",
      "Day 4 — La Dorada. Honest work, bread, coins that circulate.",
      "Day 5 — La Verde. Legal fairness, contracts, truth before a judge.",
      "Day 6 — La Azul. Study, cool speech, a still mind.",
      "Day 7 — La Morada and the united cloak. Healing of body and the whole knot of the week. Offer seven blossoms and seven clean coins.",
    ],
  },
];

export function getArchiveNovena(slug: string): ArchiveNovena | undefined {
  return ARCHIVE_NOVENAS.find((item) => item.slug === slug);
}
