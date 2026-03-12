/* ─────────────────────────────────────────────────────────
   main.js — Institute of Digital Risk
   ───────────────────────────────────────────────────────── */

/* ─── NAV SCROLL STATE ───────────────────────────────────── */
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ─── HAMBURGER MENU ─────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a nav link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});


/* ─── SCROLL REVEAL ──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ─── CONTACT FORM ───────────────────────────────────────── */
const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic e-mail validation
  const emailInput = form.querySelector('#email');
  if (!emailInput.value.includes('@')) {
    emailInput.focus();
    return;
  }

  // Simulate async submission
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.value = '';
    });
    submitBtn.style.display = 'none';
    successMsg.style.display = 'block';
  }, 900);
});


/* ─── SMOOTH SCROLL (Safari < 15.4 fallback) ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
