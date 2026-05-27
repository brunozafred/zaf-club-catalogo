/* ZAF CLUB — Landing Page JS */

/* ── HEADER SCROLL ──────────────────────────────────────── */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── CALCULATOR ─────────────────────────────────────────── */
const DISCOUNTS = {
  ingressos:    { rate: 0.50, unitPrice: 40,   isUnit: true  },
  medicamentos: { rate: 0.20, isUnit: false },
  cursos:       { rate: 0.25, isUnit: false },
  escolas:      { rate: 0.20, isUnit: false },
  restaurantes: { rate: 0.30, isUnit: false },
  academia:     { rate: 0.20, isUnit: false },
};

function formatBRL(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function updateSlider(input) {
  const key = input.dataset.key;
  const cfg = DISCOUNTS[key];
  const val = Number(input.value);
  const display = document.getElementById('val-' + key);

  if (cfg.isUnit) {
    display.textContent = val + (val === 1 ? ' ingresso' : ' ingressos');
  } else {
    display.textContent = formatBRL(val);
  }

  // gradient fill
  const pct = (val - input.min) / (input.max - input.min) * 100;
  input.style.background = `linear-gradient(to right, #1559d4 ${pct}%, #e2e8f4 ${pct}%)`;

  recalculate();
}

function recalculate() {
  let total = 0;

  document.querySelectorAll('.calc-range').forEach(input => {
    const key = input.dataset.key;
    const cfg = DISCOUNTS[key];
    const val = Number(input.value);

    if (cfg.isUnit) {
      total += val * cfg.unitPrice * cfg.rate;
    } else {
      total += val * cfg.rate;
    }
  });

  const resultEl = document.getElementById('calc-result-val');
  const yearEl   = document.getElementById('calc-result-year');

  // animate counter
  animateValue(resultEl, total);
  if (yearEl) yearEl.textContent = formatBRL(total * 12);
}

let animFrame;
function animateValue(el, target) {
  cancelAnimationFrame(animFrame);
  const current = parseFloat(el.dataset.current || 0);
  const diff = target - current;
  const duration = 300;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = current + diff * eased;
    el.textContent = formatBRL(value);
    el.dataset.current = value;
    if (progress < 1) animFrame = requestAnimationFrame(step);
  }

  animFrame = requestAnimationFrame(step);
}

/* init sliders */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.calc-range').forEach(input => {
    updateSlider(input);
    input.addEventListener('input', () => updateSlider(input));
  });

  recalculate();
});

/* ── SMOOTH SCROLL FOR CTAs ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
