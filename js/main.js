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
  initLightbox();
}

// ─── Mobile nav toggle ──────────────────────────────────────────
function initNav() {
  const btn   = document.getElementById('mobileBtn');
  const links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Active link highlighting
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      // Close menu on mobile after clicking
      const navLinks = document.getElementById('navLinks');
      if (navLinks) navLinks.classList.remove('open');
    });
  });
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

// ─── Lightbox ────────────────────────────────────────────────────
function initLightbox() {
  // Build lightbox DOM
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div id="lb-overlay"></div>
    <button id="lb-close">✕</button>
    <button id="lb-prev">&#8249;</button>
    <button id="lb-next">&#8250;</button>
    <div id="lb-img-wrap"><img id="lb-img" src="" alt=""></div>
    <div id="lb-counter"></div>
  `;
  document.body.appendChild(lb);

  let images = [];
  let current = 0;

  function show(idx) {
    current = (idx + images.length) % images.length;
    document.getElementById('lb-img').src = images[current].src;
    document.getElementById('lb-img').alt = images[current].alt;
    document.getElementById('lb-counter').textContent = (current + 1) + ' / ' + images.length;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open on photo click — use event delegation so it works after accordion opens
  document.addEventListener('click', e => {
    const photo = e.target.closest('.drawer-photo:not(.placeholder) img');
    if (!photo) return;
    // Gather all real photos from the same drawer
    const drawer = photo.closest('.panel-drawer');
    images = Array.from(drawer.querySelectorAll('.drawer-photo:not(.placeholder) img'));
    show(images.indexOf(photo));
  });

  document.getElementById('lb-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(current + 1));
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-overlay').addEventListener('click', close);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Escape')     close();
  });

  // Touch/swipe support
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) show(diff > 0 ? current + 1 : current - 1);
  });
}

document.addEventListener('DOMContentLoaded', loadAllPartials);
