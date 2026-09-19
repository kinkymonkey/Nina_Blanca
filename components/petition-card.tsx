import { petitionCategories } from "@/lib/nav";

export function PetitionCard({
  petition,
  joinAction,
}: {
  petition: {
    id: string;
    title: string;
    body: string;
    category: string;
    displayName: string;
    vigilCount: number;
  };
  joinAction: (formData: FormData) => Promise<void>;
}) {
  const category =
    petitionCategories.find((item) => item.id === petition.category)?.label ??
    petition.category;

  return (
    <article className="flex flex-col justify-between space-y-4 rounded-lg bg-surface-container p-6 gold-stroke">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase">
          <span className="text-primary">{category}</span>
          <span className="text-on-surface-variant/80">{petition.displayName}</span>
        </div>
        <h3 className="font-display text-[22px] leading-7 text-on-surface">
          “{petition.title}”
        </h3>
        <p className="text-sm italic leading-relaxed text-on-surface-variant">
          “{petition.body}”
        </p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <form action={joinAction}>
          <input type="hidden" name="id" value={petition.id} />
          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-surface-high px-3 py-1.5 text-[12px] font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-highest"
          >
            Join Vigil
          </button>
        </form>
        <span className="text-[12px] text-on-surface-variant">
          <strong className="text-on-surface">{petition.vigilCount}</strong> joined
        </span>
      </div>
    </article>
  );
}
