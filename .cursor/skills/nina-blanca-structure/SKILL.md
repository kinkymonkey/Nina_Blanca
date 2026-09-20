---
name: nina-blanca-structure
description: >-
  Required article structure for Niña Blanca Journal posts. Use whenever writing,
  rewriting, or reviewing a journal article, Santa Muerte blog post, or
  content/journal markdown for ninablanca.com.
---

# Niña Blanca article structure

Every Journal piece is one teaching. Not a roundup of the whole religion. Target **1500 words** (1400–1650 after anti-slop).

Read [nina-blanca-house](../nina-blanca-house/SKILL.md) before drafting.

## Required skeleton

Use this order. Headings below are jobs, not the exact H2 wording. Write real titles.

1. **Title** — specific, searchable, honest. Include the focus keyword. No clickbait skulls.
2. **Kicker** — three words or so (`Altar Craft`, `Sacred Theology`, `Ethics`).
3. **Opening (no H2)** — 1–3 short paragraphs. First sentence is a scene or a fact, not a thesis statement. First **100 words** must contain the focus keyword and must **answer the searcher’s question**.
4. `<!-- ASSET: hero -->` on its own line after the opening. One hero only.
5. **H2: What this is** — name the practice, color, or teaching in plain speech.
6. **H2: What this is not** — cut crime tourism, Vatican rank, paid hexes, “she will ruin you.”
7. **H2–H4 body sections (3 to 5 more)** — one idea each. Lead with the point. Mix: history if sourced, how a table is kept, what a devotee actually does, limits of this house.
8. **H2: Limits** — doctor, lawyer, locked door, fire safety, consent. Do not skip.
9. **H2: Questions people actually ask** — 3 to 5 `###` questions. Short answers. These become FAQ schema.
10. **Close (no “In conclusion”)** — last useful act: water, a page on this site, a petition without naming harm. Then stop.

## Frontmatter (exact keys)

```yaml
---
title: "..."
slug: hyphen-slug-with-keyword
date: 2026-09-20
kicker: Altar Craft
summary: One sentence for the Journal list.
seoTitle: under 60 characters, keyword near the start
description: under 160 characters, reason to click, includes the keyword
cover: /journal/slug.jpg
featured: false
topic: theology
minutes: 8 min
tags: SantaMuerte, NiñaBlanca, WhiteMantle
focusKeyword: santa muerte white candles
secondaryKeywords: white robe santa muerte, la niña blanca altar
project: NB
kind: blog
status: draft
---
```

`topic` is one of: `theology`, `altar`, `history`, `testimony`, `seasons`, `liturgy`, `ethics`.

`status`: `draft` in the run folder. HQ Approve sets `scheduled`. The 7pm job sets `published`. Existing posts with no `status` stay live.

## SEO and LLM-readable rules

- One **focus keyword**. It appears in: title, seoTitle, slug, description, first 100 words, at least one H2, image alt.
- 2–4 **secondary keywords** used naturally, never stuffed.
- H2s are questions or concrete claims (`How to keep white water`, not `A deeper look`).
- Internal links (plain markdown) to `/who-is-santa-muerte`, `/colors-and-aspects`, `/altar-care`, `/ethics-and-safety`, `/petitions`, `/novenas` when they earn the sentence.
- Do not invent sources. If research did not give a date, skip the date.
- Cover alt describes the **scene** (white roses in a glass, dusk window), never a skull.

The site turns this into Article JSON-LD, FAQPage JSON-LD, breadcrumbs, sitemap, and `llms.txt`. Do not hand-write `<script>` tags in the markdown.

## Voice

Spoken. Contractions. Short then long sentences. One person talking to one person. No em dashes. No “delve,” “leverage,” “tapestry,” “in conclusion.”

## After writing

Run anti-slop + Humanizer. **Human score must be 70 or above.** Below 70 is not saved for Approve.
