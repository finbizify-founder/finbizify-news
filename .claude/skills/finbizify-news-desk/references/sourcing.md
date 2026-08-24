# Sourcing and archiving

## One source per item

Exactly one. No stacking links behind a claim. Every figure in the item comes from that one document.

This is deliberate: it makes review a single Ctrl+F against a single page rather than a
reconciliation across several.

## Tier A — SEC EDGAR

**Where an SEC filing exists, cite EDGAR rather than the company's own page.**

An 8-K exhibit 99.1 *is* the company's press release as filed, so EDGAR gives you the same text plus a
permanent, timestamped, government-hosted URL that will not be revised or removed.

Resolution procedure:

1. Find the company's CIK.
2. Query the EDGAR submissions API: `https://data.sec.gov/submissions/CIK##########.json`
   (CIK zero-padded to 10 digits). Send a descriptive `User-Agent` header; EDGAR rejects requests
   without one.
3. Find the recent filing matching the event. Earnings and material events are 8-K. Quarterly figures
   are 10-Q. Annual are 10-K.
4. The press release is usually `EX-99.1` within that accession.
5. Cite the exhibit URL, not the filing index page.

Which Tier 1 events actually have filings: mergers and acquisitions, leadership changes, bankruptcies,
dividends, buybacks, and material agreements. These are 8-K reportable.

## Tier B — company investor relations

**Most Tier 1 events are not 8-K reportable.** Product launches, price changes, store openings and
closings, recalls, and ordinary hiring have no filing. For these, the company's own newsroom or
investor-relations release is the source.

This is why the two tiers exist. Elevating one-time events and requiring SEC sourcing pull against
each other, and Tier B is the resolution. Do not drop a good Tier 1 story because no filing exists.

## Never the source

A news outlet is never the source, in either tier. Wire services and aggregators may be used to
*discover* a story. They are never cited, and no figure comes from them.

Concretely: if a figure appears in press coverage and you cannot find it in the company's own filing
or release, **the figure does not go in the item.** Rewrite the item without it or drop the item.

## Archiving

Run `scripts/archive-source.mjs <url> <output-basename>` for each item.

It fetches the URL, extracts text, writes `sources/<basename>.txt`, computes a SHA-256, and requests
an Internet Archive capture. It prints a JSON object with the values for the frontmatter.

Fill these fields from its output:

```yaml
source_archived: sources/2026-08-18-home-depot-8k.txt
source_fetched_at: 2026-08-18T14:12:00Z
source_http_status: 200
source_sha256: 3f2a...
wayback_url: https://web.archive.org/web/2026...
```

**A failed fetch is blocking.** No archive, no item. **A failed Wayback capture is non-blocking:**
leave `wayback_url` empty, keep the local archive, and note it in the run summary.

## The archive is evidence, never content

`sources/` is excluded from the site build. Never render archived text, never copy it into
`content/`, and never quote at length from it. Republishing a company's full press release is a
copyright problem that citation-and-summary otherwise avoids completely.

Two to three sentences of original summary with a link is fine. A reproduced release is not.

## Self-check against the archive

At step 7 of the pipeline, verify each drafted item against its **archived file**, not against the
live URL. The archive is what you actually read. A page that changed between your fetch and your
self-check would otherwise pass silently.
