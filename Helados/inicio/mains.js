// Animación de desplazamiento suave para los enlaces del menú
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animación al mostrar las cards de sabores al hacer scroll
const saborCards = document.querySelectorAll('.sabor-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.3 });

saborCards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

