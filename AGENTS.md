# Working in this repo

## What this is

The content pipeline for `news.finbizify.com`. Short sourced news items for teenagers, each tied to one
business concept. Read `README.md` for the shape and `.claude/skills/finbizify-news-desk/` for the
editorial rules.

## Before writing any item

Load the skill. The four reference files under
`.claude/skills/finbizify-news-desk/references/` are rules, not background:

- `universe.md` — which companies qualify
- `filters.md` — which sectors and events qualify
- `sourcing.md` — the two sourcing tiers and the archive procedure
- `voice.md` — the prose rules, with worked good and bad examples

## The things that will get you in trouble

**Never state a number, date, or fact that is not in the single source cited for that item.** A wrong
figure attributed to a real public company is the largest risk this project carries. Dropping an item
is always allowed. A short day is fine; a wrong day is not.

**A news outlet is never a source.** Use wire coverage to find a story, never to cite one. If a figure
appears in press coverage and not in the company's own filing or release, it does not go in the item.

**Never write into `sources/` by hand and never render it.** It is archived evidence, excluded from the
build. Republishing a company's press release is a copyright problem that citation-and-summary
otherwise avoids.

**"Why it matters" is the dangerous field.** It is the only line that reaches past the source. Every
sentence that has ever had to be cut from this project for overreach was in it. Hedge it or ask it.

## Prose rules

No em dashes. No negative parallelisms ("not X, it's Y" and every variant). No absolute language. No
financial abbreviation without its full term. No numbers in headlines or concept lines. Sentence case
headers. Contractions. Never write down to teens.

Guidance and forecasts are reportable as statements a company made, and never carry the teaching point.

No investment framing anywhere: no buy, no sell, no price targets, no judging a company as an
investment.

Full list with examples in `voice.md`.

## Naming and compliance

`06-compliance/ip-policy.md` in the vault governs. The parts that bite here:

- Word marks only. No logos, no borrowed styling or taglines.
- **No third-party mark in a public URL slug**, feature name, nav element, or metadata. Weekly dated
  slugs handle this structurally, so do not introduce per-company pages.
- No endorsement vocabulary: official, approved, authorized, certified, partnered, aligned.
- Repo filenames may be descriptive. `company` in frontmatter is the authoritative field, and nothing
  downstream should parse a filename to determine which company an item covers.

## Conventions

- One file per item at `content/news/YYYY-MM-DD-<company-slug>-<event-slug>.md`.
- `concept` in frontmatter must be a slug that exists in `content/concepts.md`. Do not invent one.
- Never commit `PR_BODY.md`. It is the agent's run summary, consumed by the workflow and deleted.
- Never commit an API key, token, or `.env`.
