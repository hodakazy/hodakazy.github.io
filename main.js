document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LOADER ===
    const counter = document.querySelector('.loader-counter');
    let count = 0;
    
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 5) + 2;
        if(count > 100) count = 100;
        counter.innerText = count.toString().padStart(3, '0');
        
        if(count === 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 500);
        }
    }, 30);

    // === 2. SMOOTH SCROLL (Lenis) ===
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // === 2.5. NAVIGATION ANCHOR SCROLLING (NEW) ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop the instant jump
            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                // If clicking the brand logo (href="#"), scroll to top
                lenis.scrollTo(0);
            } else {
                // Otherwise scroll to the specific section
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement);
                }
            }
        });
    });

    // === 3. PARALLAX IMAGE ===
    const parallaxImg = document.querySelector('.parallax-img img');
    if(parallaxImg) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            parallaxImg.style.transform = `translateY(${scroll * 0.15}px)`;
        });
    }

    // === 4. DISCORD COPY ===
    window.copyDiscord = () => {
        navigator.clipboard.writeText("hodakazy").then(() => alert("Discord Copied!"));
    }
    
    // === 5. HOVER EFFECTS ===
    if(window.matchMedia("(min-width: 769px)").matches) {
        const magnets = document.querySelectorAll('.magnet, .glitch-hover');
        magnets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});