/*
 * script.js
 *
 * Este archivo contiene la lógica de interactividad para la invitación de
 * Julieta. Incluye un observador de intersección para revelar las secciones
 * al hacer scroll, la implementación de la cuenta regresiva al evento y
 * un lightbox sencillo para visualizar las imágenes de la galería en
 * un tamaño más grande.
 */

document.addEventListener('DOMContentLoaded', () => {
  /*
   * IntersectionObserver para revelar las secciones suavemente cuando
   * entran en la vista. Mejora la percepción de dinamismo de la página.
   */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll('.section').forEach((section) => {
    revealObserver.observe(section);
  });

  /*
   * Función de cuenta regresiva al evento. Calcula la diferencia entre la
   * fecha objetivo y la fecha actual y actualiza los elementos del DOM.
   */
  const eventDate = new Date('2025-11-01T22:00:00-03:00');
  const dayEl = document.getElementById('days');
  const hourEl = document.getElementById('hours');
  const minEl = document.getElementById('minutes');
  const secEl = document.getElementById('seconds');
  const timerContainer = document.getElementById('timer');

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    if (diff <= 0) {
      timerContainer.innerHTML =
        "<p class='evento-ahora'>¡Hoy es el gran día!</p>";
      clearInterval(intervalId);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    dayEl.textContent = days.toString().padStart(2, '0');
    hourEl.textContent = hours.toString().padStart(2, '0');
    minEl.textContent = minutes.toString().padStart(2, '0');
    secEl.textContent = seconds.toString().padStart(2, '0');
  }

  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();

  /*
   * Lightbox para la galería. Crea un contenedor de overlay y permite
   * mostrar cada imagen en grande al hacer clic. Al hacer clic fuera
   * de la imagen o presionar la tecla Escape, el lightbox se cierra.
   */
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }

  lightbox.addEventListener('click', (e) => {
    // Cerrar si se hace clic fuera de la imagen
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});