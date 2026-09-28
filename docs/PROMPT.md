# 00550.com — Research, Website Idea & Phase-Wise Build Prompt

## 1. Research: what "00550" means

| Lens | Finding | Implication |
|---|---|---|
| Formal reading | 零零五五零, líng líng wǔ wǔ líng (Cantonese: ling4 ling4 ng5 ng5 ling4) | Easy to say and type across every Chinese dialect |
| Digit 0 (零) | Sounds like 良 (liáng, "good"). Stands for wholeness and a fresh start. In texting slang, 0 = 你 (you), as in 520 = 我爱你 | Neutral to positive |
| Digit 5 (五) | Five Elements (五行), Five Blessings (五福), imperial symbolism. Mandarin: sounds like 我/吾 (me). Cantonese: sounds like 唔 ("not") | Positive in Mandarin, ambiguous in Cantonese |
| Pair 55 | 呜呜, the sound of crying in internet slang (555 = boo-hoo) | A weak point. Handle it openly; don't hide it |
| Pair 00 | Seen as a full circle, completeness | Mild positive |
| **Slang reading** | **你你我我你, "you, you, me, me, you"** (same logic as 04551 = 你是我唯一) | **Brand hook: a "you & me" number** |
| Stock codes | HKEX **00550** and SZSE **000550** are assigned to listed companies | Trademark exposure. The site uses the number descriptively with a non-affiliation disclosure |
| Domain market | Chinese-speaking investors actively trade numeric .coms; 55.com sold for about $2.3M (2011); leading zeros are valued below 8s; having no 4 is a plus | The domain also has resale or leasing value |

**Position:** 00550 is a middling number by traditional standards (no 8 or 6, and "55" can read as crying). Its strengths are that it's a pure number, has no 4, and carries the "you & me" slang story. Don't build a lottery, gambling or stock-tips site on it: those niches run into AdSense policy problems and the trademark overlap with the stock code. Build a site where **numbers are the product**.

## 2. Website idea: "00550: Decode any number the Chinese way"

A tools-first **Chinese number-meaning hub**: a number decoder (phone numbers, plates, prices, dates, addresses, domains), a slang dictionary, a zodiac and Five Elements calculator, a lucky-date finder, guides and videos. On top sits a **B2B lead engine**: a free "Number & Name Audit" for brands selling to Chinese-speaking markets, plus leads for lucky-number sourcing (phone numbers, plates, domains).

Revenue streams: AdSense, sponsorships, lead generation (audits, sourcing), and donations/memberships. Leads are the main revenue driver and AdSense adds a smaller amount on top.

## 3. Competitor survey (26 sites visited)
chinahighlights, travelchinaguide, yourchineseastrology, chinesenewyear.net, sixthtone, astrology.com, horoscope.com, cafeastrology, numerology.com, worldnumerology, astro-seek, redlotusletter, omnicalculator, calculator.net, mdbg, yellowbridge, pleco, contextualchinese, lingoace, thechairmansbao, digmandarin, ninchanese, migaku, hsklord, buymeacoffee and gleam.io.

Patterns adopted: the tool as lead magnet; a free answer, then a personalised report that requires an email; a structured template for each number page; FAQ schema; calls to action after the intro, mid-page and at the end; preset donation amounts with a supporter wall; contest bonus entries and visible rules; ads never placed between a tool's input and its result; no fake testimonials.

---

## 4. Phase-wise build prompt

