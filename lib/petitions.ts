import { ensureSchema, getSql } from "./db";
import type { PetitionCategoryId } from "./nav";

export type PetitionPrivacy = "public" | "anonymous" | "silent";

export type Petition = {
  id: string;
  title: string;
  body: string;
  category: string;
  displayName: string;
  privacy: PetitionPrivacy;
  vigilCount: number;
  candle: boolean;
  createdAt: string;
  when?: string;
  candleLabel?: string;
  answered?: boolean;
  example?: boolean;
};

type PetitionRow = {
  id: string;
  title: string;
  body: string;
  category: string;
  display_name: string | null;
  privacy: string;
  vigil_count: number;
  candle: boolean;
  created_at: string | Date;
};

function mapRow(row: PetitionRow): Petition {
  const privacy = (row.privacy as PetitionPrivacy) || "public";
  const displayName =
    privacy === "anonymous" || privacy === "silent"
      ? "A devotee in prayer"
      : row.display_name?.trim() || "A devotee in prayer";
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    category: row.category,
    displayName,
    privacy,
    vigilCount: row.vigil_count,
    candle: row.candle,
    createdAt: String(row.created_at),
    when: relativeTime(row.created_at),
    candleLabel: row.candle ? "Vigil candle lit" : undefined,
    answered: row.category === "gratitude",
  };
}

