# How to add a Journal post

This is the blog. There is no WordPress and no social posting.

Agents: follow `.cursor/skills/nina-blanca-structure/SKILL.md` (word count, SEO, FAQ, anti-slop score 70+). Do not copy a draft here until HQ Approve and the Mon/Wed/Fri 7pm Manila publish job.

## New article

1. Copy any file in this folder except this README.
2. Rename it. The filename should match `slug` (example: `the-pure-shroud.md`).
3. Fill in the header between the `---` lines.
4. Write the body. Blank line between paragraphs. Headings start with `## `.
5. Ask an agent to deploy, or save and refresh locally.

## Header fields

- `title` — headline on the page
- `slug` — URL: `/journal/the-pure-shroud`
- `date` — `2026-09-19`
- `kicker` — small label above the title
- `summary` — short line on the Journal list
- `seoTitle` — Google title (optional)
- `description` — Google snippet (optional)
- `cover` — card/share image, example `/journal/white-roses.jpg`
- `featured` — `true` on at most one post

## Images

1. Put the file in `public/journal/` (keep it under about 400KB).
2. In the post: `![White roses on the altar](/journal/white-roses.jpg)`
3. Set `cover: /journal/white-roses.jpg` if it should show on the list and when shared.

Do not put journal posts in other Majestic HQ projects.
