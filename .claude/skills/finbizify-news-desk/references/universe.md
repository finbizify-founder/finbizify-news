# Universe: which companies are in scope

## Indices

| Source | Status |
|---|---|
| S&P 500 | Core |
| S&P MidCap 400 | Core |
| Nasdaq 100 | Core (overlaps S&P 500 heavily; adds some foreign-domiciled names) |
| FTSE Developed ex-US | International proxy, capped at one item per week |
| Curated list (`data/universe-curated.csv`) | Core. Watched regardless of index membership |
| Russell 2000 | **Out of scope.** Poor hit rate, mostly regional banks and biotech |

The curated list is the one that matters most in practice. A company a teenager can name belongs in
scope even when the index files would not surface it.

## Scale exceptions

These companies pass even though their sector is excluded, on size and public familiarity:

- **Semiconductors:** TSMC, Intel, Nvidia, Micron
- **Aerospace:** Boeing
- **Fintech:** Block, PayPal (the card networks stay excluded)

SpaceX is in scope by interest but has no SEC filings, so it falls in the deferred private-company
lane and cannot be drafted yet.

## Private companies

**Out of scope for now.** The $1B+ private lane was deferred because no filings means no
deterministic source. Do not draft private-company items.

## International

Foreign private issuers file 20-F annually and 6-K as needed. No 8-K, no 10-Q. That is accepted.

**Cap: one international item per week**, and only when it is genuinely more interesting than the
domestic alternatives. US companies should be the overwhelming majority.

**China is excluded entirely**, including US-listed Chinese ADRs, under the standing political screen.

Be aware that many of the most recognizable international brands are not SEC registrants at all,
including LVMH, Nestlé, Nintendo, Inditex (Zara), Adidas, and Fast Retailing (Uniqlo). They are
reachable only through their own investor-relations releases, or not at all.

## Verify before drafting

`data/universe-curated.csv` is hand-maintained and goes stale. Companies get acquired, taken private,
and delisted. **Confirm the company is currently publicly traded and still filing with the SEC before
you draft an item about it.** If a row is stale, drop the item and flag the row in the run summary.

## The brands column

`data/universe-curated.csv` has a `consumer_brands` column giving the names a teenager actually
recognizes, where they differ from the legal entity name. TJX Companies runs T.J. Maxx, Marshalls, and
HomeGoods. Yum Brands runs Taco Bell, KFC, and Pizza Hut.

Name those on first mention. The column is founder-maintained and is the authority. Where it is blank,
the company name is the recognizable name, or nobody has filled it in yet: in that case use the
wording in the company's own release rather than recalling brand ownership from memory, because brands
get bought and sold.
