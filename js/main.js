// ─── Load HTML partials into placeholder divs ───────────────────
async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(`partials/${file}`);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
  }
}

async function loadAllPartials() {
  await Promise.all([
    loadPartial('partial-topbar',  'topbar.html'),
    loadPartial('partial-header',  'header.html'),
    loadPartial('partial-nav',     'nav.html'),
    loadPartial('partial-hero',    'hero.html'),
    loadPartial('partial-banner',  'banner.html'),
    loadPartial('partial-intro',   'intro.html'),
    loadPartial('partial-panels',  'panels.html'),
    loadPartial('partial-why',     'why-us.html'),
    loadPartial('partial-cta',     'cta.html'),
    loadPartial('partial-footer',  'footer.html'),
  ]);
  initNav();
  initSlider();
  initAccordion();
}

// ─── Mobile nav toggle ──────────────────────────────────────────
function initNav() {
  const btn   = document.getElementById('mobileBtn');
  const links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }
}

// ─── Hero slider ────────────────────────────────────────────────
function initSlider() {
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.slide)));
  });

  setInterval(() => goToSlide((current + 1) % slides.length), 5000);
}

// ─── Flooring panel accordion ───────────────────────────────────
function initAccordion() {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.addEventListener('click', () => {
      const type = panel.dataset.type;
      const drawer = document.getElementById('drawer-' + type);
      const isOpen = panel.classList.contains('open');

      // Close all
      document.querySelectorAll('.panel.open').forEach(p => {
        p.classList.remove('open');
        const d = document.getElementById('drawer-' + p.dataset.type);
        if (d) d.style.maxHeight = null;
      });

      // Open this one if it wasn't already open
      if (!isOpen && drawer) {
        panel.classList.add('open');
        drawer.style.maxHeight = drawer.scrollHeight + 'px';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadAllPartials);
