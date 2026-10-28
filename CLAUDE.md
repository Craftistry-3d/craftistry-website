# Craftistry website

Static marketing site for **Craftistry**, a 3D printing studio that designs, fabricates, prototypes and manufactures custom lifestyle and gifting products, finished by hand. Plain HTML, CSS and JS. No build step, no framework, no dependencies.

## Run it

Open `index.html` directly, or serve the folder so links and fonts behave as they will in production:

```bash
python3 -m http.server 8000
```

Deploy by uploading the folder as-is to any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Structure

| Path | What |
| --- | --- |
| `index.html` | Home: hero, how we make, categories, occasions, featured work, quote CTA |
| `services.html` | Services, product categories, ordering steps, FAQ |
| `occasions.html` | Birthdays, weddings, sporting events, school projects, corporate gifting (anchors `#birthdays`, `#weddings`, `#sports`, `#school`, `#corporate`) |
| `gallery.html` | All 135 products from the 2026 catalogue, grouped by its 9 categories, with filters and a `<dialog>` lightbox |
| `contact.html` | Quote request form plus direct contact details |
| `css/tokens.css` | Design tokens (colours, type, spacing, radii) and the `@font-face` rules. Generated from the design system's `tokens.json`: change values there first |
| `css/components.css` | Design-system components (`cr-btn`, `cr-card`, `cr-tag`, `cr-cat`, `cr-field`, `cr-promo`), copied from the design system's `bundle.css` |
| `css/site.css` | Page layout. Mobile-first: base styles are for phones, `min-width: 640px` and `960px` add columns |
| `js/icons.js` | The 44-icon Craftistry set as SVG path data |
| `js/main.js` | Icon rendering, mobile nav, gallery filter and lightbox, quote form |
| `assets/logo/` | Logo Kit SVGs and the bulb profile picture (used as the favicon) |
| `assets/fonts/` | League Spartan 400/600/700 woff2 (SIL OFL, licence in `OFL.txt`) |
| `assets/gallery/` | One photo per catalogue product, named from the product name (`cute-crab-pen-holder.jpg`) |

### Conventions

- Header, nav and footer are repeated in all five pages. If you change one, change all five. Mark the current page's nav link with `aria-current="page"`.
- Icons: `<span data-icon="name" data-size="24"></span>`, filled by `js/main.js`. They inherit the text colour. Use only names from `js/icons.js`.
- Use tokens (`var(--brand-yellow)`, `var(--space-4)`, …) and never raw hex values in `site.css`. The one exception is the `.on-dark` block, which holds the design system's dark-theme values for black sections.
- Keep it dependency-free. No CDNs, no frameworks, no build tools.
- The quote form has no backend. On submit it validates and opens a prefilled `mailto:` to the studio email; "Send on WhatsApp" opens `wa.me` with the same text. To use a form service later (Formspree, Netlify Forms), change the submit handler in `js/main.js`. `contact.html?occasion=wedding` preselects the occasion (`birthday`, `wedding`, `sports`, `school`, `corporate`, `get-together`, `other`).
- The gallery mirrors the product catalogue exactly: every product, in catalogue order, with its catalogue name, price and its "Colours" and "Custom" availability. Each category is a `<section class="cat-section" id="…" data-cat="…">` whose key matches a filter button's `data-filter`. The keys are `desk`, `tech`, `clocks`, `sculptures`, `decor`, `coasters`, `knitted`, `toys`, `gifts`. Links like `gallery.html#coasters` open on that category. Category descriptions and the black callout cards use the catalogue's wording. When the catalogue changes, update the gallery to match. Product photos are square-cropped with `object-fit: cover`.
- The "Why 3D prints from Craftistry?" section (home page), the service cards and "Caring for your pieces" (services page) use the wording of page 3 of the catalogue. Keep that wording as written; don't paraphrase it.

## Brand

