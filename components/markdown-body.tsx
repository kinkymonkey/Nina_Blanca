import type { ReactNode } from "react";
import Link from "next/link";

export function MarkdownBody({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);
  return (
    <div className="space-y-5 text-base leading-7 text-on-surface-variant">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (img) {
          return (
            <img
              key={i}
              src={img[2]}
              alt={img[1]}
              className="w-full rounded-lg gold-stroke"
            />
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="font-display pt-4 text-[26px] leading-8 text-on-surface">
              {trimmed.slice(3)}
            </h2>
          );
        }
        return <p key={i}>{formatInline(trimmed)}</p>;
      })}
    </div>
  );
}

function formatInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) {
      nodes.push(<span key={key++}>{text.slice(last, match.index)}</span>);
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-medium text-on-surface">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        nodes.push(
          <Link key={key++} href={link[2]} className="text-primary hover:text-primary-container">
            {link[1]}
          </Link>,
        );
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) {
    nodes.push(<span key={key++}>{text.slice(last)}</span>);
  }
  return nodes;
}
