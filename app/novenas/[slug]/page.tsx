import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARCHIVE_NOVENAS, getArchiveNovena } from "@/lib/novena-archive";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ARCHIVE_NOVENAS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getArchiveNovena(slug);
  if (!item) return { title: "Novena" };
  return buildPageMetadata({
    title: item.title,
    description: item.body,
    path: `/novenas/${item.slug}`,
  });
}

export default async function ArchiveNovenaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getArchiveNovena(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-[760px] px-5 py-12 lg:px-0">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
        Archive novena · {item.duration}
      </p>
      <h1 className="font-display mt-2 text-[36px] leading-[44px] lg:text-[44px]">{item.title}</h1>
      <p className="mt-4 text-lg text-on-surface-variant">{item.body}</p>
      <p className="mt-3 text-sm text-primary">{item.offer}</p>
      <ol className="mt-10 space-y-3">
        {item.days.map((day) => (
          <li key={day} className="rounded-lg bg-surface-container p-4 text-sm leading-relaxed text-on-surface-variant gold-stroke">
            {day}
          </li>
        ))}
      </ol>
    </article>
  );
}