function relativeTime(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function isUuid(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

const SEED: Array<{
  title: string;
  body: string;
  category: PetitionCategoryId;
  display_name: string;
  privacy: PetitionPrivacy;
  vigil_count: number;
  when: string;
  candle: boolean;
  candleLabel?: string;
  answered?: boolean;
}> = [
  {
    title: "Solace for Mateo's Lungs",
    body: "Dearest Niña Blanca, tender Mother of mercy, I place my little brother Mateo beneath the pure fold of your mantle. Calm his breathing, clear the fluid in his chest, and grant steady hands to the pulmonology doctors at the clinic tomorrow morning. We light our white wax in humble faith.",
    category: "healing",
    display_name: "Lucia G. · Monterrey",
    privacy: "public",
    vigil_count: 54,
    when: "2 hours ago",
    candle: true,
    candleLabel: "7-Day Altar Candle",
  },
  {
    title: "Softening Hardened Words",
    body: "Blessed White Lady, silence the anger that has entered between my father and my eldest son. Take away the bitter remembrance of past arguments. Cleanse our living room of heavy spirits with sweet copal and white carnations, so they may sit at table together once more.",
    category: "home",
    display_name: "A Devotee in Prayer",
    privacy: "anonymous",
    vigil_count: 38,
    when: "4 hours ago",
    candle: false,
  },
  {
    title: "Gratitude for the Clear Scan",
    body: "Promised offering rendered in quiet joy. Six months ago I knelt before your image trembling with terror. Today the biopsy reports returned clear of malignancy. Thank you, Santísima Muerte Blanca, for wrapping your cool pale veil over my body and restoring my tomorrows.",
    category: "gratitude",
    display_name: "Rafael & Sofia · Puebla",
    privacy: "public",
    vigil_count: 112,
    when: "6 hours ago",
    candle: false,
    candleLabel: "Ex-Voto Offered",
    answered: true,
  },
  {
    title: "Guidance Along the Northern Desert",
    body: "Mother of travelers and guardian of those who walk through dry wilderness in search of food for their children: keep Christian safe from dehydration, deceitful coyotes, and aggressive patrols. Shield him with daylight mist until he reaches safe water and family.",
    category: "passage",
    display_name: "Rosa M. · Michoacán",
    privacy: "public",
    vigil_count: 96,
    when: "8 hours ago",
    candle: true,
    candleLabel: "Vigil Candle Lit",
  },
  {
    title: "Quieting the Night Tremors",
    body: "It has been forty days since Teresa departed this earth. The silence in the hallway feels unbearable. Madrecita, come hold my trembling thoughts between your palms at 3 a.m. Remind my soul that Teresa rests unburdened within your tranquil bone-white sanctuary.",
    category: "peace",
    display_name: "J. D. · Chicago, IL",
    privacy: "public",
    vigil_count: 73,
    when: "12 hours ago",
    candle: false,
    candleLabel: "Perpetual Remembrance",
  },
  {
    title: "Breaking Envy & Gossip",
    body: "Holy Niña of the Pure Aspect, wash away slander and jealous glances cast toward our small workshop bakery. Let clean water poured at your altar neutralize malicious tongues. We ask only to labor with clean hands and peaceful sleep.",
    category: "home",
    display_name: "Familia Alvarez · Veracruz",
    privacy: "public",
    vigil_count: 61,
    when: "Yesterday",
    candle: true,
    candleLabel: "Altar Lamp",
  },
];

export function sampleWallPetitions(): Petition[] {
  return SEED.map((item, index) => ({
    id: `sample-${index}`,
    title: item.title,
    body: item.body,
    category: item.category,
    displayName:
      item.privacy === "anonymous" || item.privacy === "silent"
        ? "A devotee in prayer"
        : item.display_name,
    privacy: item.privacy,
    vigilCount: item.vigil_count,
    candle: item.candle,
    createdAt: "",
    when: item.when,
    candleLabel: item.candleLabel,
    answered: item.answered,
    example: true,
  }));
}

export async function listPetitions(category?: string): Promise<Petition[]> {
  const sql = getSql();
  const rows = category && category !== "all"
    ? ((await sql`
        SELECT id, title, body, category, display_name, privacy, vigil_count, candle, created_at
        FROM petitions
        WHERE hidden = false AND privacy != 'silent' AND category = ${category}
        ORDER BY created_at DESC
        LIMIT 50
      `) as PetitionRow[])
    : ((await sql`
        SELECT id, title, body, category, display_name, privacy, vigil_count, candle, created_at
        FROM petitions
        WHERE hidden = false AND privacy != 'silent'
        ORDER BY created_at DESC
        LIMIT 50
      `) as PetitionRow[]);

  return rows.map(mapRow);
}

export async function countVisiblePetitions(): Promise<number> {
  const sql = getSql();
  const rows = await sql`
    SELECT COUNT(*)::int AS n FROM petitions WHERE hidden = false AND privacy != 'silent'
  `;
  return (rows[0] as { n: number }).n;
}

export async function createPetition(input: {
  title: string;
  body: string;
  category: string;
  displayName?: string;
  privacy: PetitionPrivacy;
  candle: boolean;
}) {
  await ensureSchema();
  const sql = getSql();
  const title = input.title.trim().slice(0, 140);
  const body = input.body.trim().slice(0, 2000);
  if (title.length < 3 || body.length < 8) {
    throw new Error("Write a short title and the words of the petition.");
  }
  const name =
    input.privacy === "public" ? input.displayName?.trim().slice(0, 80) || null : null;
  await sql`
    INSERT INTO petitions (title, body, category, display_name, privacy, candle, vigil_count)
    VALUES (${title}, ${body}, ${input.category}, ${name}, ${input.privacy}, ${input.candle}, 1)
  `;
  if (input.candle) {
    await sql`
      UPDATE sanctuary_counters SET value = value + 1 WHERE key = 'silent_candles'
    `;
  }
}

export async function joinVigil(id: string) {
  if (!isUuid(id)) return;
  await ensureSchema();
  const sql = getSql();
  await sql`
    UPDATE petitions SET vigil_count = vigil_count + 1 WHERE id = ${id}::uuid AND hidden = false
  `;
}

export async function bumpCounter(key: "silent_candles" | "novena_vigil" | "black_votive") {
  await ensureSchema();
  const sql = getSql();
  await sql`UPDATE sanctuary_counters SET value = value + 1 WHERE key = ${key}`;
}

export async function getCounter(key: "silent_candles" | "novena_vigil" | "black_votive") {
  const sql = getSql();
  const rows = await sql`SELECT value FROM sanctuary_counters WHERE key = ${key}`;
  return (rows[0] as { value: number } | undefined)?.value ?? 0;
}
