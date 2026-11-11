# Website Design Recreation

## Workflow

When the user provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Generate** the page in `public/index.html` using Tailwind utility classes. Keep content inline; assets go in `public/assets/`.
2. **Screenshot** the rendered page with `node screenshot.mjs http://localhost:3000 [label] [--mobile]` (saves to `temporary screenshots/`). Run `npm run build:css` first if any Tailwind classes changed. If the page has distinct sections, capture those individually too.
3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
4. **Fix** every mismatch found. Edit the HTML/Tailwind code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when the user says so or when no visible differences remain.

## Technical Defaults

- Tailwind CSS v3 is built locally, not loaded from the CDN. Do not add the CDN script back.
  - Theme (colors, fonts) lives in `tailwind.config.js`; entry file is `src/input.css`.
  - `npm run build:css` → minified `public/assets/styles.css`. Rebuild after adding any new Tailwind class, or it won't apply.
  - `npm run watch:css` rebuilds automatically while editing.
  - Page-specific custom CSS stays in the `<style>` block in `public/index.html`; the built stylesheet loads after it.
- Local preview: `npm run dev` (or `node serve.mjs`) serves `public/` at http://localhost:3000
- Use placeholder images from `https://placehold.co/` when source images aren't provided
- Mobile-first responsive design
- Single `index.html` file unless the user requests otherwise

## Project Structure

- `public/` is the deployable site and the only folder that gets published. Host publish dir = `public`, build command = `npm run build:css`.
  - `index.html`, `assets/` (styles.css, avatar video + poster, og-image, favicons)
- Everything else stays private and must never be moved into `public/`: `2026_Fahad_Shah_Resume.pdf` (contains phone number), `CLAUDE.md`, `src/`, `tailwind.config.js`, `serve.mjs`, `screenshot.mjs`, `package*.json`, `node_modules/`
- The animated avatar is `assets/avatar-stacked.mp4`: colour on the top half, alpha matte on the bottom half, recombined into a canvas by JS in `index.html`. Don't replace it with a plain video or GIF.
- Site address: https://zfahad.netlify.app/ (Netlify site name `zfahad`). It appears in the canonical link, `og:url`, `og:image`, `twitter:image`, `robots.txt` and `sitemap.xml`. To change it everywhere, run `npm run site-url -- https://new-address/`; don't edit those URLs by hand.
- Hosting config is `netlify.toml` at the root: build command, `public` publish folder, cache headers. Update `<lastmod>` in `public/sitemap.xml` when page content changes meaningfully.

## Rules

- Do not add features, sections, or content not present in the reference image
- Match the reference exactly — do not "improve" the design
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px")