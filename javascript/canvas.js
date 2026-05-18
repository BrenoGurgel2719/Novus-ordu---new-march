/* ═══════════════════════════════════════════════════════════════
   canvas-particles.js — Novus Ordo S.A
   Carregado dinamicamente apenas em desktop (>= 769px).
   Não depende de nenhuma variável global do script.js.
════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// HERO CANVAS — animated particle network
//    Carregado apenas em desktop via loader condicional no HTML.
//    Pausa automaticamente quando a aba está oculta.
// ─────────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  // isTablet definido localmente — este arquivo nunca carrega em mobile
  const isTablet = window.matchMedia('(max-width: 1024px)').matches;

  const ctx = canvas.getContext('2d');
  const POINT_COUNT    = isTablet ? 40 : 80;
  const CONNECTION_DIST = isTablet ? 120 : 160;
  const MOUSE_DIST     = 200;

  // String constante — definida uma vez, nunca reconstruída por frame
  const GOLD = '179, 137, 0';

  let points  = [];
  let mouse   = { x: null, y: null };
  let rafId   = null;
  let running = true;

  function initPoints() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    // C. Reutiliza o array existente em vez de criar um novo a cada resize —
    // evita que o GC precise coletar POINT_COUNT objetos descartados no próximo ciclo
    points.length = 0;
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
    if (!running) return;
    rafId = requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // B. Propriedades estáticas declaradas UMA VEZ por frame — evita Context State Thrashing
    ctx.fillStyle = `rgba(${GOLD},0.5)`;
    ctx.lineWidth = 0.5;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill(); // fillStyle já foi setado antes do loop

      for (let j = i + 1; j < points.length; j++) {
        const p2  = points[j];
        const dx  = p.x - p2.x;
        const dy  = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy); // mais rápido que hypot em hot loops

        if (dist < CONNECTION_DIST) {
          ctx.beginPath();
          // lineWidth = 0.5 já está setado — apenas strokeStyle (dinâmico) muda aqui
          ctx.strokeStyle = `rgba(${GOLD},${(1 - dist / CONNECTION_DIST) * 0.2})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const mdx   = p.x - mouse.x;
        const mdy   = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_DIST) {
          ctx.beginPath();
          ctx.lineWidth = 0.8; // override pontual para a linha do mouse
          ctx.strokeStyle = `rgba(${GOLD},${(1 - mDist / MOUSE_DIST) * 0.4})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.lineWidth = 0.5; // restaura para a próxima iteração do loop externo
        }
      }
    }
  }

  // Pausa o loop quando a aba está oculta — economiza CPU ao trocar de aba
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

  // A. Protege o LCP: só inicia as partículas quando o browser estiver ocioso
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initPoints();
      draw();
    });
  } else {
    setTimeout(() => {
      initPoints();
      draw();
    }, 1000);
  }
})();