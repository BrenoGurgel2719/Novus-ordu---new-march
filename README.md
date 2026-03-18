# ✦ Novus Ordo — Investment Banking Landing Page Template

> **Premium HTML/CSS/JS template** for investment banks, financial institutions and corporate finance companies. Dark theme, gold accent palette, advanced animations and fully responsive.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Features](#features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Variants](#variants)
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

**Novus Ordo** is a high-end landing page template built for the financial sector. It ships with a fully animated hero, interactive canvas network, isometric 3D platform mockup with parallax, sticky case studies section, animated statistics, glassmorphism navbar, and a conversion-focused CTA with a contact form.

Every interaction — from the scroll-triggered reveals to the FAQ accordion — was carefully crafted with performance and accessibility in mind.

| | |
|---|---|
| **Template Type** | Single-page Landing Page + Sales Focus Variant |
| **Stack** | HTML5, CSS3, Vanilla JavaScript |
| **Responsive** | ✅ Mobile, Tablet, Desktop |
| **Frameworks** | None — zero dependencies for core layout |
| **Variants included** | `index.html` (Institutional) · `index-sales.html` (Sales Focus / VSL) |
| **Lines of Code** | ~6,000+ (HTML + CSS + JS across all files) |
| **Last Updated** | March 2026 |

---

## Live Preview

> 🔗 [**View Live Demo →**](https://brenogurgel2719.github.io/Novus-ordu---new-march/)

---

## Features

### 🎨 Design
- Premium dark theme (`#000000`) with a refined gold accent palette (`#b38900` / `#ffdb6e`)
- Glassmorphism navbar — floats above content with `backdrop-filter: blur`
- Animated gradient text on the hero headline (CSS `@keyframes shine`)
- Rotating badge carousel in the hero (3 categories, auto-rotates every 3s)
- Decorative radial glow corners on the hero section
- Isometric 3D platform mockup — built entirely in HTML/CSS/SVG, no images
- Gold shimmer button effects with hover light sweep
- Sticky case studies with z-index stack reveal on scroll

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
- `<title>` and `<meta description>` pre-filled
- Full Open Graph tags (Facebook, LinkedIn, WhatsApp)
- Twitter Card tags
- `<link rel="canonical">`
- `lang="pt-BR"` set on `<html>`
- Schema.org structured data (`FinancialService`) via JSON-LD

---

## File Structure

```
novus-ordo/
│
├── index.html              # Variant 1 — Institutional Landing Page
├── index-sales.html        # Variant 2 — Sales Focus (VSL + Lead Form hero)
│
├── style.css               # Core styles — shared by both variants (~3,400 lines)
├── style-sales.css         # Sales variant overrides — hero only (~720 lines)
│                           # Always load AFTER style.css
├── script.js               # Core JavaScript — shared by both variants (~500 lines)
│
├── images/                # Images folder
│   ├── financeiro.png      # ⚠️ AI-generated placeholder — replace with your own licensed image
│   ├── favicon.png   # ⚠️ AI-generated placeholder (Sales variant VSL) — replace with a real video frame
│   ├── favicon.svg         # Site favicon (replace with yours)
│   ├── apple-touch-icon.png
│   └── og-cover.jpg        # Open Graph cover image (1200×630px recommended)
│
└── fonts/                 # Self-hosted fonts
    ├── Inter-Italic.woff2
    └── subset-Inter-Regular.woff2
```

> **Note:** `style-sales.css` only overrides the hero section. All other sections (Services, Metrics, Cases, etc.) are inherited from `style.css` — fixes and customizations in `style.css` apply automatically to both variants.

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

Search for these strings in `index.html` and update them:

| Placeholder | Replace with |
|---|---|
| `https://novusordo.com.br/` | Your actual domain |
| `contato@novusordo.com.br` | Your contact email |
| `+1 (555) 300-0000` | Your phone number |
| `New York, NY — United States` | Your location |
| `https://novusordo.com.br/imagens/og-cover.jpg` | Your OG image URL |
| `Roberto Alencar`, `Mariana Costa`, etc. | Real client testimonials or keep as fictional |

### 3. Replace the placeholder images

> **⚠️ AI-Generated Content:** Two images in this template were created with AI image generation tools and are provided for layout demonstration purposes only. You **must** replace both before publishing any live project.

| File | Used in | Replace with |
|---|---|---|
| `images/financeiro.png` | Services card (both variants) | Your own licensed photo |
| `images/favicon.png` | VSL player thumbnail (`index-sales.html`) | A real frame from your video |

Replace `images/financeiro.png` with your own photo. Recommended: **1200×800px**, `.webp` format for best performance. Update the `src` attribute in the featured service card:

```html
<img src="images/sua-imagem.webp" alt="Image description" loading="lazy">
```

### 4. Connect the form

The contact form currently simulates submission. To connect it to a real backend, replace the `setTimeout` in `script.js` inside `initForm()`:

```js
// Find this block in script.js (inside initForm):
// Simula envio — substituir por fetch() real
setTimeout(() => { ... }, 1800);

// Replace with a real fetch:
fetch('https://sua-api.com/contato', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name:    document.getElementById('cta-name').value,
    email:   document.getElementById('cta-email').value,
    empresa: document.getElementById('cta-empresa').value,
    cargo:   document.getElementById('cta-cargo').value,
    servico: document.getElementById('cta-servico').value,
    mensagem: document.getElementById('cta-mensagem').value,
  })
})
.then(res => res.json())
.then(() => { /* show success */ })
.catch(err => { /* handle error */ });
```

Popular free options for form handling: [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com), [EmailJS](https://emailjs.com).

---

## Variants

This template ships with **two ready-to-use variants** that share the same core CSS and JS. You only need to maintain `style.css` and `script.js` — both pages inherit every update automatically.

### Variant 1 — Institutional (`index.html`)

The default. Designed to build brand credibility for banks, funds and financial firms. Full-screen animated hero, centered headline, single CTA button. Best for audiences that research before committing.

### Variant 2 — Sales Focus (`index-sales.html`)

Designed to **capture leads directly on the first screen**. Replaces the hero with a split layout:

- **Left column:** conversion-focused headline, social proof bar (AUM, IPOs, NPS), and a VSL (Video Sales Letter) player with lazy-loaded iframe, pulsing play button and duration badge.
- **Right column:** sticky lead capture form with 5 fields, urgency counter ("3 spots available this week"), and a success state that redirects attention back to the video.

**To activate the VSL player**, find `VIDEO_ID` in `index-sales.html` and replace it with your real YouTube or Vimeo ID:

```html
<!-- YouTube -->
data-src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0&modestbranding=1"

<!-- Vimeo -->
data-src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1"
```

Also replace the thumbnail `<img>` (`images/favicon.png`) with an actual frame from your video. The current thumbnail is an **AI-generated placeholder** — using a real video frame significantly improves click-through rates on the play button.

**To connect the lead form**, find the comment `// Connect to your CRM / webhook here.` in `script.js` and replace the `setTimeout` with a real `fetch()` to your endpoint (same pattern as the main form — see [Connect the form](#3-connect-the-form) above).

| | Institutional | Sales Focus |
|---|---|---|
| **File** | `index.html` | `index-sales.html` |
| **Extra stylesheet** | — | `style-sales.css` (load after `style.css`) |
| Hero type | Centered copy + single CTA | Split 60/40 — VSL + Lead Form |
| Primary goal | Brand awareness / credibility | Lead generation / direct conversion |
| First CTA | Scroll to learn more | Fill form → schedule meeting |
| Topbar urgency strip | ❌ | ✅ Fixed, gold-tinted |
| VSL player | ❌ | ✅ Lazy-loaded iframe (YouTube / Vimeo) |
| Social proof trust bar | ❌ | ✅ AUM, IPOs, NPS inline below headline |
| Inline lead capture form | ❌ | ✅ 5 fields + revenue qualifier |
| Urgency slot counter | ❌ | ✅ JS-driven, decrements in real time |
| Form success → video CTA | ❌ | ✅ |
| Services, Metrics, Cases… | ✅ Full | ✅ Identical |
| Footer | ✅ | ✅ Identical |

> **Which one to use?** Use `index.html` for long-term brand presence and organic/SEO traffic. Use `index-sales.html` when running paid campaigns (Google Ads, LinkedIn Ads, Meta) where capturing the lead before they leave is the priority.

---

## Customization Guide

### Changing Colors

All colors are defined via CSS custom properties in `:root`. Edit `style.css`:

```css
:root {
  --gold:         #b38900;  /* Primary accent — change to your brand color */
  --gold-light:   #ffdb6e;  /* Light accent for gradients */
  --glass:        rgba(255, 255, 255, 0.06);
  --stroke:       rgba(255, 255, 255, 0.14);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted:   #888888;
  --bg:           #000000;  /* Page background */
}
```

> **Tip:** To adapt to a blue/navy palette, change `--gold` to your primary color and `--bg` to `#050a14`. All glow effects, borders and button gradients will update automatically.

### Changing Fonts

Fonts are declared at the top of `style.css`. Three fonts are used:

| Font | Used for | Source |
|---|---|---|
| `Montserrat` | Headings, labels, UI | Google Fonts (CDN) |
| `Inter` | Body text, forms, small labels | Self-hosted (`/fontes/`) |
| `Outfit Variable` | Numbers / metrics | CDN (jsdelivr) |

To replace Montserrat with another Google Font:

```css
/* In style.css, top of file — replace the @import */
@import url('https://fonts.googleapis.com/css2?family=YOUR+FONT:wght@400;700;900&display=swap');

/* Then find/replace 'Montserrat' with 'Your Font' throughout style.css */
```

### Changing the Navbar Logo

The logo is pure HTML/CSS — no image needed:

```html
<!-- In index.html, find .nav-logo -->
<a href="#" class="nav-logo">
  <span class="logo-mark">✦</span>        <!-- Change or remove the icon -->
  <span class="logo-text">Novus <strong>Ordo</strong></span>  <!-- Change text here -->
</a>
```

To use an `<img>` logo instead:

```html
<a href="#" class="nav-logo">
  <img src="imagen/logo.svg" alt="Company`s name" height="32">
</a>
```

### Adjusting the Canvas Network

In `script.js`, find the canvas constants at the top of the canvas section:

```js
const POINT_COUNT    = 80;   // Number of dots — reduce for better mobile performance
const CONNECTION_DIST = 160; // Max distance to draw a line between dots
const MOUSE_DIST     = 200;  // Radius of mouse interaction
```

To change the dot/line color, find `colorGold = "179, 137, 0"` and replace with any RGB values.

### Adjusting the Isometric Mockup

The mockup's 3D angle is controlled in `script.js` inside `initMockup()`:

```js
// Base angle (after entrance animation):
wrapper.style.transform = 'perspective(1400px) rotateX(18deg) rotateZ(-4deg) scale(0.95)';

// Parallax range:
const rotX  = 18 - clamped * 4;  // oscillates between 14° and 22°
const rotZ  = -4 + clamped * 2;  // oscillates between -6° and -2°
```

Increase `rotateX` for a more dramatic top-down angle. Decrease for a more frontal view.

---

## Sections Reference

| # | Section | ID | Class |
|---|---|---|---|
| 1 | Hero | — | `.hero` |
| 2 | Novus Concept | `#novus-concept` | `.novus-concept` |
| 3 | Services | `#services` | `.services-section` |
| 4 | Metrics / Stats | `#metrics` | `.results-stats` |
| 5 | Case Studies | `#cases` | `.cases-section` |
| 6 | Methodology | `#methodology` | `.methodology-section` |
| 7 | Platform Mockup | `#platform` | `.mockup-section` |
| 8 | FAQ | `#faq` | `.faq-section` |
| 9 | CTA / Contact | `#cta` | `.cta-section` |
| — | Footer | `#contact` | `.site-footer` |

All section IDs are referenced by the navbar links. If you rename a section ID, update the corresponding `<a href="#...">` in the navbar and footer.

---

## JavaScript Modules

All JS is in `script.js` and organized into self-contained IIFEs (Immediately Invoked Function Expressions). Each module is independent and safe to remove if you don't need it.

| Module | Function | Description |
|---|---|---|
| `initNavbar()` | Scroll behavior + mobile menu | Hides on scroll-down, shows on scroll-up. Mobile hamburger toggle. Active link tracking via `IntersectionObserver`. |
| `initMockup()` | 3D entrance + parallax | Animates the isometric screen from flat to angled on scroll entry. Adjusts perspective during page scroll. |
| `initFaq()` | FAQ accordion | Accessible expand/collapse with `aria-expanded` and `hidden`. One-open-at-a-time logic. |
| `initForm()` | CTA form submission | Validates required fields, shows loading state, fades to success screen. Replace `setTimeout` with real `fetch`. |
| `initBadgeRotation()` | Hero badge carousel | Rotates between 3 category labels every 3 seconds with CSS transitions. |
| `initCanvas()` + `draw()` | Hero network animation | Animated particle network. Mouse interaction draws lines to nearby dots. |
| `animateNumber()` | CountUp integration | Triggers number animation via CountUp.js. Called once per stat card. |
| Anime.js observers | Section entrance animations | `IntersectionObserver` triggers `anime.js` timelines when sections enter the viewport. |

---

## Third-Party Libraries

| Library | Version | Purpose | CDN |
|---|---|---|---|
| [Lenis](https://github.com/darkroomengineering/lenis) | 1.1.18 | Smooth scroll | `unpkg.com` |
| [Anime.js](https://animejs.com) | 3.2.1 | Scroll animations | `cdnjs.cloudflare.com` |
| [CountUp.js](https://inorganik.github.io/countUp.js/) | 2.8.0 | Number animations | `cdn.jsdelivr.net` |
| [Font Awesome](https://fontawesome.com) | 6.5.0 | Icons | `cdnjs.cloudflare.com` |
| [Montserrat](https://fonts.google.com/specimen/Montserrat) | — | Display font | Google Fonts |
| [Outfit Variable](https://fonts.google.com/specimen/Outfit) | — | Numbers font | jsdelivr (fontsource) |

All libraries are loaded via CDN. For production, consider self-hosting them or using a bundler for better performance and offline reliability.

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

> `backdrop-filter` (glassmorphism) requires enabling a flag in some older versions of Firefox. The navbar and cards will still render correctly — just without the blur effect.

---

## Performance Notes

- The canvas animation uses `requestAnimationFrame` with O(n²) complexity for point connections. With `POINT_COUNT = 80`, this is ~3,160 connection checks per frame. On mobile, consider reducing to `50`.
- All images use `loading="lazy"` to defer off-screen loading.
- Fonts use `font-display: swap` to prevent invisible text during load.
- The `resize` event on the canvas is throttled with a 150ms debounce.
- All scroll listeners use `{ passive: true }` to avoid blocking the main thread.
- `will-change: transform, opacity` is applied only to animated elements to trigger GPU compositing.

### Lighthouse Score (estimated)

| Metric | Score |
|---|---|
| Performance | 85–92 |
| Accessibility | 94–98 |
| Best Practices | 95 |
| SEO | 98–100 |

> Scores vary based on hosting, image optimization and network speed.

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

Before going live, update the following in `index.html`:

```html
<!-- 1. Title -->
<title>Your Company Name — Your Tagline</title>

<!-- 2. Meta description (150–160 chars) -->
<meta name="description" content="Your description here.">

<!-- 3. Canonical URL -->
<link rel="canonical" href="https://yourdomain.com/">

<!-- 4. Open Graph -->
<meta property="og:url"   content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/imagens/og-cover.jpg">

<!-- 5. Schema.org — update the JSON-LD block -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Your Company Name",
  "url": "https://yourdomain.com"
}
</script>
```

For the OG image (`og-cover.jpg`), recommended size is **1200×630px**. Use a tool like [Canva](https://canva.com) or [OG Image Generator](https://og-playground.vercel.app) to create it.

---

## FAQ (Template)

**Q: What is the difference between `index.html` and `index-sales.html`?**
`index.html` is the Institutional variant — a classic landing page focused on brand credibility. `index-sales.html` is the Sales Focus variant, which replaces the hero with a VSL player and an inline lead capture form for direct conversion. The rest of the page (Services, Metrics, Cases, etc.) is identical in both.

**Q: Can I use this template for a client project?**
Depending on the license you purchased (Regular or Extended), you may use this for one end product (Regular) or multiple end products (Extended). See [License](#license) for details.

**Q: Can I remove the "Novus Ordo" branding?**
Yes. All branding is in the HTML — find and replace `Novus Ordo` with your company name throughout `index.html`.

**Q: Does this work with WordPress or Webflow?**
The template is pure HTML/CSS/JS and can be manually integrated into WordPress as a custom theme or page template. Native Webflow import is not supported, but the code can be adapted.

**Q: How do I add more FAQ items?**
Copy a `.faq-item` block in `index.html`, update the IDs (`faq-btn-5`, `faq-answer-5`), and update the `aria-controls` / `id` attributes to match. The JS is fully dynamic and will handle new items automatically.

**Q: How do I add more service cards?**
Copy a `.service-card` block inside `.services-grid`. The grid is `repeat(3, 1fr)` — if you add a 6th card it will wrap naturally. If you want a different layout, edit `grid-template-columns` in `.services-grid`.

---

## Changelog

### v1.1.0 — March 2026
- Sales Focus variant: `index-sales.html` + `style-sales.css`
- Split hero 60/40 with VSL player, lead form, urgency counter and inline trust bar
- `style-sales.css` as a thin override layer — all sections below the hero unchanged
- `README.md` updated: Variants section, comparison table, updated File Structure and FAQ

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

This template is licensed under the **Envato Regular License** (if purchased on ThemeForest) or your chosen license tier on Gumroad/Creative Market.

- ✅ Use for one end product (your own or a client's)
- ✅ Modify the source code freely
- ✅ Use for commercial purposes
- ❌ Resell or redistribute the template as-is
- ❌ Use for multiple end products under a single Regular License

For multiple client projects, purchase an **Extended License**.

> Full license terms: [themeforest.net/licenses](https://themeforest.net/licenses/standard)

---

## Support

Having trouble? Here's how to get help:

1. **Read this README fully** — most questions are answered here.
2. **Check the [FAQ section](#faq-template)** above.
3. **Open a support ticket** via the platform you purchased from (ThemeForest comments, Gumroad support, etc.).

When contacting support, please include:
- Browser and OS version
- A description of the issue
- A screenshot or screen recording if possible

---

<div align="center">

Made with ✦ and a lot of `cubic-bezier`

**[Novus Ordo Template](https://brenogurgel2719.github.io/Novus-ordu---new-march/)** · v1.1.0 · March 2026

</div>