The source of truth is the **Craftistry Design System** artifact (https://claude.ai/artifact/4xiZD8c7BZdTMnryCmVAcd), with the product range in the **Craftistry Product Catalogue 2026** (https://claude.ai/artifact/9cjc6nnghUHdQcWvBoV8K1). What follows is a summary.

### Business details

- Name: Craftistry. The lowercase `craftistry` wordmark belongs only to the logo; in text, write "Craftistry".
- Phone and WhatsApp: +91 81430 13030
- Email: info.craftistry@gmail.com
- Instagram: @craftistry.3d
- Prices are per piece in Indian rupees (₹) and include 18% GST. There's no minimum order. Lead time depends on the product and quantity. Photos are for reference; printed colours may vary.
- Material: plant-based PLA, made from renewable crops like corn and sugarcane. PLA softens above about 55°C. Pieces are not meant for food unless stated.
- Catalogue: 135 products in 9 categories (desk organisers & office, phone, gaming & tech stands, clocks & calendars, sculptures & display pieces, home decor & planters, coasters, knitted figurines, fidgets, toys & games, keychains & mini gifts).
- Product categories: art, educational, fashion, hobbies/DIY, household, miniatures, props & cosplay, trophies, tools, toys, games, gifting.
- Occasions ("curated buckets"): birthdays, weddings, sporting events, school projects, get-togethers, corporate gifting, one-off ideas.

### Personality

> It's premium, but not pretentious.
> It's creative, but not chaotic.
> It's authentic, warm, and built with heart.

Curious (open, asymmetrical layouts), playful (rounded shapes, one playful move per view), authentic (warm paper tones, real product photos), premium (clean type, generous whitespace), creative (print-layer lines next to crisp type).

### Voice

- Warm, enthusiastic and personal. Use "we" for Craftistry and "you" for the reader.
- Recurring phrases: *bring to life*, *premium quality with finesse*, *the sky is the limit*, *tell us your idea*, *we love to curate buckets for you!*
- Make-verbs: design, fabricate, prototype, manufacture, curate.
- Use sentence case for headings and buttons, and start buttons with a verb ("Get a quote", "Tell us your idea"). Avoid "Click here" and "Submit".
- At most one exclamation mark per short paragraph, never "!!". No emoji in brand copy.
- Sign-off: "With love & gratitude, Craftistry".
- Never invent stats, testimonials, prices or materials. Use a visible placeholder like `[PRICE]` instead.

### Colour

Brand colours are **yellow and black**.

| Token | Value | Use |
| --- | --- | --- |
| `brand-yellow` | `#f6b900` (dark grounds `#f5bf32`) | Big fills: hero panels, primary buttons, highlight blocks, the frame |
| `on-yellow` / `ink` | `#000000` | Text on yellow; body text |
| `ink-muted` | `#555555` | Secondary text |
| `surface` | `#ffffff` | Page background |
| `surface-alt` | `#f7f3ea` | Warm paper for cards and panels |
| `frame` | `#000000` (yellow on black) | 3px logo-frame outlines |
| `hairline` | `#e2dccf` | Dividers only |
| `danger` | `#b3261e` | Form errors, always paired with a word and the `info` icon |

Marketing accents, at most one per view: `magenta #ff2e88`, `cyan #00c2ff`, `violet #7b2cff`, `violet-deep #4a14b8`, `violet-100 #efe6ff`, `yellow-100 #fff3cc`.

Rules:

- Text on yellow is always black. Never white on yellow.
- Never use yellow, magenta or cyan as text or thin lines on white; it fails contrast.
- On colour grounds use black text on magenta, cyan and yellow, and white text on violet. Yellow on violet only for bold headlines of 24px or more.
- No gradients. No soft drop shadows. The one exception is buttons, which lift on hover with a hard 3px offset in `frame`.
- Focus ring: 2px solid `focus`, 2px offset, on every interactive element.

### Type

League Spartan for everything: Bold 700 for headings, SemiBold 600 for emphasis and buttons, Regular 400 for body. Display 64/60, h1 40/44, h2 28/32, h3 20/24, body 16/24, small 14/20. The label style is 12/16 bold, uppercase with 0.08em tracking, and is for eyebrows and tags only.

### Shape and space

- Radii: `radius-sm` 4px (tags), `radius-md` 8px (buttons, inputs), `radius-lg` 20px (cards, image tiles), `radius-pill`. No sharp corners.
- Spacing steps: 4, 8, 16, 24, 40, 72px. Card padding 16 to 24, gaps between cards 24, gaps between sections 72 on desktop.
- The signature container is the logo frame: a panel with a 3px `frame` outline.
- Compose asymmetrically: stagger cards, and let a yellow block bleed off the edge.

### Logo

- Use the Logo Kit files only. Use `craftistry-logo-primary.svg` (yellow badge, black wordmark) on light grounds and colour, and `craftistry-logo-dark.svg` (white wordmark, unframed) on black.
- Minimum width is 160px on screen. Keep about 1/11 of the logo's width clear on every side.
- Never retype, recolour, stretch, outline or add effects. The bulb on its own is only for the profile picture or favicon.

### Icons

Use only the Craftistry set: 24px grid, 2px rounded stroke. Its families are Interface, Making (idea, design, printer, layers, prototype, spool, manufacture, sparkle), Categories and Occasions (birthday, wedding, sports, school, party, corporate). Feature category and occasion icons in a yellow disc with a black stroke. Never mix in icons from another set.
