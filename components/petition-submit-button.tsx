"use client";

import { useFormStatus } from "react-dom";
import { Glyph } from "@/components/glyph";

export function PetitionSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="candle-glow inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase disabled:opacity-60"
    >
      <Glyph name="candle" size={16} />
      {pending ? "Placing on altar…" : "Place Intention on Altar"}
    </button>
  );
}
