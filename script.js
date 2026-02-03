/* ============================================
   SCRIPT DE CONTROLE DA APRESENTAÇÃO
   ============================================ */

// Variável para rastrear o slide atual (1-based)
let currentSlide = 1;

// Número total de slides (AJUSTE AQUI se mudar a quantidade)
const totalSlides = 7;

/* ============================================
   FUNÇÃO: Mostrar um slide específico
   ============================================ */
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    // Corrige n para ficar dentro do intervalo [1, totalSlides]
    if (n > totalSlides) {
        currentSlide = totalSlides;
    } else if (n < 1) {
        currentSlide = 1;
    } else {
        currentSlide = n;
    }

    // Esconde todos os slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Garante que o índice existe antes de usar
    if (slides[currentSlide - 1]) {
        slides[currentSlide - 1].classList.add('active');
    }

    // Atualiza número do slide exibido
    const slideNumberEl = document.getElementById('slideNumber');
    if (slideNumberEl) {
        slideNumberEl.textContent = currentSlide;
    }

    // Atualiza indicadores (pontos)
    updateIndicators();

    // Atualiza estado dos botões
    updateButtons();
}

/* ============================================
   FUNÇÃO: Ir para o próximo slide
   ============================================ */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/* ============================================
   FUNÇÃO: Ir para o slide anterior
   ============================================ */
function previousSlide() {
    showSlide(currentSlide - 1);
}

/* ============================================
   FUNÇÃO: Atualizar indicadores (pontos)
   ============================================ */
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator-dot');

    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    if (indicators[currentSlide - 1]) {
        indicators[currentSlide - 1].classList.add('active');
    }
}

/* ============================================
   FUNÇÃO: Atualizar estado dos botões
   ============================================ */
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
    }
}

/* ============================================
   FUNÇÃO: Criar indicadores dinamicamente
   ============================================ */
function createIndicators() {
    const indicatorsContainer = document.querySelector('.slide-indicators');
    if (!indicatorsContainer) return;

    // Limpa indicadores antigos (caso recarregue)
    indicatorsContainer.innerHTML = '';

    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';

        if (i === 1) {
            dot.classList.add('active');
        }

        dot.addEventListener('click', () => {
            showSlide(i);
        });

        indicatorsContainer.appendChild(dot);
    }
}

/* ============================================
   FUNÇÃO: Controle por teclado
   ============================================ */
document.addEventListener('keydown', (event) => {
    // Seta para a direita ou Enter: próximo slide
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
        if (currentSlide < totalSlides) {
            nextSlide();
        }
    }

    // Seta para a esquerda: slide anterior
    if (event.key === 'ArrowLeft') {
        if (currentSlide > 1) {
            previousSlide();
        }
    }
});

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Cria os indicadores de slide
    createIndicators();

    // Mostra o primeiro slide
    showSlide(currentSlide);

    // Atualiza o total de slides no contador
    const totalSlidesEl = document.getElementById('totalSlides');
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides;
    }
});

/* ============================================
   NOTAS PARA EDIÇÃO:
   ============================================
   1. ADICIONAR NOVOS SLIDES:
      - Adicione um novo <div class="slide"> no HTML
      - Atualize a constante 'totalSlides' aqui no script

