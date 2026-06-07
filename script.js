// 1. Efeito de Scroll na Logo (Suave)
const logo = document.getElementById('logo');
if (logo) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Ajustei os valores para o efeito ser mais sutil e profissional
    const logoScale = Math.max(0.75, 1 - scrollY * 0.0008);
    const logoTranslateY = Math.min(scrollY * 0.12, 25);
    const logoOpacity = Math.max(0.85, 1 - scrollY * 0.001);
    
    logo.style.transform = `translateY(-${logoTranslateY}px) scale(${logoScale})`;
    logo.style.opacity = logoOpacity;
  });
}

// 2. Lógica do Carrossel
let currentSlide = 0;
const totalSlides = 4;
const track = document.getElementById('carousel-track');
const dots = document.querySelectorAll('.carousel-dot');
const currentCounter = document.getElementById('current-slide-counter');
const carouselContainer = document.getElementById('carousel-container');

function updateCarousel() {
  if (!track) return;
  
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      // Estilo Ativo (Azul Brilhante)git
      dot.className = "carousel-dot h-2.5 rounded-full transition-all duration-300 w-8 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]";
    } else {
      // Estilo Inativo (Slate Escuro)
      dot.className = "carousel-dot h-2.5 rounded-full transition-all duration-300 w-2.5 bg-slate-600 hover:bg-slate-400";
    }
  });

  if (currentCounter) {
    currentCounter.innerText = String(currentSlide + 1).padStart(2, '0');
  }
}

// Funções de Navegação
const nextSlide = () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
};

const prevSlide = () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
};

// 3. Autoplay Inteligente
let autoPlayInterval = setInterval(nextSlide, 8000); // 8 segundos é um tempo bom para leitura

if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  carouselContainer.addEventListener('mouseleave', () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 8000);
  });

  // 4. Suporte a toque no celular (Swipe)
  let touchStartX = 0;
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carouselContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const distance = touchStartX - touchEndX;
    if (distance > 50) nextSlide(); 
    if (distance < -50) prevSlide(); 
  }, { passive: true });
}

// 5. Cliques nos controles
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateCarousel();
  });
});