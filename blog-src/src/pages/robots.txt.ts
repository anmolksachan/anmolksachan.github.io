export async function GET() {
  const siteUrl = 'https://anmolksachan.github.io';
  const base    = '/blogs';

  const content = `User-agent: *
Allow: /

Sitemap: ${siteUrl}${base}/sitemap-index.xml
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
