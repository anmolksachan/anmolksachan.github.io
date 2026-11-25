export interface CoverImage {
  src:     string;
  alt:     string;
  caption: string;
}

export interface Article {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  content:     string;
  cover:       CoverImage | null;
  author:      string;
  pubDate:     string;
  tags:        string[];
  mediumUrl:   string;
  readingTime: number;
  featured:    boolean;
}

// ── Category derivation ──────────────────────────────────────────────────
const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/\bcve\b|rce\b|pre.?auth|exploit|0day|patch/i,                        'Vulnerability Research'],
  [/llm|prompt.inject|gpt|claude|gemini|neural|ai.sec|agentic/i,         'AI/LLM Security'],
  [/burp|extension|plugin|tool|automat|script/i,                          'Security Tooling'],
  [/osint|recon|cloud.?fail|cloudflare|wayback|time.machine|dorking/i,   'OSINT'],
  [/xss|bug.?bounty|cert.in|hall.of.fame|responsible.?disclos/i,         'Bug Bounty'],
  [/threat.?trac|intell|cve.?track|monitor|dashboard/i,                  'Security Automation'],
  [/api\b|graphql|rest\b|oauth/i,                                         'API Security'],
  [/web\b|http|sql|inject|sqli/i,                                         'Web Security'],
];

export function deriveCategory(article: Article): string {
  const corpus = [article.title, ...article.tags].join(' ');
  for (const [re, label] of CATEGORY_RULES) {
    if (re.test(corpus)) return label;
  }
  return 'Security Research';
}

export const ALL_CATEGORIES = [
  'All',
  'Vulnerability Research',
  'AI/LLM Security',
  'Bug Bounty',
  'OSINT',
  'Security Tooling',
  'Security Automation',
  'API Security',
  'Web Security',
  'Security Research',
];

// ── Formatting helpers ───────────────────────────────────────────────────
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  });
}

export function relatedArticles(current: Article, all: Article[], limit = 3): Article[] {
  const curCat = deriveCategory(current);
  const curTags = new Set(current.tags);

  return all
    .filter(a => a.id !== current.id)
    .map(a => {
      let score = 0;
      if (deriveCategory(a) === curCat) score += 3;
      for (const tag of a.tags) if (curTags.has(tag)) score += 2;
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score || 0)
    .slice(0, limit)
    .map(x => x.article);
}

// ── TOC extraction ───────────────────────────────────────────────────────
export interface TocItem {
  level: number;
  text:  string;
  id:    string;
}

export function extractToc(html: string): TocItem[] {
  const headingRe = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(html)) !== null) {
    const level = Number(match[1]);
    const text  = match[2].replace(/<[^>]*>/g, '').trim();
    if (!text) continue;
    const id    = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60);
    items.push({ level, text, id });
  }
  return items;
}

// ── Inject heading IDs for anchor linking ────────────────────────────────
export function injectHeadingIds(html: string): string {
  const counts: Record<string, number> = {};
  return html.replace(/<h([2-4])([^>]*)>(.*?)<\/h[2-4]>/gi, (_, level, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, '').trim();
    const base = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60);
    counts[base] = (counts[base] ?? 0) + 1;
    const id = counts[base] > 1 ? `${base}-${counts[base]}` : base;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}
