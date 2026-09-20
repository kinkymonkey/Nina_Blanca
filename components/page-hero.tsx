import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: ReactNode;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-[900px] space-y-4 px-5 pb-10 pt-6 text-center lg:px-12">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">{kicker}</p>
      <h1 className="font-display text-[36px] leading-[1.15] tracking-tight text-on-surface md:text-[48px]">
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">{lede}</p>
    </header>
  );
}
