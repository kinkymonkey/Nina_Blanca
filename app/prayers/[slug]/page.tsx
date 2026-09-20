import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOration, ORATIONS } from "@/lib/orations";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ORATIONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getOration(slug);
  if (!item) return { title: "Prayer" };
  return buildPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/prayers/${item.slug}`,
  });
}

export default async function OrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getOration(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-[760px] px-5 py-12 lg:px-0">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">{item.when}</p>
      <h1 className="font-display mt-2 text-[36px] leading-[44px] tracking-tight lg:text-[44px]">
        {item.title}
      </h1>
      <p className="mt-4 text-lg text-on-surface-variant">{item.summary}</p>
      <div className="mt-10 space-y-5">
        {item.lines.map((line) => (
          <p key={line.slice(0, 40)} className="font-display text-[20px] leading-8 text-on-surface">
            {line}
          </p>
        ))}
      </div>
      <p className="mt-12 text-sm">
        <Link href="/prayers" className="text-primary hover:text-primary-container">
          Back to the prayer library
        </Link>
      </p>
    </article>
  );
}
