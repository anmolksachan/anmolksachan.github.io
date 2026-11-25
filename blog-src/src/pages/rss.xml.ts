import articlesRaw from '../data/articles.json';
import type { Article } from '../lib/articles';
import { deriveCategory } from '../lib/articles';

const articles = articlesRaw as Article[];
const siteUrl  = 'https://anmolksachan.github.io';
const base     = '/blogs';

function escapeXml(str: string): string {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}

export async function GET() {
  const items = articles.map(a => {
    const url = `${siteUrl}${base}/${a.slug}/`;
    const cat = deriveCategory(a);
    return `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <pubDate>${new Date(a.pubDate).toUTCString()}</pubDate>
      <category><![CDATA[${cat}]]></category>
      ${a.tags.map(t => `<category><![CDATA[${t}]]></category>`).join('\n      ')}
      ${a.mediumUrl ? `<source url="${escapeXml(a.mediumUrl)}">Medium</source>` : ''}
    </item>`.trim();
  }).join('\n  ');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Anmol K Sachan — Security Research</title>
    <link>${siteUrl}${base}/</link>
    <description>Security research, vulnerability write-ups, AI/LLM security, OSINT tools, and bug bounty stories by Anmol K Sachan.</description>
    <language>en-us</language>
    <managingEditor>anmolksachan@outlook.com (Anmol K Sachan)</managingEditor>
    <webMaster>anmolksachan@outlook.com (Anmol K Sachan)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}${base}/rss.xml" rel="self" type="application/rss+xml" />
    <ttl>1440</ttl>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
