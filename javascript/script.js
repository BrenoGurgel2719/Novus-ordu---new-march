/* ═══════════════════════════════════════════════════════════════
   script.js — Novus Ordo S.A
════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// GLOBAL — device detection (single evaluation)
// ─────────────────────────────────────────────
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const isTablet = window.matchMedia('(max-width: 1024px)').matches;

// ─────────────────────────────────────────────
// UTILITY — shared form validation
// Applies/clears error borders and returns validity.
// ─────────────────────────────────────────────
function validateFields(fields) {
  let valid = true;
  fields.forEach(field => {
    const empty = !field.value.trim();
    field.style.borderColor = empty ? 'rgba(255,95,86,0.6)' : '';
    field.style.boxShadow = empty ? '0 0 0 3px rgba(255,95,86,0.1)' : '';
    if (empty) {
      valid = false;
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      }, { once: true });
    }
  });
  return valid;
}

// ─────────────────────────────────────────────
// 0. NAVBAR — active link + mobile menu
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  // Extracted helper — avoids 3 copies of the same 4 lines
  function closeMenu() {
    mobileMenu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  // Active nav link via IntersectionObserver
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link =>
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
      );
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close on any mobile link click
  mobileMenu.addEventListener('click', e => {
    if (e.target.closest('.mobile-link')) closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) closeMenu();
  });
})();

// ─────────────────────────────────────────────
// 0b. FOOTER — dynamic year
// ─────────────────────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─────────────────────────────────────────────
// 0c. VSL PLAYER — lazy-load iframe on play click
// ─────────────────────────────────────────────
(function initVSL() {
  const playBtn = document.getElementById('vsl-play-btn');
  const thumbnail = document.getElementById('vsl-thumbnail');
  const iframe = document.getElementById('vsl-iframe');
  if (!playBtn || !iframe) return;

  playBtn.addEventListener('click', () => {
    // Only assign src once — subsequent clicks are no-ops
    if (!iframe.src) iframe.src = iframe.dataset.src;
    thumbnail.classList.add('hidden');
    iframe.classList.add('active');
    iframe.setAttribute('aria-hidden', 'false');
  }, { once: true }); // play can only fire once; detaches after first click
})();

// ─────────────────────────────────────────────
// 0d. LEAD FORM — validation + submission feedback
// ─────────────────────────────────────────────
(function initLeadForm() {
  const btn = document.getElementById('lead-submit-btn');
  const form = document.querySelector('.lead-form');
  const success = document.getElementById('lead-success');
  const slots = document.getElementById('slots-count');
  if (!btn || !form) return;

  // Urgency slot counter — decrements every 45 s
  let count = 3;
  const urgencyInterval = setInterval(() => {
    count = Math.max(1, count - 1);
    if (slots) slots.textContent = count;
    if (count <= 1) clearInterval(urgencyInterval);
  }, 45_000);

  btn.addEventListener('click', () => {
    if (!validateFields([...form.querySelectorAll('[required]')])) return;

    btn.disabled = true;
    btn.querySelector('.lead-submit-text').textContent = 'Sending…';

    setTimeout(() => {
      // ↓ Connect your CRM / webhook here:
      // fetch('/api/lead', { method: 'POST', body: new FormData(form) })
      form.style.display = 'none';
      if (success) success.hidden = false;
      document.querySelector('.lead-form-header')?.style.setProperty('display', 'none');
      document.querySelector('.lead-urgency')?.style.setProperty('display', 'none');
    }, 1200);
  });
})();

// ─────────────────────────────────────────────
// 0e. CTA FORM — validation + submission feedback
// ─────────────────────────────────────────────
(function initCtaForm() {
  const btn = document.getElementById('form-submit-btn');
  const form = btn?.closest('.cta-form');
  const success = document.getElementById('form-success');
  if (!btn || !form || !success) return;

  btn.addEventListener('click', () => {
    const fields = ['cta-name', 'cta-email', 'cta-empresa'].map(id =>
      document.getElementById(id)
    );
    if (!validateFields(fields)) return;

    btn.classList.add('loading');
    btn.querySelector('.submit-text').textContent = 'Enviando…';
    btn.querySelector('.submit-icon').style.display = 'none';

    // ↓ Connect your CRM / webhook here:
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    setTimeout(() => {
      form.style.cssText += 'transition:opacity .4s ease;opacity:0;';
      setTimeout(() => {
        form.style.display = 'none';
        success.removeAttribute('hidden');
      }, 400);
    }, 1800);
  });
})();

// ─────────────────────────────────────────────
// 0f. FAQ — accessible accordion
// ─────────────────────────────────────────────
(function initFaq() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  // Pre-map each button → its answer element once (avoids repeated getElementById)
  const pairs = [...questions].map(btn => ({
    btn,
    answer: document.getElementById(btn.getAttribute('aria-controls'))
  }));

  function closeItem({ btn, answer }) {
    btn.setAttribute('aria-expanded', 'false');
    if (!answer) return;
    answer.classList.remove('open');
    setTimeout(() => {
      if (!answer.classList.contains('open')) answer.setAttribute('hidden', '');
    }, 450);
  }

  pairs.forEach(current => {
    current.btn.addEventListener('click', () => {
      const isOpen = current.btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      pairs.forEach(pair => { if (pair !== current) closeItem(pair); });

      if (isOpen) {
        closeItem(current);
      } else {
        current.btn.setAttribute('aria-expanded', 'true');
        current.answer.removeAttribute('hidden');
        // Double rAF ensures the browser paints the un-hidden state
        // before adding the class, which allows the CSS transition to run.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => current.answer.classList.add('open'))
        );
      }
    });
  });
})();

// ─────────────────────────────────────────────
// 1. HERO CANVAS — animated particle network
//    Disabled on mobile to protect FCP and CPU.
//    Pauses automatically when the tab is hidden.
// ─────────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  if (isMobile) { canvas.style.display = 'none'; return; }

  const ctx = canvas.getContext('2d');
  const POINT_COUNT = isTablet ? 40 : 80;
  const CONNECTION_DIST = isTablet ? 120 : 160;
  const MOUSE_DIST = 200;

  // Constant string — defined once, not rebuilt every frame
  const GOLD = '179, 137, 0';

  let points = [];
  let mouse = { x: null, y: null };
  let rafId = null;
  let running = true;

  function initPoints() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    points = Array.from({ length: POINT_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1
    }));
  }

  function draw() {
    if (!running) return;
    rafId = requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD},0.5)`;
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy); // faster than hypot in hot loops

        if (dist < CONNECTION_DIST) {
          ctx.beginPath();
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(${GOLD},${(1 - dist / CONNECTION_DIST) * 0.2})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_DIST) {
          ctx.beginPath();
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = `rgba(${GOLD},${(1 - mDist / MOUSE_DIST) * 0.4})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Pause loop when tab is hidden — saves CPU when user switches tabs
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else {
      running = true;
      draw();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initPoints, 150);
  }, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  initPoints();
  draw();
})();

// ─────────────────────────────────────────────
// 2. ISOMETRIC MOCKUP — entrance + scroll parallax
// ─────────────────────────────────────────────
(function initMockup() {
  const wrapper = document.getElementById('iso-wrapper');
  const stage = document.getElementById('mockup-stage');
  if (!wrapper || !stage) return;

  let hasEntered = false;

  wrapper.style.cssText += 'transform:perspective(1400px) rotateX(45deg) rotateZ(-4deg) scale(0.85);opacity:0;transition:none;';

  const entranceObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || hasEntered) return;
    hasEntered = true;

    setTimeout(() => {
      wrapper.style.transition = 'transform 1.4s cubic-bezier(0.23,1,0.32,1), opacity 1s ease';
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'perspective(1400px) rotateX(18deg) rotateZ(-4deg) scale(0.95)';
    }, 150);

    entranceObserver.disconnect();
  }, { threshold: 0.15 });

  entranceObserver.observe(stage);

  if (isMobile) return; // skip parallax on mobile

  let rafPending = false;
  let stageTop = 0;
  let stageH = 0;

  const updateCache = () => {
    const r = stage.getBoundingClientRect();
    stageTop = r.top + window.scrollY;
    stageH = r.height;
  };
  updateCache();

  const ro = new ResizeObserver(updateCache);
  ro.observe(stage);
  window.addEventListener('resize', updateCache, { passive: true });

  window.addEventListener('scroll', () => {
    if (!hasEntered || rafPending) return;
    rafPending = true;

    requestAnimationFrame(() => {
      const viewH = window.innerHeight;
      const rectTop = stageTop - window.scrollY;
      const progress = (viewH / 2 - (rectTop + stageH / 2)) / (viewH * 0.6);
      const clamped = Math.max(-1, Math.min(1, progress));

      wrapper.style.transition = 'none';
      wrapper.style.transform =
        `perspective(1400px) rotateX(${18 - clamped * 4}deg) rotateZ(${-4 + clamped * 2}deg) scale(${0.95 - Math.abs(clamped) * 0.02})`;

      rafPending = false;
    });
  }, { passive: true });
})();

// ─────────────────────────────────────────────
// 3. SCROLL ANIMATIONS — anime.js
// ─────────────────────────────────────────────
(function initAnimations() {
  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const t = entry.target;

      try { if (t.classList.contains('novus-concept')) animateConcept(t); } catch (e) { console.warn('animateConcept', e); }
      try { if (t.classList.contains('services-section')) animateServices(t); } catch (e) { console.warn('animateServices', e); }
      try { if (t.classList.contains('results-stats')) animateStats(t); } catch (e) { console.warn('animateStats', e); }
      try { if (t.classList.contains('methodology-section')) animateMethodology(t); } catch (e) { console.warn('animateMethodology', e); }

      scrollObserver.unobserve(t);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('section').forEach(s => scrollObserver.observe(s));

  function animateConcept(section) {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: section.querySelectorAll('.reveal-up'),
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(200)
      })
      .add({
        targets: section.querySelectorAll('.pill'),
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(150)
      }, '-=800');
  }

  function animateServices(section) {

    // 1. Activates all CSS SVG animations
    section.classList.add('svc-animated');

    // 2. Reveal cards column (was opacity:0)
    const cardsCol = section.querySelector('.svc-cards-col');
    if (cardsCol) cardsCol.style.opacity = '1';

    // 3. Cards entrance: slide up + fade in, staggered
    anime({
      targets: section.querySelectorAll('.svc-card'),
      translateY: [28, 0],
      opacity: [0, 1],
      delay: anime.stagger(75),
      duration: 900,
      easing: 'easeOutExpo'
    });

    // 4. Promise items entrance: slide from right + fade in
    anime({
      targets: section.querySelectorAll('.promise-item'),
      translateX: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(110, { start: 180 }),
      duration: 750,
      easing: 'easeOutExpo'
    });
  }

  function animateStats(section) {
    anime({
      targets: section.querySelectorAll('.stat-card'),
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      complete() {
        section.querySelectorAll('.stat-card').forEach(card => {
          card.classList.add('active');
          const num = card.querySelector('.num-value');
          if (num && !num.dataset.done) {
            animateNumber(num);
            num.dataset.done = '1';
          }
        });
      }
    });
  }

  function animateMethodology(section) {
    anime.timeline({ easing: 'easeOutQuad' })
      .add({
        targets: section.querySelector('.track-progress'),
        width: ['0%', '100%'],
        duration: 2000,
        easing: 'easeInOutQuad'
      })
      .add({
        targets: section.querySelectorAll('.method-item'),
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 1000
      }, '-=1500');
  }
})();

// ─────────────────────────────────────────────
// 4. COUNTUP — reusable number animation
// ─────────────────────────────────────────────
function animateNumber(el) {
  if (typeof countUp === 'undefined') {
    el.textContent = el.dataset.target + (el.dataset.suffix || '');
    console.warn('countUp not loaded — displaying static value.');
    return;
  }

  const counter = new countUp.CountUp(el, +el.dataset.target, {
    duration: 3,
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    suffix: el.dataset.suffix || ''
  });

  if (!counter.error) counter.start();
  else console.warn('CountUp error:', counter.error);
}



