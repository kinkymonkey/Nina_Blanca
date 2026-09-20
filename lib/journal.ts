import fs from "fs";
import path from "path";

export type JournalTopic = "theology" | "altar" | "history" | "testimony" | "seasons" | "liturgy" | "ethics";

export type JournalFaq = { question: string; answer: string };

export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  kicker: string;
  summary: string;
  cover?: string;
  seoTitle?: string;
  description?: string;
  featured?: boolean;
  topic: JournalTopic;
  minutes: string;
  tags: string[];
  focusKeyword?: string;
  secondaryKeywords: string[];
  status: "draft" | "scheduled" | "published";
  publishAt?: string;
  body: string;
  faqs: JournalFaq[];
};

const DIR = path.join(process.cwd(), "content/journal");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  if (!raw.startsWith("---\n") && !raw.startsWith("---\r\n")) {
    return { data: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const block = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).replace(/^\s+/, "");
  const data: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body };
}

function parseFaqs(body: string): JournalFaq[] {
  const faqs: JournalFaq[] = [];
  const lines = body.split("\n");
  let inFaq = false;
  let question = "";
  let answer: string[] = [];
  const flush = () => {
    const q = question.trim();
    const a = answer.join("\n").trim();
    if (q && a) faqs.push({ question: q, answer: a });
    question = "";
    answer = [];
  };
  for (const line of lines) {
    if (/^##\s+(questions people actually ask|faq)\b/i.test(line)) {
      inFaq = true;
      continue;
    }
    if (inFaq && /^##\s+/.test(line)) {
      flush();
      break;
    }
    if (!inFaq) continue;
    if (/^###\s+/.test(line)) {
      flush();
      question = line.replace(/^###\s+/, "");
      continue;
    }
    if (question) answer.push(line);
  }
  flush();
  return faqs;
}

function isLive(data: Record<string, string>): boolean {
  const status = (data.status || "published").toLowerCase();
  if (status === "draft") return false;
  if (status === "scheduled") {
    const at = data.publishAt || data.publish_at;
    if (!at) return false;
    const stamp = Date.parse(at);
    return !Number.isNaN(stamp) && stamp <= Date.now();
  }
  return true;
}

function toPost(filename: string, raw: string): JournalPost | null {
  const { data, body } = parseFrontmatter(raw);
  if (!isLive(data)) return null;
  const slug = data.slug || filename.replace(/\.md$/, "");
  const secondary = data.secondaryKeywords || data.secondary_keywords || "";
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    kicker: data.kicker || "Journal",
    summary: data.summary || "",
    cover: data.cover || undefined,
    seoTitle: data.seoTitle || data.seo_title || undefined,
    description: data.description || data.summary || undefined,
    featured: data.featured === "true",
    topic: (data.topic as JournalTopic) || "theology",
    minutes: data.minutes || "",
    tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    focusKeyword: data.focusKeyword || data.focus_keyword || undefined,
    secondaryKeywords: secondary
      ? secondary.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    status: ((data.status || "published") as JournalPost["status"]) || "published",
    publishAt: data.publishAt || data.publish_at || undefined,
    body,
    faqs: parseFaqs(body),
  };
}

export function listJournalPosts(): JournalPost[] {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((name) => name.endsWith(".md") && name !== "README.md");
  return files
    .map((name) => toPost(name, fs.readFileSync(path.join(DIR, name), "utf8")))
    .filter((post): post is JournalPost => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getJournalPost(slug: string): JournalPost | null {
  return listJournalPosts().find((post) => post.slug === slug) ?? null;
}

export function getFeaturedPost(): JournalPost | null {
  const posts = listJournalPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}
