import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/prerender.tsx');
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('<!--app-html-->', render());
  const origin = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  if (origin) {
    const url = new URL(origin);
    if (url.protocol !== 'https:') throw new Error('SITE_URL deve usar HTTPS.');
    const base = url.origin;
    html = html.replace('<meta name="robots" content="noindex, nofollow" />', '<meta name="robots" content="index, follow" />');
    html = html.replace('</head>', `<link rel="canonical" href="${base}/" /><meta property="og:url" content="${base}/" /><meta property="og:image" content="${base}/images/guindaste-hero-e37fa0dc.jpg" /><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'InsuranceAgency', name: 'Brasivoire Corretora de Seguros', url: `${base}/`, telephone: '+5519991001577', sameAs: ['https://www.instagram.com/brasivoire/'], logo: `${base}/brand/brasivoire-logo.png`, address: { '@type': 'PostalAddress', addressLocality: 'Campinas', addressRegion: 'SP', addressCountry: 'BR' } })}</script></head>`);
    await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
    await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url></urlset>`);
  }
  await writeFile(resolve('dist/index.html'), html);
  console.log('HTML institucional pré-renderizado.');
} finally { await server.close(); }
