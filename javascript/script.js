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
// 1. HERO CANVAS — movido para javascript/canvas-particles.js
//    Carregado dinamicamente apenas em desktop pelo loader no HTML.
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// 2. ISOMETRIC MOCKUP — entrance + scroll parallax
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// 2. MOCKUP PROCESSO DIGITAL — Entrada Suave (Substitui o antigo Isometric 3D)
// ─────────────────────────────────────────────
(function initMockup() {
  const stage = document.getElementById('mockup-stage');
  const wrapper = document.querySelector('.legal-ui-wrapper');
  if (!wrapper || !stage) return;

  // Define o estado inicial (invisível e levemente rebaixado)
  wrapper.style.opacity = '0';
  wrapper.style.transform = 'translateY(50px)';
  wrapper.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';

  // Cria o observador para disparar a animação apenas quando chegar na tela
  const entranceObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;

    // Remove o atraso e revela o elemento
    requestAnimationFrame(() => {
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    });

    // Desconecta após animar a primeira vez
    entranceObserver.disconnect();
  }, { threshold: 0.15 });

  entranceObserver.observe(stage);
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
      try { if (t.classList.contains('cases-section')) animateCases(t); } catch (e) { console.warn('animateCases', e); }
      try { if (t.classList.contains('services-section')) animateServices(t); } catch (e) { console.warn('animateServices', e); }
      try { if (t.classList.contains('results-stats')) animateStats(t); } catch (e) { console.warn('animateStats', e); }
      try { if (t.classList.contains('methodology-section')) animateMethodologyV2(t); } catch (e) { console.warn('animateMethodologyV2', e); }

      scrollObserver.unobserve(t);
    });
  }, { threshold: 0.25 });

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

  function animateCases(section) {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: section.querySelectorAll('.reveal-up'),
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(150)
      })
      .add({
        targets: section.querySelectorAll('.case-reveal'),
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(200) // Efeito cascata lindo nos 3 cards
      }, '-=600');
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

    // 2. NOVA PARTE: Ativação do Gráfico
    const chartCard = section.querySelector('.metrics-chart-card');
    if (chartCard) {
      // Um pequeno delay (ex: 400ms) cria uma coreografia legal: 
      // os números começam a subir e logo em seguida o gráfico desenha
      setTimeout(() => {
        chartCard.classList.add('animated');
      }, 400);
    }


  }

  function animateMethodologyV2(section) {
    anime.timeline({ easing: 'easeOutQuad' })
      .add({
        targets: section.querySelector('.track-progress'),
        width: ['0%', '100%'],
        duration: 2000,
        easing: 'easeInOutQuad'
      })
      .add({
        targets: section.querySelectorAll('.method-card'),
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 900
      }, '-=1600');
  }
})();

// ─────────────────────────────────────────────
// 4. COUNTUP — reusable number animation
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// ANIMAÇÃO COUNTUP (MÉTRICAS JURÍDICAS)
// ─────────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  // Função para animar cada número
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 segundos de animação
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Efeito ease-out para desacelerar no final
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.floor(easeOut * target);

      counter.innerText = currentNum;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.innerText = target; // Garante o número final exato
      }
    };

    requestAnimationFrame(step);
  };

  // IntersectionObserver para disparar apenas quando visível na tela
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, { threshold: 0.5 }); // Dispara quando 50% do elemento estiver visível

  counters.forEach(counter => observer.observe(counter));
})();

//Navbar inicial

document.addEventListener("DOMContentLoaded", () => {
  // 1. Selecionamos todos os elementos internos que vão aparecer depois
  const navElements = document.querySelectorAll('.nav-logo, .nav-links li, .nav-cta, .nav-toggle');

  // 2. Setamos o estado INICIAL (para não piscar na tela)
  anime.set(navElements, {
    opacity: 0,
    translateY: 15 // Começam invisíveis e um pouco rebaixados
  });

  anime.set('.navbar', {
    width: '60px', // Começa parecendo um botão pequeno/pílula
  });

  // 3. Criamos a Timeline da animação
  const tl = anime.timeline({
    easing: 'easeOutExpo', // Curva de aceleração elegante
  });

  // Passo A: Expansão da Navbar
  tl.add({
    targets: '.navbar',
    width: 'calc(100% - 40px)', // Expande até a largura da tela (o max-width de 1200px segura o limite)
    duration: 1200,
    delay: 600, // Tempo de espera "fechada" após abrir a página
  })

    // Passo B: Revelação dos elementos internos
    .add({
      targets: navElements,
      opacity: [0, 1], // Vai de invisível a visível
      translateY: [15, 0], // Sobe para a posição original
      duration: 800,
      delay: anime.stagger(80), // Efeito cascata lindo de 80ms entre cada item
      easing: 'easeOutQuad'
    }, '-=500'); // O '-=500' faz essa animação começar 500ms ANTES da expansão terminar, unindo os movimentos
});