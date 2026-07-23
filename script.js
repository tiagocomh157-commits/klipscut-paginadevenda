/* KlipsCut — Interactions */

// Smooth nav active states on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Nav background opacity on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(8,10,15,0.95)';
  } else {
    nav.style.background = 'rgba(8,10,15,0.8)';
  }
}, { passive: true });

// Intersection Observer for scroll-reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply reveal animation to cards
const revealElements = document.querySelectorAll(
  '.step-card, .benefit-card, .audience-card, .testimonial-card, .screenshot-card, .faq-item'
);

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 3) * 0.1}s, transform 0.5s ease ${(i % 3) * 0.1}s`;
  observer.observe(el);
});

// Garante que o hero-video sempre apareça (fallback para mobile)
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Força visibilidade do hero-video após 1s como fallback
  setTimeout(() => {
    const hv = document.querySelector('.hero-video');
    if (hv) {
      hv.style.opacity = '1';
      hv.style.transform = 'translateY(0)';
    }
  }, 1000);
});

// Play button click placeholder
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
  placeholder.addEventListener('click', () => {
    // Replace with actual video embed when available
    placeholder.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:3rem;">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#6c63ff,#8b5cf6);
          display:flex;align-items:center;justify-content:center;color:white;font-size:1.5rem;">▶</div>
        <p style="color:#7a8197;font-size:0.95rem;">Vídeo em breve. Adicione a URL do seu vídeo aqui.</p>
      </div>
    `;
  });
});

// Setas do carrossel de nichos (mobile only)
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const carouselOuter = document.querySelector('.carousel-outer');

if (prevBtn && nextBtn && carouselOuter) {
  const scrollAmount = 170; // largura do card + gap

  nextBtn.addEventListener('click', () => {
    carouselOuter.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    carouselOuter.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}
