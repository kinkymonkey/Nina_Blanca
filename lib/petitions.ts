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
  };
}

const SEED: Array<{
  title: string;
  body: string;
  category: PetitionCategoryId;
  display_name: string;
  privacy: PetitionPrivacy;
  vigil_count: number;
}> = [
  {
    title: "For my mother’s healing",
    body: "May her white light bring clarity and a quieter room. We ask for release from fever and pain, and for the people sitting the night shift.",
    category: "healing",
    display_name: "Anonymous",
    privacy: "anonymous",
    vigil_count: 12,
  },
  {
    title: "Gratitude for a peaceful resolution",
    body: "Thank you for lifting the shadow in this house after months of hard talk. The rooms feel like rooms again.",
    category: "gratitude",
    display_name: "M. from Chicago",
    privacy: "public",
    vigil_count: 8,
  },
  {
    title: "Safe passage and shelter",
    body: "Holding a white candle for the road tonight. Let the crossing be ordinary. Let them arrive.",
    category: "passage",
    display_name: "Devotee in Texas",
    privacy: "public",
    vigil_count: 15,
  },
];

export async function listPetitions(category?: string): Promise<Petition[]> {
  await ensureSchema();
  const sql = getSql();
  const count = await sql`SELECT COUNT(*)::int AS n FROM petitions`;
  const n = (count[0] as { n: number }).n;
  if (n === 0) {
    for (const item of SEED) {
      await sql`
        INSERT INTO petitions (title, body, category, display_name, privacy, vigil_count)
        VALUES (${item.title}, ${item.body}, ${item.category}, ${item.display_name}, ${item.privacy}, ${item.vigil_count})
      `;
    }
  }

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
  await ensureSchema();
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
  await ensureSchema();
  const sql = getSql();
  await sql`
    UPDATE petitions SET vigil_count = vigil_count + 1 WHERE id = ${id}::uuid AND hidden = false
  `;
}

export async function bumpCounter(key: "silent_candles" | "novena_vigil") {
  await ensureSchema();
  const sql = getSql();
  await sql`UPDATE sanctuary_counters SET value = value + 1 WHERE key = ${key}`;
}

export async function getCounter(key: "silent_candles" | "novena_vigil") {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT value FROM sanctuary_counters WHERE key = ${key}`;
  return (rows[0] as { value: number } | undefined)?.value ?? 0;
}
