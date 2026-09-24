import Link from "next/link";
import { Glyph } from "@/components/glyph";
import { listJournalPosts } from "@/lib/journal";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Full Journal Directory",
  description: "Every Sanctuary Journal entry, title, date, and cover, in one list.",
  path: "/journal/archive",
});
export const dynamic = "force-dynamic";

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function JournalArchivePage() {
  const posts = listJournalPosts();

  return (
    <div className="relative w-full overflow-hidden bg-surface pb-16">
      <div className="mx-auto max-w-[900px] px-5 pb-16 lg:px-12">
        <header className="flex flex-col items-start gap-3 pt-8 pb-10">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-primary uppercase hover:text-on-surface"
          >
            <Glyph name="arrow_back" size={14} />
            Back to the Journal
          </Link>
          <h1 className="font-display text-[34px] leading-[1.1] tracking-tight text-on-surface md:text-[44px]">
            Full Journal Directory
          </h1>
          <p className="text-on-surface-variant">
            {posts.length} {posts.length === 1 ? "entry" : "entries"}, newest first.
          </p>
        </header>

        <ul className="divide-y divide-surface-high">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/journal/${post.slug}`}
                className="flex items-center gap-4 py-4 hover:bg-surface-container"
              >
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-surface-container">
                  {post.cover ? (
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover object-center" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base leading-6 text-on-surface">{post.title}</p>
                  <p className="text-[11px] tracking-wider text-on-surface-variant uppercase">
                    {post.kicker} • {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
