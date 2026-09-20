import type { MetadataRoute } from "next";
import { listJournalPosts } from "@/lib/journal";
import { ARCHIVE_NOVENAS } from "@/lib/novena-archive";
import { ORATIONS } from "@/lib/orations";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "/",
  "/petitions",
  "/novenas",
  "/prayers",
  "/colors-and-aspects",
  "/journal",
  "/learn",
  "/support",
  "/who-is-santa-muerte",
  "/traditional-offerings",
  "/altar-care",
  "/vigil-candles",
  "/community-guidelines",
  "/privacy-and-anonymity",
  "/ethics-and-safety",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: path === "/" || path === "/journal" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.7,
  }));

  const journal = listJournalPosts().map((post) => ({
    url: new URL(`/journal/${post.slug}`, SITE_URL).toString(),
    lastModified: post.date || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const prayers = ORATIONS.map((item) => ({
    url: new URL(`/prayers/${item.slug}`, SITE_URL).toString(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const novenas = ARCHIVE_NOVENAS.map((item) => ({
    url: new URL(`/novenas/${item.slug}`, SITE_URL).toString(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...journal, ...prayers, ...novenas];
}
