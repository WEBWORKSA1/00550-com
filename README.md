# 00550.com — Decode any number the Chinese way

Static, GitHub-Pages-native website (Jekyll, free plan): Chinese number decoder, number-slang dictionary, zodiac & Five Elements calculator, lucky-date finder, guides, videos, contests, donations, sponsorship and a dedicated lead-generation funnel.

## Structure
- `_layouts/default.html` — shared head (SEO, OG, JSON-LD), top contact banner, header, footer, lead-magnet modal, cookie consent.
- `*.html`, `guides/*.html` — pages (front matter: `title`, `desc`, `nav`, `crumb`, `schema`, `nopopup`, `r` for sub-folders).
- `assets/js/config.js` — **switches**: AdSense IDs, donation links, YouTube videos, GA4.
- `assets/js/data.js` — reference data (digits, slang, zodiac, elements).
- `assets/js/tools.js` / `app.js` — tools and site behaviour (forms, ads, consent, modals, countdowns).
- `docs/PROMPT.md` — research, strategy and the phase-wise build prompt.
- `sitemap.xml` is generated automatically by `jekyll-sitemap`.

## Publish (GitHub Pages, free)
Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch **main** / **(root)** → Save.
Live at `https://webworksa1.github.io/00550-com/` within ~1 minute.

## Owner setup
1. **Forms** use FormSubmit (free). The first submission sends a one-time activation email to the owner inbox — click *Activate*.
   The owner address is never stored in plain text; it is assembled at runtime from `config.js`.
2. **AdSense**: put your `ca-pub-…` and slot IDs in `config.js`; uncomment the line in `ads.txt`.
3. **Donations**: add PayPal / Buy Me a Coffee / Ko-fi / Stripe / Patreon links in `config.js` (otherwise a pledge form is used).
4. **YouTube**: add channel URL + video IDs in `config.js`.
5. **Custom domain 00550.com**: Settings → Pages → Custom domain `00550.com`, then DNS:
   A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME → `webworksa1.github.io`. Enable *Enforce HTTPS*.

## Legal
Independent site; not affiliated with any company, brand or stock listing using the number 00550. See `disclaimer.html`.
© 2026 00550.com. All rights reserved.

Interested in this website / domain / sponsorship / partnership? → https://web.works/contact
