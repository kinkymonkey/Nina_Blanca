import type { Metadata } from "next";
import { DEFAULT_OG, SITE_NAME, SITE_URL } from "@/lib/site";

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const ogImage = image || DEFAULT_OG;
  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type,
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      url: path ? new URL(path, SITE_URL).toString() : undefined,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
