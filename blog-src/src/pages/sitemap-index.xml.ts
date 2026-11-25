export async function GET() {
  const siteUrl = 'https://anmolksachan.github.io';
  const base    = '/blogs';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}${base}/sitemap-0.xml</loc>
    <lastmod>${new Date().toISOString().slice(0,10)}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
