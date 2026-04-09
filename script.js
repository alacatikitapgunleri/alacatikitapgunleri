/* =========================================================
   ALAÇATI KİTAP GÜNLERİ — Shared JavaScript
   ========================================================= */

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
}

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
}

// Subtle parallax on hero shapes
const shapes = document.querySelectorAll('.shape');
if (shapes.length) {
  shapes.forEach(s => { s.dataset.base = s.style.transform || ''; });
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    shapes.forEach((shape, i) => {
      const depth = (i + 1) * 3;
      shape.style.transform = `${shape.dataset.base} translate(${x * depth}px, ${y * depth}px)`;
    });
  }, { passive: true });
}

// Program page tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const daySections = document.querySelectorAll('.day-section');
if (tabBtns.length && daySections.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      tabBtns.forEach(b => b.classList.remove('active'));
      daySections.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(`day-${day}`);
      if (target) target.classList.add('active');
    });
  });

  // Hash navigation: program.html#gun2
  const hash = window.location.hash;
  if (hash) {
    const dayMatch = hash.match(/gun(\d)/);
    if (dayMatch) {
      const day = dayMatch[1];
      const btn = document.querySelector(`.tab-btn[data-day="${day}"]`);
      if (btn) btn.click();
    }
  }
}

// Contact form submission (mailto fallback)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const mailSubject = subject || `İletişim formu — ${name}`;
    const mailBody = `İsim: ${name}%0D%0AE-posta: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    const mailto = `mailto:info@alacatikitapgunleri.com?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`;

    window.location.href = mailto;

    const success = document.getElementById('formSuccess');
    if (success) {
      success.classList.add('show');
      setTimeout(() => {
        contactForm.reset();
        success.classList.remove('show');
      }, 5000);
    }
  });
}
