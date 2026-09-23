"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  bumpCounter,
  createPetition,
  joinVigil,
  type PetitionPrivacy,
} from "@/lib/petitions";
import { addNewsletterSignup } from "@/lib/newsletter";
import { RateLimitError } from "@/lib/rate-limit";

export async function submitPetitionAction(formData: FormData) {
  const title = String(formData.get("title") || "");
  const body = String(formData.get("body") || "");
  const category = String(formData.get("category") || "peace");
  const displayName = String(formData.get("displayName") || "");
  const privacy = (String(formData.get("privacy") || "anonymous") as PetitionPrivacy);
  const candle = formData.get("candle") === "on";
  try {
    await createPetition({ title, body, category, displayName, privacy, candle });
  } catch (error) {
    if (error instanceof RateLimitError) {
      redirect("/petitions?error=2#offer");
    }
    redirect("/petitions?error=1#offer");
  }
  revalidatePath("/");
  revalidatePath("/petitions");
  redirect("/petitions?received=1#offer");
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
  revalidatePath("/prayers");
  revalidatePath("/journal");
  revalidatePath("/vigil-candles");
}

export async function joinNovenaVigilAction() {
  try {
    await bumpCounter("novena_vigil");
    revalidatePath("/");
    revalidatePath("/novenas");
    return true;
  } catch {
    return false;
  }
}

export async function offerBlackVotiveAction() {
  try {
    await bumpCounter("black_votive");
    revalidatePath("/colors-and-aspects");
    return true;
  } catch {
    return false;
  }
}

export async function subscribeNewsletterAction(email: string) {
  try {
    await addNewsletterSignup(String(email || ""));
    return { ok: true, message: "You are signed up." };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { ok: false, message: error.message };
    }
    if (error instanceof Error && error.message === "Enter a valid email.") {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: "Could not save that email." };
  }
}
