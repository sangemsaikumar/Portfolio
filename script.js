/* =========================================================
   SANGEM SAI KUMAR – Portfolio Script
   ========================================================= */

'use strict';

/* ── TYPED HERO TEXT ───────────────────────────────────── */
const roles = [
  'DevOps Engineer',
  'Azure Cloud Engineer',
  'CI/CD Specialist',
  'Infrastructure Automator',
  'DevSecOps Enthusiast',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typedEl.textContent = current.slice(0, charIndex);

  let delay = isDeleting ? 55 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ── STICKY NAV ────────────────────────────────────────── */
const navHeader = document.getElementById('navHeader');
window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE MENU ───────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ─────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ── SKILL BAR ANIMATION ───────────────────────────────── */
const skillBars = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.getAttribute('data-width');
      bar.style.width = target + '%';
      skillObs.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObs.observe(bar));

/* ── ANIMATED STAT COUNTERS ────────────────────────────── */
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      let current = 0;
      const step = target / 40;
      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObs.observe(c));

/* ── SCROLL TO TOP ─────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent-cyan)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObs.observe(s));

/* ── CONTACT FORM ──────────────────────────────────────── */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in all required fields.';
      formNote.className = 'form-note error';
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      formNote.textContent = 'Please enter a valid email address.';
      formNote.className = 'form-note error';
      return;
    }

    // Simulate submission
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      formNote.textContent = '✓ Message sent! Sai Kumar will get back to you soon.';
      formNote.className = 'form-note success';
      setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 5000);
    }, 1200);
  });
}

/* ── SMOOTH HOVER TILT ON PROJECT CARD ─────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── TECH TAG HOVER RIPPLE ─────────────────────────────── */
document.querySelectorAll('.tech-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.background = 'rgba(0,180,216,0.15)';
    setTimeout(() => { tag.style.background = ''; }, 300);
  });
});

/* ── KEYBOARD FOCUS VISIBILITY ─────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
