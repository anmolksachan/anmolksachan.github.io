import articlesRaw from '../data/articles.json';
import type { Article } from '../lib/articles';

const articles = articlesRaw as Article[];
const siteUrl  = 'https://anmolksachan.github.io';
const base     = '/blogs';

export async function GET() {
  const urls = [
    { loc: `${siteUrl}${base}/`, priority: '1.0', changefreq: 'daily' },
    ...articles.map(a => ({
      loc: `${siteUrl}${base}/${a.slug}/`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: a.pubDate.slice(0, 10),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
