"use server";

import { revalidatePath } from "next/cache";
import {
  bumpCounter,
  createPetition,
  joinVigil,
  type PetitionPrivacy,
} from "@/lib/petitions";

export async function submitPetitionAction(formData: FormData) {
  const title = String(formData.get("title") || "");
  const body = String(formData.get("body") || "");
  const category = String(formData.get("category") || "peace");
  const displayName = String(formData.get("displayName") || "");
  const privacy = (String(formData.get("privacy") || "anonymous") as PetitionPrivacy);
  const candle = formData.get("candle") === "on";
  await createPetition({ title, body, category, displayName, privacy, candle });
  revalidatePath("/");
  revalidatePath("/petitions");
}

export async function joinVigilAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await joinVigil(id);
  revalidatePath("/");
  revalidatePath("/petitions");
}

export async function offerSilentCandleAction() {
  await bumpCounter("silent_candles");
  revalidatePath("/");
  revalidatePath("/novenas");
  revalidatePath("/vigil-candles");
}

export async function joinNovenaVigilAction() {
  await bumpCounter("novena_vigil");
  revalidatePath("/");
  revalidatePath("/novenas");
}
