document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Header (mantido igual)
    let lastScroll = 0;
    const header = document.getElementById('header');
    const headerHeight = header.offsetHeight;
    let ticking = false;
    let isHidden = false;
    const scrollThreshold = 10;

    function updateHeader(scrollPos) {
        const scrollDelta = scrollPos - lastScroll;
        
        if (scrollPos <= headerHeight) {
            header.classList.remove('hidden', 'visible');
            isHidden = false;
            return;
        }

        if (scrollDelta > 5 && scrollPos > scrollThreshold && !isHidden) {
            header.classList.add('hidden');
            header.classList.remove('visible');
            isHidden = true;
        } else if (scrollDelta < -5 && isHidden) {
            header.classList.add('visible');
            header.classList.remove('hidden');
            isHidden = false;
        }
    }

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader(currentScroll);
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // SOLUÇÃO DEFINITIVA PARA OS CARDS
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Impede que o clique em links dentro do card ative a função
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            // Fecha todos os cards
            pricingCards.forEach(otherCard => {
                otherCard.classList.remove('active');
                otherCard.style.transform = 'translateY(0)'; // Reseta a transformação
            });
            
            // Abre apenas o card clicado
            this.classList.add('active');
            this.style.transform = 'translateY(-10px)';
            
            e.stopPropagation();
        });
    });

    // Fechar cards ao clicar fora
    document.addEventListener('click', function() {
        pricingCards.forEach(card => {
            card.classList.remove('active');
            card.style.transform = 'translateY(0)';
        });
    });

    // Restante do código mantido igual...
    // (smooth scroll, current year, animate on scroll, etc.)
});