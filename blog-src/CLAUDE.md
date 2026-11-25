# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install deps
npm install

# Sync Medium RSS feed into articles.json
npm run sync

# Dev server (http://localhost:4321/blogs)
npm run dev

# Production build → dist/
npm run build

# Preview built output
npm run preview

# Sync + build in one step
npm run sync-build
```

After `npm run build`, copy `dist/` to `../blogs/` to update the served files:
```bash
rm -rf ../blogs && cp -r dist ../blogs
```

## Architecture

**Static site generator:** Astro 4.x with Tailwind CSS. Output at `dist/`, served under `/blogs` path prefix (configured via `base: '/blogs'` in `astro.config.mjs`).

**Data pipeline:**
- `scripts/sync-rss.mjs` fetches the Medium RSS feed, parses it with `fast-xml-parser`, sanitizes HTML via `sanitize-html`, then merges into `src/data/articles.json` (accumulate-and-merge pattern — never deletes, solves Medium's 10-article RSS cap).
- `articles.json` is the source of truth for all pages; it's committed to the repo.

**Key source files:**
- `src/lib/articles.ts` — Article type, `deriveCategory()` (regex rules), `relatedArticles()`, `extractToc()`, `injectHeadingIds()`, date formatters.
- `src/styles/global.css` — All custom CSS: `.article-content` prose, `.cat-badge`, `.tag-badge`, `.article-card`, `#cmd-dialog`, `#lightbox`, scroll animations.
- `src/layouts/BaseLayout.astro` — HTML shell, OG/Twitter meta, JSON-LD, Fuse.js Cmd+K search, lightbox, code copy buttons.
- `src/pages/[slug].astro` — Individual article pages with reading progress bar, TOC sidebar, related articles, prev/next nav, share buttons.
- `src/pages/index.astro` — Homepage with hero, featured article, article grid, live search/filter/sort, topics grid.

**Category derivation:** `deriveCategory()` in `articles.ts` uses regex rules against title + tags. Most Medium articles have no tags so this is the primary classification mechanism.

**CDATA handling:** `fast-xml-parser` with `cdataPropName: '#cdata'` wraps CDATA text in objects `{#cdata: "value"}`. The sync script uses a `cdataStr(v)` helper to extract strings from both CDATA objects and plain strings.

**GitHub Actions:** `.github/workflows/sync-blog.yml` runs daily at 06:00 UTC, syncs feed, builds, commits updated `blogs/` and `articles.json`.

## Design system

Dark green cybersecurity theme: `#06100a` base background, `#00e673` accent, Space Grotesk display font, JetBrains Mono for code/badges. Category badges use inline rgba colors (not Tailwind utilities) because the semantic colors are defined as plain hex strings in tailwind config.
