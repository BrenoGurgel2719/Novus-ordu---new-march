# Changelog

All notable changes to the **Novus Ordo** template will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] — 2026-03-15

### Added
- **Sales Focus variant** (`index-sales.html` + `style-sales.css`)
  - New hero layout: split 60/40 grid replacing the centered institutional hero
  - Urgency topbar — fixed strip with live indicator and limited-slots messaging
  - VSL player — lazy-loaded iframe with thumbnail, pulsing play button, duration badge, and smooth fade-in on click; compatible with YouTube and Vimeo
  - Social proof trust bar — inline metrics (AUM, IPOs, NPS) below the headline
  - Sticky lead capture form with 5 fields (name, company, role, WhatsApp, email + revenue tier select)
  - Urgency counter — slot count displayed and decrements in real time via JS interval
  - Form success state — hides form and shows confirmation with redirect-to-video CTA
  - Basic client-side validation with red border feedback on empty required fields
  - `style-sales.css` designed as a thin override layer (~720 lines); all sections below the hero inherit from `style.css` unchanged

### Changed
- `README.md` — updated File Structure, added Variants section with comparison table, updated FAQ, bumped version to v1.1.0

---

## [1.0.0] — 2026-03-10

### Added
- Hero section with interactive canvas network animation
- Glassmorphism navbar with scroll hide/show behavior and mobile hamburger menu
- Active link tracking via IntersectionObserver
- Rotating badge carousel in the hero (3 categories)
- Novus Concept section with animated pills and text gradient
- Services section with featured card + 4 regular cards and scrolling ticker
- Metrics / Statistics section with CountUp.js number animation
- Sticky case studies section with z-index stack scroll reveal
- Methodology timeline section with animated progress track
- Isometric 3D platform mockup with full financial dashboard (SVG chart, KPIs, table)
- Parallax scroll effect on the isometric mockup
- FAQ accordion (WCAG 2.1 AA compliant, aria-expanded + hidden pattern)
- CTA split layout with contact form, validation and success state
- Complete footer with 4 columns, social links, legal links and dynamic copyright year
- Full SEO setup: meta description, Open Graph, Twitter Card, canonical, Schema.org JSON-LD
- `prefers-reduced-motion` support — all animations disabled for users who prefer it
- WCAG 2.1 AA accessibility baseline across all sections
- Smooth scroll via Lenis
- Scroll-triggered animations via Anime.js
- `font-display: swap` on all self-hosted fonts
- `loading="lazy"` on all images
- Passive scroll event listeners throughout
- README.md with full documentation
- CHANGELOG.md
- LICENSE.txt