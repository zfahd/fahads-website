/** Tailwind build config. Build with `npm run build:css` (or `npm run watch:css` while editing). */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0e14',
        'ink-2': '#111823',
        paper: '#ecf2f8',
        'paper-dim': '#9fb0c3',
        'paper-faint': '#7a8ca0',
        teal: '#2fd9bc',
        'teal-deep': '#1a8f7c',
        'teal-pale': '#a7f0e0',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
