// Point every absolute site URL at a new address.
// usage: npm run site-url -- https://new-address/
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const files = ['public/index.html', 'public/robots.txt', 'public/sitemap.xml'];
const root = resolve(import.meta.dirname, '..');
const arg = process.argv[2];
if (!arg || !/^https:\/\/[^/]+\/?$/.test(arg)) {
  console.error('usage: npm run site-url -- https://new-address/');
  process.exit(1);
}
const next = arg.endsWith('/') ? arg : `${arg}/`;

// the current address is whatever the canonical link says
const html = await readFile(resolve(root, 'public/index.html'), 'utf8');
const current = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (!current) { console.error('No canonical link found in public/index.html'); process.exit(1); }
if (current === next) { console.log(`Already set to ${next}`); process.exit(0); }

for (const f of files) {
  const p = resolve(root, f);
  const text = await readFile(p, 'utf8');
  const count = text.split(current).length - 1;
  await writeFile(p, text.replaceAll(current, next));
  console.log(`${f}: ${count} replaced`);
}
console.log(`${current} → ${next}`);
