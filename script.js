// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('open');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// "Open now" indicator — keep in sync with the hours listed in index.html.
// Each entry is [openHour, closeHour] in 24h local time; null means closed.
const HOURS = {
  0: null,      // Sunday
  1: [7, 18],
  2: [7, 18],
  3: [7, 18],
  4: [7, 18],
  5: [7, 18],
  6: [8, 16],   // Saturday
};

const status = document.getElementById('open-status');
const now = new Date();
const today = HOURS[now.getDay()];
const hour = now.getHours() + now.getMinutes() / 60;
const isOpen = today && hour >= today[0] && hour < today[1];
status.textContent = isOpen ? '● Open now' : '● Closed now — leave us a message';
status.classList.add(isOpen ? 'open' : 'closed');
status.hidden = false;

// Reveal-on-scroll animation
const revealTargets = document.querySelectorAll('.card, .section-head, .split > *, .contact-wrap > *');
if ('IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => observer.observe(el));
}

// Contact form: validate and submit via fetch (works with Formspree)
const form = document.querySelector('.contact-form');
const formStatus = form.querySelector('.form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';

  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    formStatus.textContent = 'Please fill in your name, phone, and a valid email.';
    formStatus.classList.add('error');
    return;
  }

  if (form.action.includes('YOUR_FORM_ID')) {
    formStatus.textContent = 'Form not connected yet — see README to set up submissions.';
    formStatus.classList.add('error');
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Request failed');
    form.reset();
    formStatus.textContent = "Thanks! We'll be in touch within one business day.";
    formStatus.classList.add('success');
  } catch {
    formStatus.textContent = 'Something went wrong. Please call us instead.';
    formStatus.classList.add('error');
  } finally {
    button.disabled = false;
    button.textContent = 'Request My Free Quote';
  }
});
