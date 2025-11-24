
document.addEventListener('DOMContentLoaded', function () {
    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinkss = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinkss) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navLinkss.classList.toggle('active');
        });

        // Zavření při kliknutí na odkaz
        document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinkss.classList.remove('active');
            });
        });
    }

    // --- Time Display ---
    function zobrazCas() {
        const timeElement = document.getElementById("time");
        if (!timeElement) return;

        const ted = new Date(); // získá aktuální čas
        const hodiny = ted.getHours().toString().padStart(2, '0');
        const minuty = ted.getMinutes().toString().padStart(2, '0');

        const aktualniCas = `${hodiny}:${minuty}`;

        timeElement.style.opacity = 1; // zobrazí iPhone
        timeElement.textContent = `${aktualniCas}`;
    }

    // aktualizuje čas každou sekundu
    zobrazCas(); // Run immediately
    setInterval(zobrazCas, 2000);


    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });


    // --- Language Switcher ---
    const languege = document.getElementById("languege");
    if (languege) {
        languege.addEventListener("click", function (e) {
            if (languege.src.includes("en__flag.png")) {
                languege.src = "images/czech__flag.jpeg";
                window.location.href = "index-en.html"; // Redirect to Czech version
            } else {
                languege.src = "images/czech__flag.jpeg";
            }
        });
    }

    // --- Scroll Opacity for Header ---
    const logo = document.getElementById("logo");
    if (logo) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const maxScroll = 100; 
            const opacity = Math.max(0, 1 - (scrollPosition / maxScroll));
            logo.style.opacity = opacity;
        });
    }

    // --- Active Link Highlighting & Nav Indicator ---
    const a1 = document.getElementById("a1");
    const a2 = document.getElementById("a2");
    const a3 = document.getElementById("a3");
    const navIndicator = document.querySelector('.nav-indicator');

    function moveNavIndicator() {
        const active = document.querySelector('.nav-links .current-page');
        if (!active || !navIndicator) return;
        navIndicator.style.left = active.offsetLeft + 'px';
        navIndicator.style.width = active.offsetWidth + 'px';
        navIndicator.style.height = active.offsetHeight + 'px';
        navIndicator.style.top = active.offsetTop + 'px';
    }

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        if (a1 && a2 && a3) {
            // Always remove all first
            [a1, a2, a3].forEach(link => link.classList.remove("current-page"));

            if (scrollPosition < 1000) {
                a1.classList.add("current-page");
            }

            if (scrollPosition >= 1000 && scrollPosition < 2900) {
                a2.classList.add("current-page");
            }

            if (scrollPosition >= 2900 && scrollPosition < 3300) {
                a3.classList.add("current-page");
            }
        }

        moveNavIndicator();
    });

    // Initial position
    moveNavIndicator();
    // Update on resize
    window.addEventListener('resize', moveNavIndicator);


    // --- Resize Text Change ---
    function updateHoverText() {
        const hoverText = document.getElementById("text-najed-mysi");
        if (hoverText) {
            if (window.innerWidth <= 768) {
                hoverText.innerHTML = "KLIKNĚTE NA MĚ";
            } else {
                hoverText.innerHTML = "NAJEĎ MYŠÍ";
            }
        }
    }
    window.addEventListener("resize", updateHoverText);
    updateHoverText(); // Run on load


    // --- Box-2 3D Tilt Effect ---
    const box2 = document.querySelector('.box-2');
    if (box2) {
        let mouseX = 0;
        let mouseY = 0;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let isMobile = window.innerWidth <= 768;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            if (isMobile) return;

            mouseX = e.clientX;
            mouseY = e.clientY;

            // Calculate rotation and movement with increased sensitivity
            const rotateX = (mouseY - windowHeight / 2) / 20;
            const rotateY = (mouseX - windowWidth / 2) / 20;
            const moveX = (mouseX - windowWidth / 2) / 50;
            const moveY = (mouseY - windowHeight / 2) / 50;

            // Apply transform
            box2.style.transform = `
                translateX(calc(20% + ${moveX}px))
                translateY(${moveY}px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            isMobile = window.innerWidth <= 768;

            // Reset transform on mobile
            if (isMobile) {
                box2.style.transform = 'translateX(0)';
            }
        });

        // Initialize based on screen size
        if (isMobile) {
            box2.style.transform = 'translateX(0)';
        }
    }


    // --- Contact Form with EmailJS ---
    const form = document.getElementById('contactForm');
    if (form) { 
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');

        // !!! DOPLŇTE SVŮJ VEŘEJNÝ KLÍČ (PUBLIC KEY) !!!
        if (typeof emailjs !== 'undefined') {
            emailjs.init({
                publicKey: "AeCNEjCDUi7-UaV7D",
            });
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Zabrání výchozímu odeslání

            // === ZDE ZAČÍNÁ VYLEPŠENÁ VALIDACE POMOCÍ REGEX ===

            // Definice regulárních výrazů
            const nameRegex = /^[a-zA-Z\s\u00C0-\u017F]+$/; // Povolí písmena (včetně diakritiky) a mezery
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Jednoduchý, ale efektivní regex pro email
            const illegalCharsRegex = /[<>]/; // Hledá znaky < nebo >

            // Získání elementů a jejich hodnot
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Reset chybových hlášek
            document.getElementById('nameError').textContent = '';
            document.getElementById('messageError').textContent = '';
            document.getElementById('emailError').textContent = '';

            // Validace jména
            if (!nameRegex.test(nameInput.value.trim())) {
                document.getElementById('nameError').textContent = 'Jméno může obsahovat pouze písmena a mezery.';
                isValid = false;
            }

            // Validace e-mailu
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'Prosím, zadejte platný formát e-mailu.';
                isValid = false;
            }

            // Validace zprávy (délka a nepovolené znaky)
            if (messageInput.value.trim().length < 10) {
                document.getElementById('messageError').textContent = 'Zpráva musí mít alespoň 10 znaků.';
                isValid = false;
            } else if (illegalCharsRegex.test(messageInput.value)) {
                document.getElementById('messageError').textContent = 'Zpráva obsahuje nepovolené znaky (<, >).';
                isValid = false;
            }

            // Pokud formulář není validní, ukončíme odesílání
            if (!isValid) {
                return;
            }

            // === KONEC VALIDACE ===


            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline';

            // !!! DOPLŇTE SVÉ SERVICE ID A TEMPLATE ID !!!
            emailjs.sendForm('service_z65rmd3', 'template_7dicc4u', this)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Zpráva byla úspěšně odeslána!');
                    form.reset();
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset(); // Resetuje i reCAPTCHA
                    }
                }, function (error) {
                    console.log('FAILED...', error);
                    if (error.text && error.text.includes("reCAPTCHA")) {
                        alert('Prosím, potvrďte, že nejste robot.');
                    } else {
                        alert('Odeslání zprávy se nezdařilo. Zkuste to prosím později.');
                    }
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset();
                    }
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnSpinner.style.display = 'none';
                });
        });
    }
});

// Global function for scroll to contact (used in onclick attribute)
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}
