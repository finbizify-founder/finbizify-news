# Filters: sectors and event types

## Sector priority

Ranked. When two candidates are otherwise equal, the higher-ranked sector wins.

1. **Consumer Discretionary** — retail, restaurants, apparel, autos, hotels, leisure
2. **Consumer Staples** — food, beverage, household products, grocery
3. **Communication Services, partial** — streaming, social, gaming, telecom.
   Exclude broadcast and publishing, where politics leaks in
4. **Information Technology, partial** — consumer devices, apps, consumer software.
   Exclude enterprise infrastructure
5. **Financials, partial** — consumer banking and fintech.
   Exclude capital markets and insurance underwriting

## Case by case

Admit only the consumer-facing slice:

- **Health Care** — retail pharmacy and consumer health products. Exclude drug pipelines, trial
  results, FDA decisions, biotech
- **Industrials** — airlines and package delivery. Exclude machinery and defense
- **Real Estate** — residential and housing, where it touches rent and buying a home

## Excluded sectors

Energy · Materials · Utilities · capital markets · insurance underwriting · biotech and pharma ·
aerospace and defense · semiconductors · enterprise infrastructure

Semiconductors and aerospace have named scale exceptions in `universe.md`. Nothing else does.

## Event types

### Tier 1 — elevate these

One-time events. A 16-year-old can grasp these directly, and they are the least covered by every
other feed. **Prefer a Tier 1 story over a Tier 2 story even when the Tier 2 story is bigger.**

Product launches · price changes · mergers and acquisitions · store openings and closings ·
layoffs and hiring · leadership changes · recalls · bankruptcies · IPOs · consumer-facing lawsuits
and settlements

### Tier 2 — include, but do not lead

High volume, lower comprehension value. Earnings weeks will flood the scan with these. Take the best
one or two and move on.

Earnings results · dividends · buybacks · stock splits · share price moves

### Excluded

Roughly 80% of financial news by item count lives here. Discard on sight:

Analyst rating changes · price target changes · "the stock moved X% today" with no underlying event ·
insider transactions · 13F and 13G filings · conference appearances · index additions and removals ·
anything opinion or commentary · anything speculative about what a company might do

## Relevance test

A company or event can pass every filter above and still not belong. Ask: **does a teenager have any
contact with this company or this event?**

A chief information officer appointment at a B2B dental distributor is technically a Tier 1 leadership
change and is still not worth publishing. Drop it.

## Recency

- **Priority:** reported within the prior 24-48 hours
- **Eligible:** reported within the prior 14 days
- **Hard floor:** nothing older than 14 days, no exceptions

The 14-day tail exists so a story passed over on a busy day can resurface. Monday is when it earns its
keep.

## Deduplication

Check `content/news/` before drafting. If the same company and the same event already have a file,
skip it. A genuinely new development in an ongoing story is a new item; a restatement is not.
