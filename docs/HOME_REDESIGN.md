# Home redesign (CodeCrest)

- Rename/re-brand: `src/constants/site.js` (name, short logo letters, tagline, email).
- Colours: `src/styles/variables.css` (deep teal `--brand`, amber `--accent`, warm paper background, light + dark).
- Carousel slides/text: `SLIDES` in `src/features/home/data/home.data.js` (4 slides; autoplay 6s, pauses on hover/focus, arrow keys, dots).
- Practice cards (bento), topic tiles, steps, CTA band, footer: edit `PRACTICE_CARDS`, `TOPICS`, `STEPS`, `STATS` in the same data file; footer links in `components/layout/Footer/Footer.jsx`.
- Footer links to /about, /contact, /privacy, /terms currently show the placeholder page.
