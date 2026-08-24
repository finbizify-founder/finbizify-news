#!/usr/bin/env node
// Fetch a source URL, archive its text as evidence, and request an Internet Archive capture.
//
//   node scripts/archive-source.mjs <url> <basename>
//
// Writes sources/<basename>.txt and prints a JSON object with the frontmatter values.
//
// A failed fetch exits non-zero: no archive, no item. A failed Wayback capture is non-blocking and
// leaves wayback_url empty.

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

// EDGAR rejects requests without a descriptive User-Agent, and it is polite everywhere else.
const UA = "FinBizify news desk (joe@finbizify.com)";
const FETCH_TIMEOUT_MS = 30_000;
const WAYBACK_TIMEOUT_MS = 45_000;

function fail(message) {
  console.error(`archive-source: ${message}`);
  process.exit(1);
}

async function fetchWithTimeout(url, ms, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// Strip markup to readable text. Deliberately crude: this is evidence for a human Ctrl+F and a
// stable hash, not a rendering.
function extractText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|tr|li|h[1-6]|table|section|article)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    // Numeric entities, decimal and hex. EDGAR exhibits are full of these (&#59;, &#8217;, ...) and
    // leaving them encoded makes the evidence file hard to search by eye.
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function requestWaybackCapture(url) {
  try {
    const res = await fetchWithTimeout(
      `https://web.archive.org/save/${url}`,
      WAYBACK_TIMEOUT_MS,
      { method: "GET", headers: { "User-Agent": UA }, redirect: "follow" },
    );
    // The Save Page Now response exposes the snapshot path in a header on success, and the final
    // redirect URL otherwise. Either is a usable citation.
    const headerPath = res.headers.get("content-location");
    if (headerPath) return `https://web.archive.org${headerPath}`;
    if (res.url && res.url.includes("/web/")) return res.url;
    return "";
  } catch {
    return "";
  }
}

const [url, basename] = process.argv.slice(2);
if (!url || !basename) fail("usage: archive-source.mjs <url> <basename>");
if (!/^https?:\/\//i.test(url)) fail(`not an http(s) url: ${url}`);
if (!/^[a-z0-9._-]+$/i.test(basename)) fail(`basename must be filename-safe: ${basename}`);

const fetchedAt = new Date().toISOString();

let res;
try {
  res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,text/plain,*/*" },
    redirect: "follow",
  });
} catch (err) {
  fail(`fetch failed for ${url}: ${err.message}`);
}

if (!res.ok) fail(`fetch returned HTTP ${res.status} for ${url}`);

const raw = await res.text();
const text = extractText(raw);
if (text.length < 200) fail(`extracted only ${text.length} chars from ${url}; refusing to archive`);

const outPath = resolve(process.cwd(), "sources", `${basename}.txt`);
const header = [
  `SOURCE URL: ${url}`,
  `FETCHED AT: ${fetchedAt}`,
  `HTTP STATUS: ${res.status}`,
  "",
  "--- extracted text below; evidence only, never rendered or republished ---",
  "",
].join("\n");

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, header + text, "utf8");

// Hash the extracted text only, so the value is stable across changes to the header format.
const sha256 = createHash("sha256").update(text, "utf8").digest("hex");
const waybackUrl = await requestWaybackCapture(url);

console.log(
  JSON.stringify(
    {
      source_url: url,
      source_archived: `sources/${basename}.txt`,
      source_fetched_at: fetchedAt,
      source_http_status: res.status,
      source_sha256: sha256,
      wayback_url: waybackUrl,
      extracted_chars: text.length,
    },
    null,
    2,
  ),
);
