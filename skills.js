document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURACE DOVEDNOSTÍ ---
    const skills = [
        {
            name: "⚛️ React",
            description: "Moderní knihovna pro tvorbu dynamických a rychlých uživatelských rozhraní. Ideální pro single-page aplikace a komplexní komponenty.",
            icon: "images/react.png",
            color: { start: "#0a192f", end: "#003d7e", glow: "#61DAFB" }
        },
        {
            name: "📜 JavaScript",
            description: "Jazyk, který oživuje webové stránky. Od jednoduchých animací po složitou aplikační logiku na straně klienta i serveru (Node.js).",
            icon: "images/js.png",
            color: { start: "#2d2a0e", end: "#8d820b", glow: "#F7DF1E" }
        },
        {
            name: "🎨 HTML & CSS",
            description: "Základní stavební kameny každého webu. Sémantický HTML5 a moderní CSS3 s použitím Flexbox, Grid a vlastních animací.",
            icon: "images/htmlcss.png",
            color: { start: "#3e1a0b", end: "#a43d11", glow: "#E34F26" }
        },
        {
            name: "🖌️ UI/UX Design",
            description: "Design zaměřený na člověka. Věřím, že dobrý produkt je nejen funkční, ale i intuitivní a esteticky příjemný. Používám nástroje jako Figma.",
            icon: "images/pallete.png",
            color: { start: "#241031", end: "#651c8a", glow: "#A259FF" }
        }
    ];

    // --- ELEMENTY ---
    const prevButton = document.getElementById('prev-skill');
    const nextButton = document.getElementById('next-skill');
    const skillTitleHighlight = document.getElementById('skill-title-highlight');
    const skillNameEl = document.getElementById('skill-name');
    const skillDescriptionEl = document.getElementById('skill-description');
    const orbit = document.getElementById('skills-orbit');
    const body = document.body;
    let currentSkillIndex = 0;

    if (!orbit) return; // Exit if not on skills page

    // --- INICIALIZACE ORBITU ---
    const totalSkills = skills.length;
    skills.forEach((skill, index) => {
        const skillNode = document.createElement('div');
        skillNode.className = 'skill-node';
        skillNode.dataset.skill = index;

        // ** THE FIX IS HERE: Use a CSS variable for the rotation **
        skillNode.style.setProperty('--node-rotation-angle', `${(360 / totalSkills) * index}deg`);

        const skillIcon = document.createElement('img');
        skillIcon.src = skill.icon;
        skillIcon.alt = `${skill.name.split(" ")[1]} icon`;
        skillNode.appendChild(skillIcon);

        orbit.appendChild(skillNode);

        skillNode.addEventListener('click', () => {
            if (index !== currentSkillIndex) {
                updateCarousel(index);
            }
        });
    });

    const skillNodes = document.querySelectorAll('.skill-node');

    // --- FUNKCE PRO AKTUALIZACI KARUSELU ---
    function updateCarousel(newIndex, isInitial = false) {
        const oldIndex = currentSkillIndex;
        currentSkillIndex = newIndex;

        const skillData = skills[currentSkillIndex];

        // 1. Aktualizace CSS proměnných pro barvy
        body.style.setProperty('--glow-color', skillData.color.glow);
        body.style.setProperty('--bg-color-start', skillData.color.start);

        // 2. Aktualizace textu s animací
        const skillCard = document.querySelector('.skill-card');
        if (skillCard) {
            skillCard.classList.remove('active');

            setTimeout(() => {
                skillNameEl.innerHTML = skillData.name;
                skillDescriptionEl.innerText = skillData.description;
                skillTitleHighlight.innerText = skillData.name.split(" ")[1] || skillData.name;
                skillCard.classList.add('active');
            }, isInitial ? 0 : 250);
        }

        // 3. Aktualizace aktivní ikony v orbitu
        if (!isInitial && skillNodes[oldIndex]) skillNodes[oldIndex].classList.remove('active');
        if (skillNodes[currentSkillIndex]) skillNodes[currentSkillIndex].classList.add('active');

        // 4. Rotace orbitu
        const rotationAngle = -(360 / totalSkills) * currentSkillIndex;
        orbit.style.transform = `rotateY(${rotationAngle}deg) rotateX(10deg)`;
    }

    // --- EVENT LISTENERY ---
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const nextIndex = (currentSkillIndex + 1) % totalSkills;
            updateCarousel(nextIndex);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const prevIndex = (currentSkillIndex - 1 + totalSkills) % totalSkills;
            updateCarousel(prevIndex);
        });
    }

    // --- OBSLUHA MODÁLNÍHO OKNA PRO CERTIFIKÁTY ---
    const openModalBtn = document.querySelector('.certificate-link');
    const closeModalBtn = document.querySelector('.modal-close');
    const modalOverlay = document.getElementById('certificates-modal');

    if (openModalBtn && modalOverlay) {
        openModalBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Zabrání výchozí akci odkazu (posun na #)
            modalOverlay.classList.add('active');
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            // Zavře okno pouze pokud se klikne na pozadí (overlay), ne na obsah
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }


    // --- INICIALIZACE ---
    updateCarousel(0, true);

    // --- CANVAS PARTICLE ANIMATION ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) { // Check if canvas exists
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x; this.y = y; this.directionX = dirX; this.directionY = dirY;
                this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX; this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            const glowRgb = getComputedStyle(body).getPropertyValue('--glow-color').trim();
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = Math.random() * (innerWidth - size * 2) + size * 2;
                const y = Math.random() * (innerHeight - size * 2) + size * 2;
                const dirX = (Math.random() * 0.4) - 0.2;
                const dirY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, dirX, dirY, size, `rgba(${hexToRgb(glowRgb)}, 0.6)`));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            particlesArray.forEach(p => p.update());
        }

        function hexToRgb(hex) {
            let r = 0, g = 0, b = 0;
            if (hex.length == 4) { r = parseInt(hex[1] + hex[1], 16); g = parseInt(hex[2] + hex[2], 16); b = parseInt(hex[3] + hex[3], 16); }
            else if (hex.length == 7) { r = parseInt(hex.substring(1, 3), 16); g = parseInt(hex.substring(3, 5), 16); b = parseInt(hex.substring(5, 7), 16); }
            return `${r},${g},${b}`;
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                canvas.width = innerWidth;
                canvas.height = innerHeight;
                initParticles();
            }, 250);
        });

        new MutationObserver(initParticles).observe(body, { attributes: true, attributeFilter: ['style'] });

        initParticles();
        animateParticles();
    }
});
