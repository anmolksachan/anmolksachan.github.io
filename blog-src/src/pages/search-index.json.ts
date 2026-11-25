import articlesRaw from '../data/articles.json';
import type { Article } from '../lib/articles';

const articles = articlesRaw as Article[];

export async function GET() {
  const index = articles.map(a => ({
    slug:        a.slug,
    title:       a.title,
    excerpt:     a.excerpt,
    tags:        a.tags,
    readingTime: a.readingTime,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
