# finbizify-news

Weekday news generator for the public page and the game app.

Short, sourced items about consumer-facing events at large public companies, each tied to one business
concept. Publishes to `news.finbizify.com`.

Decisions of record live in the vault at
`02-product/news-content-daily-posts/2026-08-21-news-feed-decisions.md`.

## The content unit

Three parts. The third is the reason the page exists.

1. **What happened.** Two sentences, every figure traceable to one source.
2. **The concept.** The business idea the event is an instance of, tagged from `content/concepts.md`.
3. **Why it matters.** One line, hedged or asked.

A two-sentence company summary is the most commoditized text on the internet. The concept line is the
original work.

## How it runs

GitHub Actions fires `news-desk.yml` at 7:13am PT on weekdays. It invokes Claude Code, which loads the
`finbizify-news-desk` skill, drafts the day's items, archives each source, and opens a pull request.
A human merges. Nothing publishes without that merge.

| Day | Run type |
|---|---|
| Mon | Work the 14-day tail. Thin by design; one item or none is correct |
| Tue-Thu | Fresh events, 2-3 items |
| Fri | Synthesis of the week. No new items |

Trigger a run by hand from the Actions tab (`workflow_dispatch`), with a mode override for testing.

## Layout

```
.claude/skills/finbizify-news-desk/   the editorial rules; the agent reads these
content/concepts.md                   the twelve concept tags
content/news/                         one markdown file per item
content/weeks/                        Friday synthesis, one per week
sources/                              archived source text; evidence only, excluded from the build
data/                                 company universe
scripts/archive-source.mjs            fetch, extract, hash, request a Wayback capture
```

**One file per item, one page per week.** File structure is not URL structure. The site globs items by
date range into `/news/week-of-<date>`, so the URL count stays at 52 a year while each item remains
independently addressable for the game app and social later.

## Rules that are load-bearing

**One source per item, and a news outlet is never it.** SEC EDGAR where a filing exists, the company's
own newsroom otherwise. Wire coverage may be used to discover a story and is never cited.

**`sources/` is evidence, never content.** Excluded from the build, never rendered, never quoted at
length. Storing a press release as an internal record is fine; republishing one is not.

**No company name in a public URL slug.** Weekly dated slugs handle this structurally. See
`06-compliance/ip-policy.md` in the vault.

**No investment framing.** No buy, no sell, no price targets, no judging a company as an investment.
Share price movement is never the subject of an item.

## Setup

1. Repo secret `ANTHROPIC_API_KEY`, created inside a dedicated Anthropic Console workspace with a hard
   monthly spend cap. Settings → Secrets and variables → Actions → **Secrets** tab.
2. Settings → Actions → Workflow permissions → **Read and write**.
3. Branch protection on `main` requiring a pull request, so approval is enforced rather than habitual.
4. Run the **Verify secrets** workflow from the Actions tab to confirm the key is wired before relying
   on the schedule.

## Known gaps

- `data/universe-curated.csv` is hand-maintained and goes stale as companies are acquired or taken
  private. The skill verifies current listing status before drafting and flags stale rows in the PR.
- `data/universe-sp500.csv`, `-sp400.csv`, and `-nasdaq100.csv` are not yet populated. The curated list
  carries the run until they are.
- Workflow actions are pinned to major version tags rather than commit SHAs. Pin to SHAs before this
  repo goes public.
- No site yet. Rendering is Phase 3.

## Backfill

The week of 2026-08-17 is already in `content/`, written by hand as the design sample and then
converted to the real format. All five items are Tier A: SEC Form 8-K exhibits, archived with SHA-256
and Internet Archive captures, and every figure was verified against the archived text rather than the
live page.

Monday 2026-08-17 produced no items. Two candidates surfaced and both failed the filters: an Alibaba
divestiture (China, excluded) and a chief information officer appointment at a B2B distributor (no
consumer contact). That is a correct outcome, not a gap.

