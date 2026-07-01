// PIANO PIANO — interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Generate piano-key dividers */
  document.querySelectorAll('.piano-divider').forEach(el => {
    const count = window.innerWidth < 700 ? 26 : 46;
    for (let i = 0; i < count; i++) {
      const key = document.createElement('span');
      el.appendChild(key);
    }
  });

  /* Header solid on scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* Menu sub-nav active state + smooth offset scroll */
  const menuNavLinks = document.querySelectorAll('.menu-nav a');
  if (menuNavLinks.length) {
    const sections = Array.from(menuNavLinks).map(a => document.querySelector(a.getAttribute('href')));
    const setActive = () => {
      let current = sections[0];
      sections.forEach(s => { if (s && window.scrollY >= s.offsetTop - 160) current = s; });
      menuNavLinks.forEach(a => a.classList.remove('active'));
      const idx = sections.indexOf(current);
      if (menuNavLinks[idx]) menuNavLinks[idx].classList.add('active');
    };
    setActive();
    window.addEventListener('scroll', setActive, { passive:true });
  }

  /* Lightbox for gallery */
  const galleryLinks = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.querySelector('.lightbox');
  if (galleryLinks.length && lightbox) {
    const lbImg = lightbox.querySelector('img');
    galleryLinks.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        lbImg.src = el.getAttribute('data-lightbox');
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }
});
