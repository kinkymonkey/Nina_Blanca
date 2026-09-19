import type { Metadata } from "next";
import Link from "next/link";

export function ContentPage({
  title,
  kicker,
  lede,
  children,
}: {
  title: string;
  kicker: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[760px] px-5 py-12 lg:px-0">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">{kicker}</p>
      <h1 className="font-display mt-2 text-[38px] leading-[44px] tracking-tight lg:text-[48px] lg:leading-[56px]">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-7 text-on-surface-variant">{lede}</p>
      <div className="mt-10 space-y-5 text-base leading-7 text-on-surface-variant [&_h2]:font-display [&_h2]:pt-4 [&_h2]:text-[26px] [&_h2]:leading-8 [&_h2]:text-on-surface [&_p]:leading-7">
        {children}
      </div>
      <p className="mt-12 text-sm">
        <Link href="/" className="text-primary hover:text-primary-container">
          Return to the sanctuary
        </Link>
      </p>
    </article>
  );
}

export function pageMeta(title: string, description: string): Metadata {
  return { title, description };
}
