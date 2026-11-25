/**
 * sync-rss.mjs
 * Fetches the Medium RSS feed, sanitizes content, extracts metadata,
 * and merges new articles into src/data/articles.json (never deletes existing).
 *
 * Usage: node scripts/sync-rss.mjs
 */

import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '../src/data/articles.json');
const FEED_URL  = 'https://medium.com/feed/@anmolksachan';

// ── HTML sanitization config ──────────────────────────────────────────────
const ALLOWED_TAGS = [
  'h1','h2','h3','h4','h5','h6',
  'p','br','hr','blockquote',
  'ul','ol','li',
  'strong','em','b','i','u','s','del','mark',
  'code','pre','kbd','samp',
  'a','img','figure','figcaption',
  'table','thead','tbody','tr','th','td',
  'details','summary',
  'div','span',
];

const ALLOWED_ATTRS = {
  'a':   ['href', 'title', 'rel'],
  'img': ['src', 'alt', 'title', 'loading', 'width', 'height'],
  'td':  ['colspan', 'rowspan'],
  'th':  ['colspan', 'rowspan', 'scope'],
  'code':['class'],
  'pre': ['class'],
};

function sanitize(html) {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ['https', 'http', 'mailto'],
    // Add rel="noopener noreferrer" and target="_blank" to external links
    transformTags: {
      'a': (tagName, attribs) => {
        const href = attribs.href || '';
        const isExternal = href.startsWith('http') &&
          !href.includes('anmolksachan.github.io');
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal ? {
              target: '_blank',
              rel: 'noopener noreferrer',
            } : {}),
          },
        };
      },
      // Add lazy loading to all images
      'img': (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: 'lazy' },
      }),
    },
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────
function extractSlug(url) {
  try {
    const u = new URL(url.split('?')[0]);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || createHash('md5').update(url).digest('hex').slice(0, 8);
  } catch {
    return createHash('md5').update(url).digest('hex').slice(0, 8);
  }
}

function extractCoverImage(html) {
  const imgMatch = html.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
  if (!imgMatch) return null;
  const altMatch  = html.match(/<img[^>]+alt="([^"]*)"[^>]*>/i);
  const capMatch  = html.match(/<figcaption[^>]*>(.*?)<\/figcaption>/is);
  return {
    src:     imgMatch[1],
    alt:     altMatch ? altMatch[1] : '',
    caption: capMatch ? sanitizeHtml(capMatch[1], { allowedTags: [] }) : '',
  };
}

function plainText(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();
}

function generateExcerpt(html, maxLen = 220) {
  const text = plainText(html);
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function readingTime(html) {
  const words = plainText(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function normalizeDate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function parseCategories(item) {
  const cats = item.category;
  if (!cats) return [];
  const list = Array.isArray(cats) ? cats : [cats];
  return list
    .map(c => {
      if (c && typeof c === 'object') return String(c['#cdata'] || c['#text'] || '');
      return String(c || '');
    })
    .map(s => s.toLowerCase().trim())
    .filter(Boolean);
}

// ── Fetch & parse RSS ──────────────────────────────────────────────────────
async function fetchFeed() {
  console.log(`Fetching ${FEED_URL} …`);
  const res = await fetch(FEED_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; blog-sync/1.0; +https://anmolksachan.github.io/blogs)',
      'Accept':     'application/rss+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching RSS`);
  return res.text();
}

function parseXML(xml) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    cdataPropName: '#cdata',
    parseTagValue: true,
    parseAttributeValue: false,
    trimValues: true,
    isArray: (name) => name === 'item' || name === 'category',
  });
  const doc = parser.parse(xml);
  const items = doc?.rss?.channel?.item ?? [];
  return items;
}

function itemToArticle(item) {
  function cdataStr(v) {
    if (!v) return '';
    if (typeof v === 'object') return String(v['#cdata'] || v['#text'] || '');
    return String(v);
  }
  const link    = cdataStr(item.link) || cdataStr(item.guid);
  const title   = cdataStr(item.title);
  const rawHtml = cdataStr(item['content:encoded']);
  const pubDate = cdataStr(item.pubDate) || cdataStr(item['atom:updated']) || '';
  const guid    = cdataStr(item.guid) || link;
  const author  = cdataStr(item['dc:creator']) || 'Anmol K Sachan';
  const tags    = parseCategories(item);

  const content    = sanitize(rawHtml);
  const cover      = extractCoverImage(rawHtml);
  const excerpt    = generateExcerpt(rawHtml);
  const readTime   = readingTime(rawHtml);
  const slug       = extractSlug(link);
  const id         = createHash('sha1').update(guid).digest('hex').slice(0, 12);

  return {
    id,
    slug,
    title,
    excerpt,
    content,
    cover,
    author,
    pubDate: normalizeDate(pubDate),
    tags,
    mediumUrl: link.split('?')[0],
    readingTime: readTime,
    featured: false,
  };
}

// ── Merge with existing ───────────────────────────────────────────────────
function mergeArticles(existing, incoming) {
  const byId = new Map(existing.map(a => [a.id, a]));
  let added = 0, updated = 0;

  for (const article of incoming) {
    if (!byId.has(article.id)) {
      byId.set(article.id, article);
      added++;
    } else {
      // Update title/content/tags if the article was edited, preserve featured flag
      const prev = byId.get(article.id);
      byId.set(article.id, { ...article, featured: prev.featured });
      updated++;
    }
  }

  // Sort descending by date
  const merged = Array.from(byId.values()).sort(
    (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
  );

  console.log(`Sync complete: +${added} new, ~${updated} refreshed, ${merged.length} total`);
  return merged;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  // Load existing articles
  const existing = existsSync(DATA_FILE)
    ? JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    : [];

  let incoming = [];
  try {
    const xml   = await fetchFeed();
    const items = parseXML(xml);
    incoming    = items.map(itemToArticle);
    console.log(`Fetched ${incoming.length} articles from RSS`);
  } catch (err) {
    console.error(`Failed to fetch RSS: ${err.message}`);
    console.log('Using existing articles only');
  }

  const merged = mergeArticles(existing, incoming);

  // Mark the first (most recent) article as featured if none are
  if (merged.length > 0 && !merged.some(a => a.featured)) {
    merged[0].featured = true;
  }

  writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2), 'utf-8');
  console.log(`Wrote ${merged.length} articles → src/data/articles.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
