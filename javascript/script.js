/* ═══════════════════════════════════════════════════════════════
   script.js — Novus Ordo S.A
════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// GLOBAL — mobile detection
// Declared at the top so all modules can use it
// ─────────────────────────────────────────────
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const isTablet = window.matchMedia('(max-width: 1024px)').matches;

// ─────────────────────────────────────────────
// 0. NAVBAR — scroll hide/show + mobile menu
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar) return;

  // — Hide on scroll down, show on scroll up —
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const current = window.scrollY;

        // Added .scrolled after 50px
        navbar.classList.toggle('scrolled', current > 50);

        

        lastScroll = current <= 0 ? 0 : current;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // — Active link based on visible section. (IntersectionObserver) —
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // — Mobile menu toggle —
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close the menu when clicking on a mobile link.
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  //Closes when clicked outside.
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
})();

// ─────────────────────────────────────────────
// 0b. FOOTER — dynamic year
// ─────────────────────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─────────────────────────────────────────────
// 0b2. VSL PLAYER — lazy-load iframe on play click
//      (Sales Focus variant — index-sales.html only)
//      Safe to keep in both variants: guards check
//      for element existence before running.
// ─────────────────────────────────────────────
(function initVSL() {
  const playBtn   = document.getElementById('vsl-play-btn');
  const thumbnail = document.getElementById('vsl-thumbnail');
  const iframe    = document.getElementById('vsl-iframe');

  // Exit silently if elements don't exist (index.html)
  if (!playBtn || !iframe) return;

  playBtn.addEventListener('click', () => {
    // Lazy-load: only set iframe src when the user clicks play
    if (!iframe.src) {
      iframe.src = iframe.dataset.src;
    }
    thumbnail.classList.add('hidden');
    iframe.classList.add('active');
    iframe.setAttribute('aria-hidden', 'false');
  });
})();

// ─────────────────────────────────────────────
// 0b3. LEAD FORM — validation + submission feedback
//      (Sales Focus variant — index-sales.html only)
// ─────────────────────────────────────────────
(function initLeadForm() {
  const btn     = document.getElementById('lead-submit-btn');
  const form    = document.querySelector('.lead-form');
  const success = document.getElementById('lead-success');
  const slots   = document.getElementById('slots-count');

  // Exit silently if elements don't exist (index.html)
  if (!btn || !form) return;

  // Simulates slot counter decrementing (urgency effect)
  let count = 3;
  const urgencyInterval = setInterval(() => {
    count = Math.max(1, count - 1);
    if (slots) slots.textContent = count;
    if (count <= 1) clearInterval(urgencyInterval);
  }, 45000); // decrements every 45s

  btn.addEventListener('click', () => {
    // Validate required fields
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = 'rgba(255, 95, 86, 0.6)';
        field.focus();
        valid = false;
      }
    });

    if (!valid) return;

    // Button loading animation
    btn.disabled = true;
    btn.querySelector('.lead-submit-text').textContent = 'Sending...';

    setTimeout(() => {
      // Connect to your CRM / webhook here
      // e.g. fetch('/api/lead', { method: 'POST', body: new FormData(form) })
      form.style.display = 'none';
      if (success) success.hidden = false;
      const header  = document.querySelector('.lead-form-header');
      const urgency = document.querySelector('.lead-urgency');
      if (header)  header.style.display  = 'none';
      if (urgency) urgency.style.display = 'none';
    }, 1200);
  });

  // Reset error border on input
  form.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
})();

// ─────────────────────────────────────────────
// ISOMETRIC MOCKUP — input + parallax
// ─────────────────────────────────────────────
(function initMockup() {
  const wrapper = document.getElementById('iso-wrapper');
  const stage   = document.getElementById('mockup-stage');
  if (!wrapper || !stage) return;

  // — Input: animates from "horizontal" state to isometric when entering the viewport —
  let hasEntered = false;

  // Initial state: no perspective (plan)
  wrapper.style.transform = `perspective(1400px) rotateX(45deg) rotateZ(-4deg) scale(0.85)`;
  wrapper.style.opacity   = '0';
  wrapper.style.transition = 'none';

  const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasEntered) {
        hasEntered = true;

        // A slight delay is needed to ensure the user sees the animation.
        setTimeout(() => {
          wrapper.style.transition = 'transform 1.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 1s ease';
          wrapper.style.opacity = '1';
          wrapper.style.transform = 'perspective(1400px) rotateX(18deg) rotateZ(-4deg) scale(0.95)';
        }, 150);

        entranceObserver.disconnect();
      }
    });
  }, { threshold: 0.15 });

  entranceObserver.observe(stage);

  // — Parallax: slight rotation when scrolling the page —
  // Skipped on mobile to save main thread resources
  if (!isMobile) {
    let rafPending = false;

    // FIX: Cache stage position to avoid forced reflow on every scroll tick.
    // getBoundingClientRect() inside a scroll handler triggers layout — expensive.
    // ResizeObserver updates the cache only when the element actually resizes.
    let stageOffsetTop = 0;
    let stageHeight = 0;

    const updateStageCache = () => {
      const rect = stage.getBoundingClientRect();
      stageOffsetTop = rect.top + window.scrollY;
      stageHeight = rect.height;
    };
    updateStageCache();
    new ResizeObserver(updateStageCache).observe(stage);
    window.addEventListener('resize', updateStageCache, { passive: true });

    window.addEventListener('scroll', () => {
      if (!hasEntered || rafPending) return;
      rafPending = true;

      requestAnimationFrame(() => {
        // Use pre-cached values — NO forced reflow
        const viewH    = window.innerHeight;
        const rectTop  = stageOffsetTop - window.scrollY;

        const progress = (viewH / 2 - (rectTop + stageHeight / 2)) / (viewH * 0.6);
        const clamped  = Math.max(-1, Math.min(1, progress));

        const rotX  = 18 - clamped * 4;
        const rotZ  = -4 + clamped * 2;
        const scale = 0.95 - Math.abs(clamped) * 0.02;
        wrapper.style.transition = 'none';
        wrapper.style.transform  =
          `perspective(1400px) rotateX(${rotX}deg) rotateZ(${rotZ}deg) scale(${scale})`;

        rafPending = false;
      });
    }, { passive: true });
  }
})();
// ─────────────────────────────────────────────
// 0d. FAQ — accessible accordion
// ─────────────────────────────────────────────
(function initFaq() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen   = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);

      // Close all the others
      questions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          const otherId  = otherBtn.getAttribute('aria-controls');
          const otherAns = document.getElementById(otherId);
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) {
            otherAns.classList.remove('open');
            setTimeout(() => {
              if (!otherAns.classList.contains('open'))
                otherAns.setAttribute('hidden', '');
            }, 450);
          }
        }
      });

      // Toggle current
      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
        setTimeout(() => answer.setAttribute('hidden', ''), 450);
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
        requestAnimationFrame(() =>
          requestAnimationFrame(() => answer.classList.add('open'))
        );
      }
    });
  });
})();

// ─────────────────────────────────────────────
//0e. CTA FORM — submission feedback
// ─────────────────────────────────────────────
(function initForm() {
  const btn     = document.getElementById('form-submit-btn');
  const form    = btn?.closest('.cta-form');
  const success = document.getElementById('form-success');
  if (!btn || !form || !success) return;

  btn.addEventListener('click', () => {
    const name    = document.getElementById('cta-name');
    const email   = document.getElementById('cta-email');
    const empresa = document.getElementById('cta-empresa');

    // Validates required fields.
    let valid = true;
    [name, email, empresa].forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'rgba(255,95,86,0.6)';
        field.style.boxShadow   = '0 0 0 3px rgba(255,95,86,0.1)';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
          field.style.boxShadow   = '';
        }, { once: true });
      }
    });
    if (!valid) return;

    // Loading
    btn.classList.add('loading');
    btn.querySelector('.submit-text').textContent = 'Enviando';
    btn.querySelector('.submit-icon').style.display = 'none';

    //Simulate sending — replace with actual fetch()
    setTimeout(() => {
      form.style.transition = 'opacity 0.4s ease';
      form.style.opacity    = '0';
      setTimeout(() => {
        form.style.display = 'none';
        success.removeAttribute('hidden');
      }, 400);
    }, 1800);
  });
})();

// ─────────────────────────────────────────────
// 1. HERO CANVAS — animated particle network
//    Mobile optimization: canvas is disabled on
//    screens < 768px (main FCP bottleneck on mobile)
//    and runs with fewer points on tablet.
// ─────────────────────────────────────────────
const canvas = document.getElementById('network-canvas');

// Detect mobile — skip canvas entirely to save CPU + FCP time
if (isMobile) {
  // Hide canvas on mobile — saves ~60ms of main thread work per frame
  if (canvas) canvas.style.display = 'none';
} else {
  const ctx = canvas.getContext('2d');

  let points = [];
  let mouse  = { x: null, y: null };

  // Fewer points on tablet vs desktop for better performance
  const POINT_COUNT    = isTablet ? 40 : 80;
  const CONNECTION_DIST = isTablet ? 120 : 160;
  const MOUSE_DIST     = 200;

  let resizeTimer;
  function initCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    points = [];

    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        vx:     (Math.random() - 0.5) * 0.4,
        vy:     (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colorGold = '179, 137, 0';

    points.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colorGold}, 0.5)`;
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const p2   = points[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < CONNECTION_DIST) {
          const opacity = 1 - (dist / CONNECTION_DIST);
          ctx.beginPath();
          ctx.lineWidth   = 0.5;
          ctx.strokeStyle = `rgba(${colorGold}, ${opacity * 0.2})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mDist < MOUSE_DIST) {
          const mOpacity = 1 - (mDist / MOUSE_DIST);
          ctx.beginPath();
          ctx.lineWidth   = 0.8;
          ctx.strokeStyle = `rgba(${colorGold}, ${mOpacity * 0.4})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initCanvas, 150);
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  initCanvas();
  draw();
}


// ─────────────────────────────────────────────
// 2. HERO BADGE — Category Rotation
// ─────────────────────────────────────────────
const initBadgeRotation = () => {
  const items = document.querySelectorAll('.badge-item');
  if (!items.length) return;

  let currentIndex = 0;

  setInterval(() => {
    const currentItem = items[currentIndex];

    currentItem.classList.remove('active');
    currentItem.classList.add('exit');

    setTimeout(() => {
      currentItem.classList.remove('exit');
    }, 600);

    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
  }, 3000);
};


// ─────────────────────────────────────────────
// 3. ANIME.JS — scroll-triggered section animations
// NOTE: `defer` scripts run after DOM is parsed,
// so DOMContentLoaded has already fired by the time
// this script executes. We use an IIFE instead.
// ─────────────────────────────────────────────
(function initAnimations() {
  initBadgeRotation();

  // Main observer of sections
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Each animation is wrapped in try/catch so a failure in one
        // section never silences the others in the same callback tick.
        try { if (target.classList.contains('novus-concept'))       animateConcept(target);     } catch(e) { console.warn('animateConcept error', e); }
        try { if (target.classList.contains('services-section'))    animateServices(target);    } catch(e) { console.warn('animateServices error', e); }
        try { if (target.classList.contains('results-stats'))       animateStats(target);       } catch(e) { console.warn('animateStats error', e); }
        try { if (target.classList.contains('methodology-section')) animateMethodology(target); } catch(e) { console.warn('animateMethodology error', e); }

        scrollObserver.unobserve(target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
  });


  // ── Concept ──────────────────────────────
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
        delay: anime.stagger(150),
      }, '-=800');
  }


  // ── Services ─────────────────────────────
  function animateServices(section) {
    anime({
      targets: section.querySelectorAll('.service-card'),
      translateY: [60, 0],
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: anime.stagger(200),
      duration: 1500,
      easing: 'easeOutElastic(1, .8)'
    });
  }


  // ──Statistics ─────────────────────────
  // FIX: CountUp is now triggered ONCE, inside this box, after the cards animate.
  //     The old statsObserver was REMOVED to avoid duplicating the animation.
  function animateStats(section) {
    anime({
      targets: section.querySelectorAll('.stat-card'),
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      complete: () => {
        section.querySelectorAll('.stat-card').forEach(card => {
          card.classList.add('active'); // Maintains compatibility with CSS.reveal.active

          const num = card.querySelector('.num-value');
          if (num && !num.dataset.done) {
            animateNumber(num);
            num.dataset.done = "true";
          }
        });
      }
    });
  }


  // ── Methodology ──────────────────────────
  function animateMethodology(section) {
    const track = section.querySelector('.track-progress');

    anime.timeline({ easing: 'easeOutQuad' })
      .add({
        targets: track,
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
// 4.COUNTUP — Reusable function
//   FIX: renamed from animatenumber → animateNumber (correct camelCase)
// ─────────────────────────────────────────────
function animateNumber(numElement) {
  // Guard: if countUp failed to load, fall back to displaying the raw target value
  if (typeof countUp === 'undefined') {
    const suffix = numElement.dataset.suffix || '';
    numElement.textContent = numElement.dataset.target + suffix;
    console.warn('countUp not loaded — displaying static value.');
    return;
  }

  const target = +numElement.dataset.target;
  const suffix = numElement.dataset.suffix || ''; // e.g. "K", "B", "%"

  const options = {
    duration: 3,
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    suffix: suffix,
  };

  const counter = new countUp.CountUp(numElement, target, options);

  if (!counter.error) {
    counter.start();
  } else {
    console.warn('CountUp error:', counter.error);
  }
}