/* ============================================
   SCRIPT DE CONTROLE DA APRESENTAÇÃO
   ============================================ */

// Variável para rastrear o slide atual
let currentSlide = 1;

// Número total de slides (ajuste conforme necessário)
const totalSlides = 8;

/* ============================================
   FUNÇÃO: Mostrar um slide específico
   ============================================ */
function showSlide(n) {
    // Seleciona todos os elementos com a classe 'slide'
    const slides = document.querySelectorAll('.slide');
    
    // Validação: se o número do slide for maior que o total, volta para o primeiro
    if (n > totalSlides) {
        currentSlide = totalSlides;
    }
    
    // Validação: se o número do slide for menor que 1, volta para o último
    if (n < 1) {
        currentSlide = 1;
    }
    
    // Remove a classe 'active' de todos os slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Adiciona a classe 'active' ao slide atual
    slides[currentSlide - 1].classList.add('active');
    
    // Atualiza o número do slide exibido
    document.getElementById('slideNumber').textContent = currentSlide;
    
    // Atualiza os indicadores de slide (pontos)
    updateIndicators();
    
    // Atualiza o estado dos botões de navegação
    updateButtons();
}

/* ============================================
   FUNÇÃO: Ir para o próximo slide
   ============================================ */
function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

/* ============================================
   FUNÇÃO: Ir para o slide anterior
   ============================================ */
function previousSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

/* ============================================
   FUNÇÃO: Atualizar indicadores (pontos)
   ============================================ */
function updateIndicators() {
    // Seleciona todos os pontos indicadores
    const indicators = document.querySelectorAll('.indicator-dot');
    
    // Remove a classe 'active' de todos os indicadores
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Adiciona a classe 'active' ao indicador correspondente ao slide atual
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
    
    // Desabilita o botão anterior se estiver no primeiro slide
    prevBtn.disabled = currentSlide === 1;
    
    // Desabilita o botão próximo se estiver no último slide
    nextBtn.disabled = currentSlide === totalSlides;
}

/* ============================================
   FUNÇÃO: Criar indicadores dinamicamente
   ============================================ */
function createIndicators() {
    const indicatorsContainer = document.querySelector('.slide-indicators');
    
    // Cria um ponto indicador para cada slide
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        
        // Se for o primeiro slide, marca como ativo
        if (i === 1) {
            dot.classList.add('active');
        }
        
        // Adiciona evento de clique para ir direto ao slide
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
        
        // Adiciona o ponto ao container
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

// Executa quando o documento estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Cria os indicadores de slide
    createIndicators();
    
    // Mostra o primeiro slide
    showSlide(currentSlide);
    
    // Atualiza o total de slides no contador
    document.getElementById('totalSlides').textContent = totalSlides;
});

/* ============================================
   NOTAS PARA EDIÇÃO:
   ============================================
   
   1. ADICIONAR NOVOS SLIDES:
      - Adicione um novo <div class="slide"> no HTML
      - Incremente a variável 'totalSlides' aqui no script
      - Exemplo: const totalSlides = 9;
   
   2. EDITAR TEXTOS:
      - Abra o arquivo index.html
      - Procure pelo texto que deseja alterar
      - Substitua mantendo as tags HTML
   
   3. ADICIONAR IMAGENS:
      - Substitua as URLs de placeholder pelas suas imagens
      - Exemplo: style="background-image: url('sua-imagem.jpg');"
   
   4. PERSONALIZAR CORES:
      - Abra o arquivo styles.css
      - Procure por cores (ex: #667eea)
      - Substitua pelos códigos de cor desejados
   
   5. ADICIONAR MAIS FUNCIONALIDADES:
      - Você pode adicionar mais funções aqui
      - Mantenha a estrutura comentada para facilitar futuras edições
   
   ============================================ */
