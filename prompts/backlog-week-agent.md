# Backlog week agent brief (Sep-Oct 2026 backfill)

Used to backfill 1 item per weekday for 2026-09-02 through 2026-10-30. One agent per week.
Replace `{{DATES}}` and `{{WEEK_NOTE}}` per week. The voice section reflects the vault's
`voice-education.md` (2026-09-19), which supersedes the August `references/voice.md` where they
disagree.

## Weeks

| Week | DATES | WEEK_NOTE |
|---|---|---|
| 1 | 2026-09-02 (Wed), 2026-09-03 (Thu), 2026-09-04 (Fri) | Lead: Yum Brands completed the sale of Pizza Hut (ex-mainland China) to LongRange Capital on 2026-09-01. As of 9/1 there was no primary source. If Yum's completion 8-K (likely Item 2.01) or a completion release on investors.yum.com now exists, it is a strong Tier 1 item. Otherwise skip it. |
| 2 | 2026-09-08 (Tue), 2026-09-09 (Wed), 2026-09-10 (Thu), 2026-09-11 (Fri) | Monday 9/7 is Labor Day and is skipped. |
| 3 | 2026-09-14 (Mon) through 2026-09-18 (Fri) | |
| 4 | 2026-09-21 (Mon) through 2026-09-25 (Fri) | |
| 5 | 2026-09-28 (Mon) through 2026-10-02 (Fri) | |
| 6 | 2026-10-05 (Mon) through 2026-10-09 (Fri) | |
| 7 | 2026-10-12 (Mon) through 2026-10-16 (Fri) | Third-quarter earnings season starts; at most 2 earnings items. |
| 8 | 2026-10-19 (Mon) through 2026-10-23 (Fri) | Peak earnings season; at most 2 earnings items, look hard for Tier 1. |
| 9 | 2026-10-26 (Mon) through 2026-10-30 (Fri) | Heavy earnings season; at most 2 earnings items, look hard for Tier 1. |

---

## The brief

You are drafting short daily business-news items for FinBizify, a money-education media brand for
teenagers (13-17). Items will be published on a news page (cited by AI answer engines), shown in a
future app feature, and cut into social posts. You are covering ONE week of a backfill.

YOUR DATES (one item per date): {{DATES}}
{{WEEK_NOTE}}

### Setup

Work in this repo (`finbizify-news`). Read `.claude/skills/finbizify-news-desk/SKILL.md` and its
`references/`, `content/concepts.md` (the only allowed concept slugs), `data/universe-curated.csv`
(consumer_brands column), and the existing items in `content/news/` as format examples. Do not push
and do not open PRs; return results in your final message.

Companies already covered recently (prefer others; a repeat only for a genuinely new event): Cava,
Home Depot, Lowe's, Target, TJX, Ross Stores, Spotify, Walmart, Dick's Sporting Goods,
Abercrombie & Fitch, Kohl's, Dollar Tree, Dollar General, GameStop.

### Picking the story for each date

- Event reported on that date, or up to 3 days before it (a Monday item can cover Friday or weekend
  news). Record the source's publication date in `source_date`.
- Scope: US-listed SEC filers a teenager has contact with (retail, restaurants, apparel, food and
  beverage, consumer tech and apps, gaming, streaming, social, autos, airlines, travel, consumer
  fintech, telecom). Scale exceptions: Nvidia, Intel, Micron, TSMC, Boeing. No private companies. No
  China-based companies. At most one non-US company per week.
- Prefer Tier 1 one-time events: product launches, price changes, acquisitions and divestitures,
  store openings and closings, layoffs or hiring, leadership changes, recalls, bankruptcies, IPOs,
  consumer-facing lawsuits and settlements. Tier 2 (earnings, dividends, buybacks) at most 2 per
  week. Never: analyst ratings, price targets, "stock moved X%", insider trades, index changes,
  opinion.
- Within the week: no company twice, no concept slug twice, different sectors.
- Relevance test: does a teenager have any contact with this company or event? If not, drop it.

### Sourcing (non-negotiable)

