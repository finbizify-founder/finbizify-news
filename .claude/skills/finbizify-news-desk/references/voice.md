# Voice

The reader is a 16-year-old who has never read an earnings release, and an answer engine deciding
whether the page is worth citing. Both are served by the same thing: plain objective statement,
specific and sourced, with no reach.

## Headlines

**Plain and objective. Describe the relationship, not the figures.**

The average teenager takes away the cause and effect, not the numbers. Numbers belong in the body,
where the source sits next to them.

| Good | Bad | Why |
|---|---|---|
| Home Depot's total sales grew faster than its existing stores | Home Depot sold more, but not from its existing stores | The bad one is a negative parallelism, which is banned |
| Target's sales rose mostly because more people shopped there | Target's growth came from more people, not bigger baskets | Same ban |
| Lowe's bought two companies during the quarter | Lowe's grew 8% and its stores were flat | Numbers do not belong in headlines |
| Walmart's advertising business grew faster than its stores | One Walmart grew fast and another Walmart grew slowly | Clever framing that outruns the source |
| Ross Stores' earnings included a tariff refund | A quarter of Ross Stores' profit came from something that will not happen again | Absolute language, reads as engagement bait |

## The three parts

**What happened.** Two sentences. Every figure from the one cited source. Lead with the relationship;
let the numbers support it rather than open it.

**Concept.** One short paragraph explaining the mechanism in plain language. This is the part that
makes the item worth publishing, because the event itself is available in a thousand other places.
Explain the idea so it transfers to the next company, not just this one.

**Why it matters.** One line. **This is the only field that reaches past the source, so it is the only
place an unsupported claim can enter.** Across every draft of this project, every sentence that had to
be cut for overreach was in this field.

It must either:
- **Name the reading as a reading** — "often gets watched as," "is generally considered," "tends to be
  read as"
- **Or end in a question** — "Worth asking of any company that reports growth: how much came from the
  business it already had?"

Never a flat generalization about how business works.

| Good | Bad |
|---|---|
| Home improvement projects are among the purchases people can most easily postpone, so this figure often gets watched as a read on household confidence | Nobody remodels a kitchen they are about to leave |
| Companies can grow sales by charging more or by attracting more people, and the second is generally considered the harder one to pull off | Raising prices grows sales for a quarter or two |
| Worth asking of any company that reports growth: which of the two kinds was it? | One grew from its own stores. One grew from a checkbook |
| Separating the regular business from the one-off events is part of reading any earnings report | Something that will not happen again |

## Hard rules

- **No em dashes.** Commas, periods, colons, semicolons, parentheses.
- **No negative parallelisms.** "It's not X, it's Y," "Not X. Y.," "Less X, more Y," and every
  variant. Say what it is.
- **No dead AI vocabulary:** delve, leverage, unlock, robust, seamless, elevate, crucial, pivotal,
  landscape, supercharge, empower, streamline, game-changer.
- **No "serves as / stands as / represents a"** in place of "is."
- **No absolute language.** "Will not happen again," "always," "guarantees."
- **No financial abbreviation without its full term.** Earnings per share, comparable sales, operating
  income. The explanation lives in the concept line.
- **No numbers in headlines or in the concept line.** Body only.
- Sentence case headers. Contractions. Digits for numbers. No hype, no engagement bait, no
  "consult a professional."
- **Never write down to teens.** No "Hey kids," no fake slang, no patronizing.

## Guidance and forecasts

**Guidance is reportable, never the concept.** Guidance is a company forecast, so a teaching point
built on it is a teaching point built on an opinion.

Report guidance only when it is material to the event, phrased as a statement the company made. Anchor
every concept on results that already happened.

## Investment framing

Never. No "buy," no "sell," no price target, no judgment of a company as a good or bad investment, no
implication that a reader should do anything with money as a result of the item.

Share price movement is never the subject of an item.

## Comparisons

A comparison between two companies must **name what the two actually share, and the shared thing has
to be checkable.**

A prior draft paired Target with Lowe's and called them "the same business," which they are not.
The real pair that week was Home Depot and Lowe's: same business, reporting a day apart. Same-day is
not the same as same-business.

When comparing, cite only what each company's own source says. Do not explain one company's numbers
using another company's disclosure.

## Numbers are evidence, not the point

**The concept and its explanation are what the reader takes away. The figures are there so the claim
can be checked.** Use the fewest numbers that make the point land. Two or three in an item is usually
right; six is a sign the item is reporting rather than teaching.

A reader who remembers the idea and forgets every figure got what the item was for.

## Say which figure you used

**Companies routinely report more than one number under nearly the same name.** Segment revenue and
total revenue. Gross margin and adjusted gross margin. Earnings per share and adjusted earnings per
share.

Rules:

1. **Prefer the figure the company leads with** in its own narrative, not the one buried in the
   statements, unless there is a reason to do otherwise.
2. **If you use a different one, name it** so a reader checking the source knows which line to find.
3. **Any percentage must sit on the same base as the dollar figures in the same item.** Citing a
   segment revenue number next to a percentage computed on total revenue is an error even when both
   appear in the filing.

Worked example. Cava's Q2 release headlines "CAVA Revenue grew 31.3% to $365.4 million," while its
income statement shows total Revenue of $368,436 thousand. The general and administrative percentages
the company reports are computed on the total. An item using the total is correct and must say so;
an item pairing the segment figure with those percentages is wrong.

## Name the brands a teenager knows

A legal entity name is often not the name anyone recognizes. On first mention, give the brands:

> TJX Companies, which runs T.J. Maxx, Marshalls, and HomeGoods, ...

`data/universe-curated.csv` carries a `consumer_brands` column and is the authority. If a company is
not listed there with brands, use the wording in the company's own release rather than recalling brand
ownership from memory, since brands get bought and sold.

## The teachability gate

**The concept must be explainable to someone who has never seen a financial statement.**

Before drafting, ask: can this be explained without first explaining what a line item is, where it
sits, or how the statements fit together? If not, either find a different angle on the same event, or
drop the item.

Prefer concepts a teenager meets directly. Prices, traffic, what a store sells, what a company buys,
how many locations it has, who owns what. Reach for balance-sheet and capital-structure ideas only
when the event makes them concrete.

Two from the first live run that show the line:

- **Worked.** Costs at head office growing more slowly than sales. The idea survives without the
  statements, though the item reached it through a general and administrative line, which made it
  harder than it needed to be. A version built on what the company sells would have landed sooner.
- **Too advanced as written.** A share repurchase authorization. It requires knowing what a share is,
  what an authorization is, and that permission to spend is not spending. Reportable, but it needs a
  much more grounded explanation than the concept line alone.
