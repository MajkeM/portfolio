document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.box-4-interest-container');
    const interests = document.querySelectorAll('.box-4-interest');
    const dotsContainer = document.querySelector('.carousel-nav');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentIndex = 0;
    const totalSlides = interests.length;

    // Create dots
    interests.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }

    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}); 