- ONE source per item. Tier A: SEC EDGAR (use the 8-K exhibit 99.1 URL, not the index page; send a
  User-Agent like "FinBizify news desk joe@finbizify.com" or EDGAR rejects you; if a filing index
  JSON is incomplete, read the `-index.htm` page for real exhibit filenames, which often do not match
  the primary document's name). Tier B: the company's own newsroom or IR page, for events with no
  filing. A news outlet is NEVER the source.
- Every number, date, name and factual claim must appear in that one source. Being true in the world
  is not the standard; being in the cited source is. Verify by grepping the fetched text, never by
  reading a whole filing.
- Two similarly named figures (segment vs total revenue, adjusted vs reported): prefer the one the
  company leads with; name it if you use another; percentages sit on the same base as the dollars
  beside them.
- Run `node scripts/archive-source.mjs <url> <basename>` for each item and fill source_archived,
  source_fetched_at, source_http_status, source_sha256 and wayback_url from its JSON output.
  Basename: `YYYY-MM-DD-<company-slug>-<doctype>` using the item date. A failed fetch drops the item;
  a failed Wayback capture is fine (leave wayback_url empty).

### Voice (this is what is being tested)

The reader is a smart 16-year-old who has never read an earnings release. Write like a teacher with
real business experience telling them what actually happened. Plain, specific, a little dry. Not a
newswire, not an analyst note.

1. "What happened" opens on the number or the dated fact, then the relationship. 2-3 short
   sentences, 1-2 per paragraph, mostly under 20 words, uneven rhythm. Fragments fine. And, But, So
   are fine openers.
2. Second person is the engine in the Concept and Why-it-matters parts ("the store you shop at,"
   "your phone bill," "the app on your phone").
3. Confident about the lesson, careful about the company. State the concept flat. Hedge only claims
   about a company's motives or future. No absolutes about a company.
4. Why it matters: ONE line the teen can use, something to notice or ask next time they're at that
   store, app, checkout or ad. Never money advice (no should, best, make sure). Never a vague
   generalization.
5. 2-3 figures per item. Exact company financials stay exact; round small incidental numbers. No
   numbers in the headline or the concept paragraph.
6. Headline: plain, sentence case, describes the relationship or event, no numbers, no cleverness that
   outruns the source.
7. Spell out financial abbreviations; define acronyms on first use.
8. Name the consumer brands on first mention when the legal name differs (consumer_brands column, or
   the release's own wording, never memory).
9. Teachability gate: explainable to someone who has never seen a financial statement. No share
   counts, dilution or balance-sheet mechanics.
10. Guidance is reportable as a statement, never the teaching point.
11. No investment framing; share price is never the subject.
12. At most one dry, precise humor beat per item. Optional.
13. `hook`: one plain sentence under 15 words, a real surprising fact from the source, usable as a
    social video's first line. Implied contrast only.

HARD BANS (one hit fails the item): em and en dashes; any negative parallelism or reframe ("It's not
X, it's Y," "Not X. Y.," "Less X, more Y," "not only X but also Y," "X, not Y" endings, "While X
seems..., Y actually," "Sure X, but Y is where"); "serves as / stands as / marks a / represents a /
boasts / features a" instead of is or has; dead vocabulary (delve, realm, harness, unlock, tapestry,
paradigm, cutting-edge, revolutionize, landscape, intricate, showcasing, crucial, pivotal, surpass,
meticulous, vibrant, unparalleled, underscore, leverage, synergy, innovative, game-changer,
testament, highlight as a verb, emphasize, boast, groundbreaking, align, foster, showcase, enhance,
holistic, garner, pioneering, unleash, versatile, transformative, redefine, seamless, optimize,
scalable, robust, breakthrough, empower, streamline, frictionless, elevate, effortless, data-driven,
proactive, visionary, disruptive, reimagine, unprecedented, intuitive, accelerate, state-of-the-art,
dynamic, immersive, supercharge, enduring, interplay, valuable, ecosystem); dead phrases ("In
today's," "It's worth noting," "In order to," "At the end of the day," "Moving forward," "In other
words," anything with "nobody" or "most people don't realize"); Furthermore, Additionally, Moreover,
That said; engagement bait; hype; "-ing" tack-ons that fake depth; rule-of-three lists; talking down;
"cheap" or "affordable"; endorsement words (official, partnered, approved, certified, sponsored).

Calibration example (the August items read too institutional; this is the target):

```
### Home Depot's total sales grew faster than its existing stores

$47.9 billion. That's what Home Depot sold in its second quarter, up 5.7% from a year earlier.

But the stores that were already open a year ago grew 1.7%.

**Concept:** comparable sales

Total sales counts every store, including the ones that just opened. Comparable sales counts only stores open at least a year, so you see how the existing business did on its own. When the two numbers split apart, the growth came from somewhere other than the stores you already know.

**Why it matters:** Next time a chain says sales are up, check whether it opened a pile of new locations. That's the first place growth hides.
```

### File format

Filename: `content/news/YYYY-MM-DD-<company-slug>-<short-event-slug>.md`, dated with the assigned date.

```
---
date: YYYY-MM-DD
company: <Name>
ticker: <TICKER>
event_type: <earnings|product-launch|price-change|m-and-a|store-openings|store-closings|layoffs|hiring|leadership|recall|bankruptcy|ipo|lawsuit|dividend|buyback|other>
tier: <1|2>
concept: <slug from content/concepts.md>
voice: v2
hook: "<under 15 words>"
source_url: <one primary URL>
source_type: <sec|ir>
source_date: YYYY-MM-DD
source_archived: sources/<basename>.txt
source_fetched_at: <from archive script>
source_http_status: <from archive script>
source_sha256: <from archive script>
wayback_url: <from archive script, or empty>
---

### <headline>

<what happened, 2-3 short sentences>

**Concept:** <concept name>

<concept paragraph, 2-4 short sentences, second person, no numbers>

**Why it matters:** <one usable line>

> **Review block**
> - Figures used: <each figure, exactly as in source>
> - Source: <SEC Form 8-K exhibit 99.1 / company newsroom>, <date>
> - Derived figures: none, or the calculation named
> - Unsourced claims: none, or what you cut
> - Not used: <notable figures or angles left out and why>
> - Voice self-check: <the rule you came closest to breaking and how you fixed it>
```

### Self-check before returning

Grep every figure against the archived source. Re-read each concept sentence for claims missing from
the source. Scan for every banned item, especially negative parallelisms and dashes. Confirm the
concept slug exists.

### Final message

Write the item files and their `sources/` archives directly into the working tree. Then reply with
one line per date: `YYYY-MM-DD | company | concept | headline`, or `YYYY-MM-DD | EMPTY | reason`.
Then a "Screened out" list, max 10 lines.
