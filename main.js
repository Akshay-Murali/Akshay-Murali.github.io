// Theme toggle
const btn = document.getElementById('toggleTheme');
const html = document.documentElement;
btn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  btn.textContent = next === 'light' ? 'Dark' : 'Light';
});

// Mobile panel
const menuBtn = document.getElementById('menuBtn');
const panel = document.getElementById('mobilePanel');
menuBtn.addEventListener('click', () => {
  panel.classList.toggle('open');
  panel.setAttribute('aria-hidden', !panel.classList.contains('open'));
});
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
}));

// Smooth scroll fix for offset
function scrollWithOffset(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (hash.length > 1) {
      e.preventDefault();
      scrollWithOffset(hash);
    }
  });
});

// Animate skill bars when visible
const fills = document.querySelectorAll('.bar-fill');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute('data-level');
      entry.target.style.width = level + '%';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
fills.forEach(f => io.observe(f));

// 3D tilt effect
document.querySelectorAll('.project-card, .card').forEach(card => {
  const inner = card.querySelector('.project-inner') || card;
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ry = ((x / rect.width) - 0.5) * 18;
    const rx = ((y / rect.height) - 0.5) * -10;
    inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateX(0) rotateY(0)';
  });
});
