// Theme toggle
// Theme toggle with icon
const themeBtn = document.getElementById('themeToggle');
const themeIcon = themeBtn.querySelector('.icon');
const html = document.documentElement;

themeBtn.addEventListener('click', () => {
  const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', nextTheme);
  themeIcon.textContent = nextTheme === 'light' ? '🌞' : '🌙';
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

// === NEON MOUSE TRAIL ===
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("trail-container");
  const maxDots = 30; // controls trail length
  let dots = [];

  window.addEventListener("mousemove", (e) => {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    dot.style.left = e.pageX + "px";
    dot.style.top = e.pageY + "px";
    container.appendChild(dot);
    dots.push(dot);

    // Remove extra dots for smooth fade
    if (dots.length > maxDots) {
      const old = dots.shift();
      old.remove();
    }

    // Auto-remove after fadeOut animation
    setTimeout(() => {
      dot.remove();
      dots = dots.filter(d => d !== dot);
    }, 800);
  });
});

// === Neon Glow Tracking for All Sections ===
document.querySelectorAll("section").forEach(section => {
  section.addEventListener("mousemove", e => {
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--x", `${e.clientX - rect.left}px`);
    section.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  section.addEventListener("mouseleave", () => {
    section.style.removeProperty("--x");
    section.style.removeProperty("--y");
  });
});

// === Multicolor Dynamic Typewriter ===
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".typewriter");
  if (!el) return;

  const phrases = [
    { text: "Educator", colorClass: "color-edu" },
    { text: "Business Analyst", colorClass: "color-analyst" },
    { text: "Developer", colorClass: "color-dev" }
      ];

  let i = 0;  // phrase index
  let j = 0;  // character index
  let current = "";
  let isDeleting = false;

  function type() {
    const phrase = phrases[i];
    el.className = `typewriter ${phrase.colorClass}`; // apply color dynamically

    if (!isDeleting) {
      current = phrase.text.slice(0, j++);
      el.textContent = current;
      if (j > phrase.text.length) {
        isDeleting = true;
        setTimeout(type, 1500); // pause before deleting
        return;
      }
    } else {
      current = phrase.text.slice(0, j--);
      el.textContent = current;
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length; // next phrase
      }
    }

    const speed = isDeleting ? 60 : 100; // adjust typing/deleting speed
    setTimeout(type, speed);
  }

  type();
});



