"use client";

import { useState } from "react";
import { Glyph } from "@/components/glyph";

export function CopyShareButton({
  title,
  path,
  label = "Share",
  className = "inline-flex items-center gap-1 rounded-sm p-1 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase hover:text-on-surface",
}: {
  title: string;
  path?: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        const url = path ? `${window.location.origin}${path}` : window.location.href;
        try {
          await navigator.clipboard.writeText(`${title} — ${url}`);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
    >
      <Glyph name="share" size={16} />
      {copied ? "Copied" : label}
    </button>
  );
}
