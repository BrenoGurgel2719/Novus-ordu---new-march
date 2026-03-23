# ✦ Novus Ordo — Premium Corporate HTML Template

> **Premium HTML/CSS/JS template** for consulting firms, financial institutions, law firms, tech companies and any B2B business that needs to communicate authority and credibility at first glance. Dark theme, gold accent palette, advanced animations and fully responsive.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Features](#features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Variants & Pages](#variants--pages)
- [Customization Guide](#customization-guide)
- [Sections Reference](#sections-reference)
- [JavaScript Modules](#javascript-modules)
- [Third-Party Libraries](#third-party-libraries)
- [Browser Support](#browser-support)
- [Performance Notes](#performance-notes)
- [Accessibility](#accessibility)
- [SEO Setup](#seo-setup)
- [FAQ](#faq-template)
- [Changelog](#changelog)
- [License](#license)
- [Support](#support)

---

## Overview

**Novus Ordo** is a high-end corporate template built for B2B businesses that need to look like market leaders. It ships with a fully animated hero, interactive canvas network, isometric 3D platform mockup with parallax, sticky case studies, animated statistics, glassmorphism navbar, a conversion-focused sales variant with VSL player and lead form, and two inner pages (About and Contact) — all in pure HTML/CSS/JS.

Every interaction — from scroll-triggered reveals to the FAQ accordion — was carefully crafted with performance and accessibility in mind.

| | |
|---|---|
| **Template Type** | Multi-page Corporate + Sales Focus Variant |
| **Stack** | HTML5, CSS3, Vanilla JavaScript |
| **Responsive** | ✅ Mobile, Tablet, Desktop |
| **Frameworks** | None — zero dependencies for core layout |
| **Pages included** | `index.html` · `index-sales.html` · `about.html` · `contact.html` |
| **Lines of Code** | ~8,000+ (HTML + CSS + JS across all files) |
| **Last Updated** | March 2026 |

---

## Live Preview

> 🔗 [**Institutional Variant →**](https://brenogurgel2719.github.io/Novus-ordu---new-march/)
> 🔗 [**Sales Focus Variant →**](https://brenogurgel2719.github.io/Novus-ordu---new-march/index-sales.html)

---

## Features

### 🎨 Design
- Premium dark theme (`#000000`) with a refined gold accent palette (`#b38900` / `#ffdb6e`)
- Glassmorphism navbar — floats above content with `backdrop-filter: blur`
- Animated gradient text on the hero headline (CSS `@keyframes shine`)
- Rotating badge carousel in the hero (3 categories, auto-rotates every 3s)
- Decorative radial glow corners on the hero section
- Isometric 3D platform mockup — built entirely in HTML/CSS/SVG, no images needed
- Gold shimmer button effects with hover light sweep
- Sticky case studies with z-index stack reveal on scroll
- About page with team grid, values cards and history timeline
- Contact page with full form, office locations and mini FAQ

### ⚡ Animations
- `Anime.js` scroll-triggered entrance animations for every section
- `Lenis` smooth scrolling with exponential easing
- Canvas network animation in the hero (interactive — reacts to mouse)
- Parallax effect on the isometric mockup (adjusts perspective as you scroll)
- CountUp.js number animation for the metrics section
- CSS-only floating animations on the mockup's info cards
- FAQ accordion with smooth `max-height` + `opacity` transition
- Form submission with loading state and success screen

### 📱 Responsive
- Mobile-first breakpoints: `640px`, `768px`, `900px`, `992px`, `1024px`
- Hamburger menu with animated X transition
- Isometric mockup simplifies at smaller screens (reduced rotation)
- Floating mockup cards hidden on mobile for clean layout

### ♿ Accessibility
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- `aria-label`, `aria-expanded`, `aria-controls`, `aria-hidden`, `role` on all interactive elements
- FAQ accordion uses `aria-expanded` + `hidden` attribute (WCAG 2.1 AA pattern)
- All decorative elements marked `aria-hidden="true"`
- `@media (prefers-reduced-motion: reduce)` — disables all animations for users who prefer it
- Proper heading hierarchy: `h1` → `h2` → `h3`

### 🔍 SEO
- `<title>` and `<meta description>` pre-filled on all pages
- Full Open Graph tags (Facebook, LinkedIn, WhatsApp)
- Twitter Card tags
- `<link rel="canonical">` on all pages
- `lang="en"` set on `<html>`
- Schema.org structured data via JSON-LD (`FinancialService`, `AboutPage`, `ContactPage`)

---

## File Structure

```
novus-ordo/
│
├── index.html              # Page 1 — Institutional Landing Page
├── index-sales.html        # Page 2 — Sales Focus (VSL + Lead Form hero)
├── about.html              # Page 3 — About Us (team, values, timeline)
├── contact.html            # Page 4 — Contact (form, offices, FAQ)
│
├── css/
│   ├── style.css           # Core styles — shared by all pages (~3,400 lines)
│   └── style-sales.css     # Sales variant overrides — hero only (~720 lines)
│                           # Always load AFTER style.css
│
├── script.js               # Core JavaScript — shared by main variants (~500 lines)
│
├── images/
│   ├── financeiro.avif     # ⚠️ AI-generated placeholder — replace before publishing
│   ├── favicon.avif        # ⚠️ AI-generated placeholder (VSL thumbnail) — replace with real video frame
│   ├── apple-touch-icon.png
│   └── og-cover.jpg        # Open Graph cover image (1200×630px recommended)
│
├── fonts/
│   ├── Inter-Italic.woff2
│   └── subset-Inter-Regular.woff2
│
├── README.md
├── CHANGELOG.md
└── LICENSE.txt
```

> **Note:** `about.html` and `contact.html` are self-contained — their CSS and JS are inlined, so they work correctly even if loaded standalone without the external stylesheets.

---

## Getting Started

### 1. No build step required

This template is pure HTML/CSS/JS. Just open `index.html` in a browser or deploy to any static host.

```bash
# Option A — open directly
open index.html

# Option B — local dev server (recommended to avoid CORS on fonts)
npx serve .
# or
python3 -m http.server 3000
```

### 2. Replace placeholder content

Search for these strings in all HTML files and update them:

| Placeholder | Replace with |
|---|---|
| `https://novusordo.com/` | Your actual domain |
| `contact@novusordo.com` | Your contact email |
| `+1 (555) 300-0000` | Your phone number |
| `New York, NY — United States` | Your location |
| `Novus Ordo` | Your company name |
| `Robert Allen`, `Marina Costa`, etc. | Real team names or keep as fictional |

### 3. Replace the placeholder images

> **⚠️ AI-Generated Content:** Two images in this template were created with AI image generation tools and are provided for layout demonstration purposes only. You **must** replace both before publishing any live project.

| File | Used in | Replace with |
|---|---|---|
| `images/financeiro.avif` | Services card (both variants) | Your own licensed photo |
| `images/favicon.avif` | VSL player thumbnail (`index-sales.html`) | A real frame from your video |

Recommended format: **WebP or AVIF**, dimensions **1200×800px** for the services image.

> `about.html` uses Unsplash URLs for team and story photos — replace them with real photos of your team before going live.

### 4. Connect the forms

The contact and lead forms currently simulate submission. To connect to a real backend, replace the button click handler with a `fetch()` call.

**Recommended free services:** [Formspree](https://formspree.io) · [Web3Forms](https://web3forms.com) · [EmailJS](https://emailjs.com)

```js
// Example with Web3Forms (free, no backend needed)
fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: 'YOUR_KEY_HERE',
    name:    document.getElementById('c-name').value,
    email:   document.getElementById('c-email').value,
    message: document.getElementById('c-message').value,
  })
});
```

---

## Variants & Pages

### `index.html` — Institutional
Classic full-page landing page focused on brand credibility. Centered hero with animated canvas, isometric mockup, services grid, metrics, sticky case studies, methodology timeline, FAQ and contact form.

### `index-sales.html` — Sales Focus
Conversion-focused variant. Split 60/40 hero with VSL player (lazy-loaded iframe — no performance cost until clicked), inline lead capture form, urgency counter and trust bar. The rest of the page is identical to the institutional variant.

### `about.html` — About Us
Inner page with:
- Hero with geometric grid background
- Mission / story section with stats row
- 6 values cards with icons
- 4-column team grid with hover effects
- History timeline (5 milestones)
- CTA section linking to Contact

### `contact.html` — Contact
Inner page with:
- Hero
- Split layout: direct contact info + office locations on the left, full form on the right
- Form with 7 fields + success state
- Mini FAQ accordion (5 questions)

**Navigation links** are already updated across all four pages — each page links to all others correctly.

---

## Customization Guide

### Changing Colors

All colors are defined as CSS variables in `:root` inside `style.css`:

```css
:root {
  --gold:        #C9A227;   /* primary accent */
  --gold-light:  #FFD700;   /* lighter gold (hover, highlights) */
  --bg-black:    #000000;   /* page background */
  --bg-dark:     #0a0a0a;   /* section backgrounds */
  --card-bg:     #111111;   /* card backgrounds */
  --text-white:  #ffffff;
  --text-light:  #cccccc;
  --text-muted:  #888888;
}
```

To change the accent color, update `--gold` and `--gold-light`. All animations, borders, glows and highlights will update automatically.

### Changing Fonts

Fonts are loaded via Google Fonts in `<head>`. To switch:

1. Replace the Google Fonts URL with your chosen font
2. Update `--font-main` in `:root` inside `style.css`

### Adding Sections

Each section follows the same pattern:
```html
<section class="your-section" id="your-id" aria-labelledby="your-title">
  <div class="container">
    <span class="eyebrow">LABEL</span>
    <h2 id="your-title">Title <span class="gold-text">here</span></h2>
    <!-- content -->
  </div>
</section>
```

Add a `reveal-up` class to any element to have it animate in on scroll.

### Adding Team Members (`about.html`)

Copy a `.team-card` block and update the photo `src`, name, role and bio. The grid is `repeat(4, 1fr)` — if you add a 5th member, change it to `repeat(3, 1fr)` or keep at 4 and it will wrap.

---

## Sections Reference

| Section | ID | File |
|---|---|---|
| Hero (Institutional) | `hero` | `index.html` |
| Hero (Sales Focus) | `hero-sales` | `index-sales.html` |
| Novus Concept | `#novus-concept` | Both main variants |
| Services | `#services` | Both main variants |
| Metrics / Stats | `#metrics` | Both main variants |
| Case Studies | `#cases` | Both main variants |
| Methodology | `#methodology` | Both main variants |
| CTA + Contact Form | `#contact-cta` | Both main variants |
| Footer | `#contact` | All pages |
| About: Mission | *(in page)* | `about.html` |
| About: Values | *(in page)* | `about.html` |
| About: Team | *(in page)* | `about.html` |
| About: Timeline | *(in page)* | `about.html` |
| Contact: Form | *(in page)* | `contact.html` |
| Contact: Offices | *(in page)* | `contact.html` |
| Contact: FAQ | *(in page)* | `contact.html` |

---

## JavaScript Modules

| Function | Purpose | Notes |
|---|---|---|
| `initNavbar()` | Scroll behavior + mobile menu | Hides on scroll-down, shows on scroll-up. Mobile hamburger toggle. Active link tracking via `IntersectionObserver`. |
| `initMockup()` | 3D entrance + parallax | Animates the isometric screen from flat to angled on scroll entry. Adjusts perspective during page scroll. |
| `initFaq()` | FAQ accordion | Accessible expand/collapse with `aria-expanded`. One-open-at-a-time logic. |
| `initForm()` | CTA form submission | Validates required fields, shows loading state, fades to success screen. Replace `setTimeout` with real `fetch`. |
| `initBadgeRotation()` | Hero badge carousel | Rotates between 3 category labels every 3 seconds with CSS transitions. |
| `initCanvas()` + `draw()` | Hero network animation | Animated particle network. Mouse interaction draws lines to nearby dots. |
| `animateNumber()` | CountUp integration | Triggers number animation via CountUp.js. Called once per stat card. |
| Anime.js observers | Section entrance animations | `IntersectionObserver` triggers `anime.js` timelines when sections enter the viewport. |

> `about.html` and `contact.html` have their scroll reveal and accordion logic inlined — they do not depend on `script.js`.

---

## Third-Party Libraries

| Library | Version | Purpose | CDN |
|---|---|---|---|
| [Lenis](https://github.com/darkroomengineering/lenis) | 1.1.18 | Smooth scroll | `unpkg.com` |
| [Anime.js](https://animejs.com) | 3.2.1 | Scroll animations | `cdnjs.cloudflare.com` |
| [CountUp.js](https://inorganik.github.io/countUp.js/) | 2.8.0 | Number animations | `cdn.jsdelivr.net` |
| [Font Awesome](https://fontawesome.com) | 6.5.0 | Icons | `cdnjs.cloudflare.com` |
| [Montserrat](https://fonts.google.com/specimen/Montserrat) | — | Display font | Google Fonts |
| [Inter](https://fonts.google.com/specimen/Inter) | — | Body font | Self-hosted (woff2) |

All libraries are loaded via CDN. For production, consider self-hosting for better offline reliability.

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full (`-webkit-` prefixes included) |
| Edge 90+ | ✅ Full |
| Opera 76+ | ✅ Full |
| IE 11 | ❌ Not supported (`CSS variables`, `backdrop-filter`, `clamp()`) |

> `backdrop-filter` (glassmorphism) requires enabling a flag in some older Firefox versions. The navbar and cards will still render correctly — just without the blur effect.

---

## Performance Notes

- The canvas animation uses `requestAnimationFrame` with O(n²) complexity for point connections. With `POINT_COUNT = 80`, this is ~3,160 connection checks per frame. On mobile, consider reducing to `50`.
- All images use `loading="lazy"` to defer off-screen loading.
- Fonts use `font-display: swap` to prevent invisible text during load.
- The `resize` event on the canvas is throttled with a 150ms debounce.
- All scroll listeners use `{ passive: true }` to avoid blocking the main thread.
- `will-change: transform, opacity` is applied only to animated elements to trigger GPU compositing.
- `about.html` and `contact.html` load Unsplash photos by URL — replace them with locally optimized images (WebP/AVIF) for best performance.

### Measured PageSpeed Scores

Scores measured on GitHub Pages with full animations enabled:

| Page | Device | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| `index-sales.html` | Desktop | **99** ✅ | 93 | 96 | 100 |
| `index-sales.html` | Mobile | **93** ✅ | 100 | 96 | 100 |

> Scores on your own hosting may vary based on server response time (TTFB), CDN and image optimization.

---

## Accessibility

This template was built following **WCAG 2.1 AA** guidelines:

- All interactive elements are keyboard-navigable
- Focus states are visible
- Color contrast meets AA ratio for body text
- The FAQ accordion follows the [ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- The canvas is marked `aria-hidden="true"` (decorative)
- The hero badge carousel uses `role="marquee"` and `aria-label`
- `prefers-reduced-motion` media query disables all animations for users who prefer less motion

---

## SEO Setup

Before going live, update the following in all HTML files:

```html
<!-- 1. Title -->
<title>Your Company Name — Your Tagline</title>

<!-- 2. Meta description (150–160 chars) -->
<meta name="description" content="Your description here.">

<!-- 3. Canonical URL -->
<link rel="canonical" href="https://yourdomain.com/">

<!-- 4. Open Graph -->
<meta property="og:url"   content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/images/og-cover.jpg">

<!-- 5. Schema.org — update the JSON-LD block -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yourdomain.com"
}
</script>
```

For the OG image (`og-cover.jpg`), recommended size is **1200×630px**.

---

## FAQ (Template)

**Q: What is the difference between `index.html` and `index-sales.html`?**
`index.html` is the Institutional variant — a classic landing page focused on brand credibility. `index-sales.html` is the Sales Focus variant, which replaces the hero with a VSL player and an inline lead capture form for direct conversion. The rest of the page (Services, Metrics, Cases, etc.) is identical in both.

**Q: What businesses can use this template?**
Any B2B business that needs to communicate authority and credibility: consulting firms, investment banks, law firms, financial advisors, corporate tech companies, holding groups, private equity firms, accounting firms and similar. Replace the copy and imagery — the structure works for any high-trust vertical.

**Q: Can I use this template for a client project?**
Yes. Under the Regular License, you may use this for one end product (your own or one client's). For multiple client projects, purchase an Extended License.

**Q: Can I remove the "Novus Ordo" branding?**
Yes. All branding is in the HTML. Find and replace `Novus Ordo` with your company name across all four HTML files.

**Q: Do `about.html` and `contact.html` depend on `style.css`?**
The navbar and footer in those pages use classes from `style.css`. The page-specific sections (hero, content, form) have all their CSS inlined in the `<style>` block — they are self-contained and work independently.

**Q: Does this work with WordPress or Webflow?**
The template is pure HTML/CSS/JS and can be integrated into WordPress as a custom page template. Native Webflow import is not supported, but the code can be adapted.

**Q: How do I add more FAQ items?**
Copy a `.faq-item` block, update the `id` attributes and `aria-controls`/`aria-labelledby` to match. The JS is fully dynamic and handles new items automatically.

**Q: How do I add more service cards?**
Copy a `.service-card` block inside `.services-grid`. The grid is `repeat(3, 1fr)` — a 6th card will wrap naturally. Adjust `grid-template-columns` in `style.css` to change the layout.

---

## Changelog

### v1.2.0 — March 2026
- Added `about.html` — full About Us inner page (hero, mission, values, team grid, history timeline, CTA)
- Added `contact.html` — full Contact inner page (form, offices, mini FAQ)
- Updated navigation on all pages to link to `about.html` and `contact.html`
- Fixed Cloudflare email obfuscation artifacts in footer (replaced with clean email)
- Reveal animations in `about.html` and `contact.html` are self-contained (no dependency on `style.css`)
- Updated file structure to `css/` subfolder pattern

### v1.1.0 — March 2026
- Sales Focus variant: `index-sales.html` + `style-sales.css`
- Split hero 60/40 with VSL player, lead form, urgency counter and inline trust bar
- `style-sales.css` as a thin override layer — all sections below the hero unchanged

### v1.0.0 — March 2026
- Initial release
- Hero with canvas network + badge carousel
- Glassmorphism navbar with scroll hide/show + mobile menu
- Novus Concept, Services, Metrics, Cases, Methodology sections
- Isometric 3D platform mockup with parallax scroll
- FAQ accordion (WCAG 2.1 AA compliant)
- CTA split layout with contact form + success state
- Full footer with social links and copyright
- SEO meta tags, Open Graph, Schema.org
- `prefers-reduced-motion` support
- WCAG 2.1 AA accessibility baseline

---

## License

This template is sold under a **Regular License** (single end product) or **Extended License** (multiple end products).

- ✅ Use for one end product — your own project or one client project (Regular)
- ✅ Modify the source code freely
- ✅ Use for commercial purposes
- ❌ Resell or redistribute the template as-is
- ❌ Use for multiple client projects under a single Regular License

For multiple client projects, contact the author for an Extended License.

---

## Support

Having trouble? Here's how to get help:

1. **Read this README fully** — most questions are answered here.
2. **Check the [FAQ section](#faq-template)** above.
3. **Reply to your purchase receipt** — I'll get back to you within 24 hours.

When reaching out, please include:
- Browser and OS version
- Description of the issue
- Screenshot or screen recording if possible

---

<div align="center">

Made with ✦ and a lot of `cubic-bezier`

**[Novus Ordo Template](https://brenogurgel2719.github.io/Novus-ordu---new-march/)** · v1.2.0 · March 2026

</div>