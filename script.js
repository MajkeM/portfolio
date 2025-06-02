document.addEventListener('DOMContentLoaded', () => {
    // Get all elements that need animation
    const box1 = document.querySelector('.box-1');
    const box2 = document.querySelector('.box-2');
    const iphone = document.querySelector('#iphone');
    const edges = document.querySelectorAll('.edge1, .edge2, .edge3, .edge4');
    const header = document.querySelector('header');
    const navGrey = document.querySelector('.nav-grey');

    // Initial state - hide all elements
    box1.style.opacity = '0';
    box2.style.opacity = '0';
    iphone.style.opacity = '0';
    edges.forEach(edge => edge.style.opacity = '0');
    header.style.opacity = '0';
    navGrey.style.opacity = '0';

    // Start the animation sequence
    const startAnimation = () => {
        // First, show box-1 in center
        box1.style.opacity = '1';
        
        // After 2 seconds, start the sequence
        setTimeout(() => {
            // Slide box-1 to left
            box1.style.transform = window.innerWidth <= 992 ? 'translateY(0)' : 'translateX(0)';

            // After box-1 slides, start other animations
            setTimeout(() => {
                // Slide box-2 in
                box2.style.opacity = '1';
                box2.style.transform = window.innerWidth <= 992 ? 'translateY(0)' : 'translateX(20%)';
                
                // Show iPhone
                iphone.style.opacity = '1';

                // Animate edges in sequence
                edges.forEach((edge, index) => {
                    setTimeout(() => {
                        edge.style.opacity = '1';
                    }, index * 100); // 100ms delay between each edge
                });

                // Animate navbar
                setTimeout(() => {
                    header.style.opacity = '1';
                    setTimeout(() => {
                        navGrey.style.opacity = '1';
                    }, 100);
                }, 300);
            }, 1200); // Wait for box-1 to finish sliding
        }, 2000); // Initial 2 second delay
    };

    // Start the animation sequence
    startAnimation();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (box2.style.opacity === '1') {
            box2.style.transform = window.innerWidth <= 992 ? 'translateY(0)' : 'translateX(20%)';
        }
    });
}); 