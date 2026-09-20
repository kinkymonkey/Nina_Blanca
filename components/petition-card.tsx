import Link from "next/link";
import { CopyShareButton } from "@/components/copy-share";
import { Glyph } from "@/components/glyph";
import { petitionCategories } from "@/lib/nav";

const SHORT: Record<string, string> = {
  healing: "Health & Healing",
  home: "Family Peace",
  peace: "Peace in Grief",
  reconciliation: "Reconciliation",
  passage: "Safe Passage",
  gratitude: "Answered Grace",
};

export function PetitionCard({
  petition,
  joinAction,
  joinHref,
  vigilIcon = "mode_heat",
}: {
  petition: {
    id: string;
    title: string;
    body: string;
    category: string;
    displayName: string;
    vigilCount: number;
    candle?: boolean;
    candleLabel?: string;
    when?: string;
    answered?: boolean;
    example?: boolean;
  };
  joinAction?: (formData: FormData) => Promise<void>;
  joinHref?: string;
  vigilIcon?: string;
}) {
  const category =
    SHORT[petition.category] ||
    petitionCategories.find((item) => item.id === petition.category)?.label ||
    petition.category;

  return (
    <article className="flex h-full flex-col justify-between rounded-md bg-surface-container p-6 shadow-md transition-shadow hover:shadow-[0_0_24px_rgba(235,192,117,0.12)]">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface-lowest px-2 py-0.5 text-[10px] font-semibold tracking-widest text-primary uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {petition.answered ? "Answered Grace" : category}
          </span>
          <span className="text-[11px] text-on-surface-variant/70">{petition.when || ""}</span>
        </div>
        <div>
          <h3 className="font-display text-[22px] leading-7 text-on-surface">{petition.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-on-surface-variant">&ldquo;{petition.body}&rdquo;</p>
        </div>
      </div>
      <div className="-mx-6 -mb-6 mt-6 space-y-3 rounded-b-md bg-surface-low/40 p-4">
        <div className="flex items-center justify-between gap-2 text-[11px] text-on-surface-variant">
          <span className="inline-flex items-center gap-1 text-on-surface">
            <Glyph name={petition.displayName.toLowerCase().includes("devotee") ? "person_outline" : "person_pin"} size={16} />
            {petition.displayName}
          </span>
          {petition.candle || petition.candleLabel ? (
            <span className="font-semibold text-primary">{petition.candleLabel || "Vigil candle lit"}</span>
          ) : petition.example ? (
            <span>Example of tone</span>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          {joinHref ? (
            <Link
              href={joinHref}
              className="inline-flex items-center gap-1 rounded-sm bg-surface-lowest px-2 py-1 text-[12px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-primary"
            >
              <Glyph name={vigilIcon} filled size={16} />
              Join vigil ({petition.vigilCount})
            </Link>
          ) : (
            <form action={joinAction}>
              <input type="hidden" name="id" value={petition.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-sm bg-surface-lowest px-2 py-1 text-[12px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-primary"
              >
                <Glyph name={vigilIcon} filled size={16} />
                Join vigil (<strong className="text-primary">{petition.vigilCount}</strong>)
              </button>
            </form>
          )}
          <CopyShareButton title={petition.title} />
        </div>
      </div>
    </article>
  );
}