### PHASE 0: Global rules (prepend to every phase)
```
You are building 00550.com, a static, GitHub-Pages-compatible website (HTML/CSS/vanilla JS + Jekyll layouts,
no server, no paid services). Brand: "00550 — Decode any number the Chinese way". Positioning: 0 = 你 (you),
5 = 我 (me) → 00550 = 你你我我你 "you & me".
Hard requirements on EVERY page:
1. A top bar above the header with the text "Contact, if you are interested in this website / domain name /
   Sponsorship / Advertisement / Partnership", linked to https://web.works/contact.
2. The only contact email is [OWNER EMAIL — kept private]. It must NEVER appear in plain text in any HTML, JS,
   CSS, sitemap, README or repo file. Store it obfuscated (char codes shifted +7 and reversed) in
   assets/js/config.js and assemble it at runtime only: (a) as the FormSubmit AJAX endpoint for all forms,
   (b) for mailto links triggered by clicking elements with a data-mail attribute.
3. Responsive from 360px up, dark/light mode, accessible (WCAG AA), no horizontal scroll, reduced motion respected.
4. Relative links only (works under /00550-com/ on github.io and at the root of 00550.com).
5. No trademarks or logos of others. Use "00550" only descriptively. Include a trademark/copyright/
   non-affiliation disclosure page and a footer disclosure line.
6. Original content only. No fabricated testimonials, statistics or winners.
```

### PHASE 1: Foundation & design system
```
Jekyll on GitHub Pages: _config.yml (url, jekyll-sitemap), _layouts/default.html (SEO head, canonical,
OG/Twitter, JSON-LD WebSite+Organization+Breadcrumb+page schema, top banner, sticky header, burger menu,
footer with newsletter, lead-magnet modal, cookie consent, floating Support button).
assets/css/style.css tokens: ink #16131a, paper #fbf7f0, cinnabar #c8102e, gold #e8a317, jade #12806a;
fonts Inter + Space Grotesk. Also: manifest.webmanifest, sw.js (offline), robots.txt, ads.txt, 404 page.
```

### PHASE 2: Data & interactive tools
```
data.js: digits 0–9 (hanzi, pinyin, Cantonese, weight, sound-alikes, meaning), notable pairs, 25+ slang
codes, 12 zodiac animals with lucky numbers/colours, stems/elements, zodiac relationships, special dates.
tools.js: Number Decoder (general/phone/plate/price/date/address/domain; score, grade, readings, phrases,
pairs, runs, share, permalink, ad below result), Zodiac & Element (Intl zh-u-ca-chinese lunar year),
compatibility, Lucky Date Finder (Ghost Month aware), Name Number, dictionary search/filter, number of the day.
```

### PHASE 3: Pages & SEO content
```
index, decoder, zodiac, lucky-dates, dictionary, meanings, videos, services (lead gen), support
(donate/sponsor/careers), contests, about, contact, cheatsheet (email-gated), privacy, terms, disclaimer, 404.
Guides hub + pillar articles (00550 meaning, business numbers, 520/1314, Five Elements) with Article schema.
```

### PHASE 4: Lead generation
```
Dedicated services page with 4 tiers and a 3-step qualifying form (service → company/market/timeline/budget/
items → contact + consent). A lead box on the home page, CTAs after every tool result, a sidebar CTA on each
page, and an exit-intent cheat-sheet modal (once per session). Honeypot, validation, FormSubmit AJAX, mailto
fallback, GA4 generate_lead event.
```

### PHASE 5: Monetisation
```
AdSense slots (header/inContent/sidebar/footer) loaded after consent, with labelled house ads until configured.
YouTube click-to-load facade from config. Red-envelope donations ($1.68/$5.20/$8.88/…), frequency,
allocation (operations, promotions, hiring, prizes), supporter wall opt-in, PayPal/BMC/Ko-fi/Stripe/
Patreon/GitHub Sponsors buttons when configured, otherwise a pledge form. Sponsorship tiers + inquiry form;
careers + application form.
```

### PHASE 6: Contests & community
```
Live 5·20 "You & Me" contest with countdown, prize structure, bonus entries (newsletter/YouTube/share/
referrals), upcoming contests, winners' hall and official rules (no purchase necessary).
```

### PHASE 7: QA, deploy & growth
```
Playwright at 1366/390px (no errors, no overflow), tool outputs, mocked form posts, grep proving the email
is absent. Deploy: Settings → Pages → Deploy from branch main /(root). Custom domain + DNS A records
185.199.108–111.153. Growth: zh-Hans/zh-Hant versions, one page per number (/number/520), yearly zodiac pages,
embeddable decoder widget, YouTube Shorts per slang code, email nurture for audit leads.
```
