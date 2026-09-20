import Link from "next/link";
import { getNovena } from "@/lib/novena";

export function NovenaRibbon() {
  const novena = getNovena();
  return (
    <Link
      href="/novenas"
      className="flex items-center justify-center gap-2 border-b border-[#b08a45]/15 bg-surface-lowest px-5 py-2 text-center font-sans text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase hover:text-primary"
    >
      <span className="inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
      <span className="line-clamp-2 sm:line-clamp-1">
        Current Community Novena: {novena.title} (Day {novena.day} of {novena.total}) — Join in prayer
      </span>
    </Link>
  );
}
