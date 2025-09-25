document.addEventListener('DOMContentLoaded', () => {
  // === MENU HAMBURGER MOBILE ===
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('change', () => {
      if (menuToggle.checked) {
        nav.style.transform = 'scaleY(1)';
      } else {
        nav.style.transform = 'scaleY(0)';
      }
    });
  }

  // === SMOOTH SCROLL PARA LINKS INTERNOS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Fecha menu mobile ao clicar, se o toggle existir
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
        nav.style.transform = 'scaleY(0)';
      }
    });
  });

  // === ATUALIZA ANO NO RODAPÉ ===
  const ano = document.getElementById('ano');
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  // === FADE IN DOS ELEMENTOS AO SCROLL (opcional) ===
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // === CARROSSEL DA GALERIA ===
  const galleryGrid = document.querySelector('.gallery__grid');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (galleryGrid && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      const scrollAmount = galleryGrid.clientWidth * 0.9; // Rola 90% da largura visível
      galleryGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    prevBtn.addEventListener('click', () => {
      const scrollAmount = galleryGrid.clientWidth * 0.9;
      galleryGrid.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }

  // === HEADER ESCONDE AO ROLAR PARA BAIXO E MOSTRA AO SUBIR ===
  let lastScroll = 0;
  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll) {
        // rolando para baixo -> esconde
        header.classList.add("hidden");
      } else {
        // rolando para cima -> mostra
        header.classList.remove("hidden");
      }

      lastScroll = currentScroll;
    });

    // Faz aparecer quando passar o mouse no topo
    header.addEventListener("mouseenter", () => {
      header.classList.remove("hidden");
    });
  }
});
