---
name: nina-blanca-research
description: >-
  Research Santa Muerte topics for Niña Blanca Journal articles. Use when the
  user asks to research, pick a journal topic, or run call_nb_research.py.
---

# Niña Blanca research

Ground the article in retrieved sources (Exa; Tavily only when a date or current fact must be checked). Do not use model memory for history, statistics, or quotes.

## In scope

Santa Muerte and devotion: white and other aspects, altar care, offerings, novenas, petitions, folk history, ethics, seasons, names (Santa Muerte, La Flaquita, La Niña Blanca).

## Out of scope

How to harm, bind, or hex; crime tourism; “this week’s” horoscope framing.

## Topic selection

When no topic is given (`research for NB` with nothing after the colon), the topic comes from
`Nina_Blanca/ninablanca-content-topics.md` — a 120-item curated bank, consumed in order and
tracked in `Research Skill/nb-topic-bank-progress.json` so no topic repeats. Only once that bank
is exhausted does it fall back to an LLM guess, which is shown the last 15 topics from
`nb-journal-history.json` and told explicitly to avoid repeating them. (Before this existed, the
LLM picker had no memory of past topics and drifted into writing the same "build a white altar"
piece six times in a row — see `nb-journal-history.json`.)

## Output

JSON with `project: NB`, topic, taxonomy category, working title, focus keyword, search intent, angle, H2 list that matches [nina-blanca-structure](../nina-blanca-structure/SKILL.md), source list, and raw Exa/Tavily payloads.

Dedup against `content/journal/*.md` and `Research Skill/nb-journal-history.json`. Skip clones of `/who-is-santa-muerte` as a full article.

Command:

```bash
python3 "Research Skill/call_nb_research.py" "research for NB"
python3 "Research Skill/call_nb_research.py" "research for NB: white water on the altar"
```
