"use client";

import { useState } from "react";

export function JournalDispatchForm() {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-2 pt-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = String(new FormData(form).get("email") || "");
        setBusy(true);
        setNote("");
        try {
          const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const result = (await response.json()) as { ok?: boolean; message?: string };
          setNote(result.message || (response.ok ? "You are signed up." : "Could not save that email."));
          if (result.ok) form.reset();
        } catch {
          setNote("Could not save that email.");
        }
        setBusy(false);
      }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email..."
          className="w-full rounded-sm bg-surface px-4 py-2.5 text-on-surface placeholder:text-outline sm:w-80"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-sm bg-primary px-6 py-2.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase sm:w-auto disabled:opacity-60"
        >
          {busy ? "Saving…" : "Sign up for the newsletter"}
        </button>
      </div>
      {note ? <p className="w-full text-center text-[11px] text-outline">{note}</p> : null}
    </form>
  );
}
