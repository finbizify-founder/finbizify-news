# finbizify-news

An editorial pipeline that runs Claude Code inside GitHub Actions. Short, sourced news items about
consumer-facing events at large public companies, each tied to one business concept.

This is a FinBizify experiment. FinBizify teaches teenagers how real companies and real money work,
in 15-minute lessons built on companies they already know ([finbizify.com](https://finbizify.com), free
lessons at [learn.finbizify.com](https://learn.finbizify.com)). The items here are meant for
`news.finbizify.com`, which isn't live yet, and for the app later.

## Where it stands (September 2026)

- 11 items and 1 weekly synthesis in `content/`, covering the weeks of 2026-08-17 and 2026-08-24.
- Two workflow runs opened pull requests (#1 and #2). Both were reviewed and merged by hand.
- The schedule is paused. GitHub's cron fired hours off its configured time, which collided with manual
  runs and burned credit on drafts nobody reviewed. Runs are manual until that's sorted.
- No site yet. Rendering is Phase 3.

Design decisions live in an internal vault. The rules that matter are repeated below.

## The content unit

Three parts. The third is the reason the page exists.

1. **What happened.** Two sentences, every figure traceable to one source.
2. **The concept.** The business idea the event is an instance of, tagged from `content/concepts.md`.
3. **Why it matters.** One line, hedged or asked.

A two-sentence company summary is the most commoditized text on the internet. The concept line is the
original work.

## How it runs

`news-desk.yml` invokes Claude Code, which loads the `finbizify-news-desk` skill, drafts the day's
items, archives each source, and opens a pull request. A human merges. Nothing publishes without that
merge.

The workflow was built to fire at 7:13am PT on weekdays. That trigger is commented out since
2026-09-02 (see the note in the workflow file); every run is started by hand for now.

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

**No company name in a public URL slug.** Weekly dated slugs handle this structurally. A company name
identifies the subject of an item and never names a page, feature, or product.

Company names are used for identification and educational discussion only. FinBizify is independent
and is not affiliated with, sponsored by, or endorsed by any company referenced.

**No investment framing.** No buy, no sell, no price targets, no judging a company as an investment.
Share price movement is never the subject of an item.

## Setup

1. Repo secret `NEWS_GENERATOR` (mapped to the `ANTHROPIC_API_KEY` env var in the workflows), created inside a dedicated Anthropic Console workspace with a hard
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
- No site yet. Rendering is Phase 3.

## Backfill

The week of 2026-08-17 is already in `content/`, written by hand as the design sample and then
converted to the real format. All five items are Tier A: SEC Form 8-K exhibits, archived with SHA-256
and Internet Archive captures, and every figure was verified against the archived text rather than the
live page.

Monday 2026-08-17 produced no items. Two candidates surfaced and both failed the filters: an Alibaba
divestiture (China, excluded) and a chief information officer appointment at a B2B distributor (no
consumer contact). That is a correct outcome, not a gap.

