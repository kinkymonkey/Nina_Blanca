import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { MarkdownBody } from "@/components/markdown-body";
import { getJournalPost, listJournalPosts } from "@/lib/journal";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return listJournalPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Journal" };
  const title = post.seoTitle || post.title;
  const description = post.description || post.summary;
  const keywords = [post.focusKeyword, ...post.secondaryKeywords, ...post.tags].filter(Boolean) as string[];
  return {
    ...buildPageMetadata({
      title,
      description,
      path: `/journal/${post.slug}`,
      image: post.cover,
      type: "article",
    }),
    keywords: keywords.length ? keywords : undefined,
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();
  const url = new URL(`/journal/${post.slug}`, SITE_URL).toString();
  const image = post.cover ? new URL(post.cover, SITE_URL).toString() : undefined;
  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || post.summary,
      datePublished: post.date || undefined,
      image,
      keywords: [post.focusKeyword, ...post.secondaryKeywords].filter(Boolean).join(", ") || undefined,
      articleSection: post.kicker,
      wordCount: post.body.split(/\s+/).filter(Boolean).length,
      inLanguage: "en-US",
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Journal", item: new URL("/journal", SITE_URL).toString() },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <article className="mx-auto max-w-[760px] px-5 py-12 lg:px-0">
      <JsonLd data={schema} />
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
        {post.kicker}
      </p>
      <p className="mt-2 text-sm text-on-surface-variant">{post.date}</p>
      <h1 className="font-display mt-2 text-[38px] leading-[44px] tracking-tight lg:text-[48px] lg:leading-[56px]">
        {post.title}
      </h1>
      {post.cover ? (
        <img
          src={post.cover}
          alt={post.focusKeyword ? `${post.focusKeyword} — ${post.title}` : post.title}
          className="mt-8 w-full rounded-lg gold-stroke"
        />
      ) : null}
      <div className="mt-10">
        <MarkdownBody source={post.body} />
      </div>
      <p className="mt-12 text-sm">
        <Link href="/journal" className="text-primary hover:text-primary-container">
          Back to the Journal
        </Link>
      </p>
    </article>
  );
}
