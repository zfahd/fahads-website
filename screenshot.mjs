// Full-page screenshot: node screenshot.mjs <url> [label] [--mobile]
// Saves to "./temporary screenshots/screenshot-N[-label].png" (N auto-increments, never overwrites).
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const mobile = args.includes('--mobile');
const [url = 'http://localhost:3000', label] = args.filter((a) => a !== '--mobile');

const outDir = resolve(import.meta.dirname, 'temporary screenshots');
await mkdir(outDir, { recursive: true });

const used = (await readdir(outDir))
  .map((f) => Number(f.match(/^screenshot-(\d+)/)?.[1]))
  .filter(Number.isFinite);
const n = (used.length ? Math.max(...used) : 0) + 1;
const suffix = [label, mobile ? 'mobile' : null].filter(Boolean).join('-');
const outFile = join(outDir, `screenshot-${n}${suffix ? `-${suffix}` : ''}.png`);

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setViewport(
    mobile
      ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
      : { width: 1440, height: 900, deviceScaleFactor: 1 },
  );
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: outFile, fullPage: true });
  console.log(outFile);
} finally {
  await browser.close();
}
