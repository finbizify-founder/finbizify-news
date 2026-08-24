---
name: finbizify-news-desk
description: Draft the day's items for the FinBizify /news feed. Scans business news for consumer-facing events at large public companies, screens them against the sector and event filters, resolves and archives a single primary source per item, and writes each item as a markdown file with full frontmatter. Use for the scheduled weekday run, for a manual catch-up run, or for the Friday synthesis.
---

# FinBizify news desk

You are drafting items for `finbizify.com/news`. Output is a set of markdown files plus archived
source evidence, opened as a pull request for human review. Nothing you write publishes without a
person merging it.

**The one thing that matters most: never state a number, date, or fact that is not in the single
source you cite for that item.** A wrong figure attributed to a real public company is the largest
risk this project carries. When in doubt, drop the item. A short day is fine. A wrong day is not.

## Read these first

Load all four before drafting. They are the rules, not background.

- `references/universe.md` — which companies are in scope
- `references/filters.md` — which sectors and event types qualify
- `references/sourcing.md` — the two sourcing tiers, EDGAR resolution, and the archive procedure
- `references/voice.md` — how the prose works, with worked examples

Also read `content/concepts.md` for the tag list.

## Which run is this

Determine the day of the week in America/Los_Angeles.

| Day | What you do |
|---|---|
| Mon | Work the 14-day tail. Look for anything from the prior two weeks that was not already covered. Expect thin. One item or none is a correct outcome |
| Tue-Thu | Fresh events from the prior 24-48 hours, falling back to 14 days |
| Fri | **Synthesis only. Draft no new items.** See "Friday" below |

Target 2 to 3 items on Tue-Thu. Never more than 4. Never pad to hit a number.

## The pipeline

Run these in order. Do not skip ahead to drafting.

### 1. Scan

Search for recent business news involving companies in the universe. Bias hard toward the prior 24-48
hours. Cast wider than you expect to need, because most candidates will be screened out.

### 2. Filter

Apply `references/filters.md` in this order, discarding at each step:

1. Is the company in the universe? (`references/universe.md`)
2. Is the sector in scope, or does a named scale exception apply?
3. Is the event type Tier 1 or Tier 2? Discard anything on the exclusion list.
4. Was it reported within 14 days? Prefer 24-48 hours.
5. Has this already been covered? Check `content/news/` for the company and event.

**Prefer Tier 1 over Tier 2 even when the Tier 2 story is bigger.** A product launch or a store
closing teaches more to a 16-year-old than another earnings beat.

### 3. Verify the company is currently listed

`data/universe-curated.csv` is hand-maintained and may be stale. Companies get acquired and taken
private. Before drafting, confirm the company is still publicly traded and still files with the SEC.
If it is not, drop the item and note the stale row in the run summary so the CSV can be fixed.

### 4. Resolve the source

One source per item. Follow the tier rules in `references/sourcing.md`. Prefer SEC EDGAR where a
filing exists; fall back to the company's own newsroom. **A news outlet is never the source.**

### 5. Archive the source

Run `scripts/archive-source.mjs` for each item's source URL. It writes the extracted text to
`sources/`, computes the SHA-256, and requests an Internet Archive capture. Capture the values it
returns for the frontmatter. A failed Wayback save is non-blocking; a failed fetch is blocking, so
drop the item.

### 6. Draft

One file per item at `content/news/YYYY-MM-DD-<company-slug>-<short-event-slug>.md`.

Structure, exactly:

```markdown
---
date: 2026-08-18
company: Home Depot
ticker: HD
event_type: earnings
tier: 2
concept: comparable-sales
source_url: https://www.sec.gov/Archives/edgar/data/...
source_type: sec
source_archived: sources/2026-08-18-home-depot-8k.txt
source_fetched_at: 2026-08-18T14:12:00Z
source_http_status: 200
source_sha256: 3f2a...
wayback_url: https://web.archive.org/web/2026...
---

### Home Depot's total sales grew faster than its existing stores

Two sentences. What happened, with the figures, all from the one cited source.

**Concept:** comparable sales

One short paragraph explaining the mechanism. Plain language. This is the part that makes the item
worth publishing.

**Why it matters:** one line, hedged or asked.

> **Review block**
> - Every figure used, listed
> - Source: <type>, <date>, <url>
> - Derived figures: none, or the calculation named explicitly
> - Not used: figures present in the source that you chose to leave out
> - Cut in edit: anything you drafted and removed, with the reason
```

`concept` must be a slug from `content/concepts.md`. Do not invent one.

### 7. Self-check

Before finishing, re-read every drafted item against its archived source file and confirm:

- Every number, date, and name appears in the archived source
- No forward-looking statement carries the concept (guidance is reportable, never the teaching point)
- No absolute language, no negative parallelisms, no em dashes
- No financial abbreviation without its full term
- No number in a headline or in the concept line
- The `concept` slug exists in `content/concepts.md`
- No investment framing anywhere: no buy, sell, price target, or judgment of a company as an
  investment

Fix or drop anything that fails. Dropping is always allowed.

### 8. Slow days

If nothing clears the bar, write nothing to `content/news/` and say so in the PR body:

> Slow news day, nothing major to report.

Then list what surfaced and why each was screened out. **Never stretch for a third-tier story to fill
a slot.** Filler is the failure mode this whole design exists to avoid.

## Friday

Friday writes `content/weeks/YYYY-wNN.md` and adds no new items.

Read every item in `content/news/` dated Monday through Thursday of the current week. Find the pattern
that connects them. Same three-part structure: what the week showed, the concept it is an instance of,
why it matters.

Rules specific to the synthesis:

- **Cite only sources already used that week.** Introduce nothing new.
- **Label any grouping as editorial.** If you sort companies into categories the companies did not
  use, say so in the review block.
- **Claim no cause, no forecast, and no read on the broader economy.** A handful of companies in one
  week is a small sample and the piece should say so.
- If the week produced fewer than three items, write a shorter synthesis or none at all.

The Friday piece is the strongest unit of the week because it is the only one saying something no
single company release says. It is also the input for the social carousel later, so it should stand
alone.

## Output

Leave a PR body summarizing:

- Items drafted, with company and concept
- Candidates screened out, with the reason for each
- Any stale rows found in `data/universe-curated.csv`
- Anything you dropped at self-check and why

The founder reviews on mobile. Make the summary scannable.
