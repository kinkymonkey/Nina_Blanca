---
name: nina-blanca-journal
description: >-
  Write or rewrite Niña Blanca Journal articles (~1500 words). Use when drafting
  content/journal posts, Santa Muerte blog copy, or running write_nb_journal.py.
---

# Niña Blanca journal writer

1. Read [nina-blanca-structure](../nina-blanca-structure/SKILL.md) and [nina-blanca-house](../nina-blanca-house/SKILL.md).
2. Read the research JSON. Invent nothing that is not in the sources.
3. First draft: `~/.agents/skills/copywriting/SKILL.md`.
4. Rewrite: `~/.agents/skills/copy-editing/SKILL.md`.
5. Anti-slop (Rossman) + Humanizer. **Human score ≥ 70** or do not save for Approve.
6. Keep **1400–1650** words. Do not cut to Midnight’s 800-word band.
7. Write `runs/<timestamp>-<slug>/post.md` only. Do **not** copy into `content/journal` until HQ Approve and the 7pm publish job.

Niña Blanca has **no social accounts and no Buffer**. Do not write Instagram captions or schedule Buffer.

Command:

```bash
python3 "Skills/Blog Skill/write_nb_journal.py"
python3 "Skills/Blog Skill/write_nb_journal.py" "Research Skill/deep_research/NB_....json"
```
