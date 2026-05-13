document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a, .footer-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu && navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 84;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value || 'Friend';
            const email = document.getElementById('email')?.value || '';
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
            contactForm.reset();
        });
    }

    const updateNavbar = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar);

    const revealTargets = document.querySelectorAll('.quick-card, .service-card, .gallery-card, .news-card, .tip-card, .learning-feature, .contact-form, .stat');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });

    revealTargets.forEach(el => {
        el.classList.add('pre-reveal');
        observer.observe(el);
    });

    const setupCarousel = (carouselElement, delay = 3500) => {
        const track = carouselElement.querySelector('.gallery-track');
        const slides = track ? Array.from(track.querySelectorAll('.gallery-card')) : [];
        const dots = carouselElement.querySelector('.gallery-dots');

        if (!track || !slides.length) return;

        let currentIndex = 0;
        let rotateTimer;

        const setActiveSlide = (index) => {
            const nextIndex = ((index % slides.length) + slides.length) % slides.length;
            currentIndex = nextIndex;
            track.style.transform = `translateX(-${nextIndex * 100}%)`;

            if (dots) {
                Array.from(dots.children).forEach((dot, dotIndex) => {
                    dot.classList.toggle('active', dotIndex === nextIndex);
                });
            }
        };

        if (dots) {
            dots.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'gallery-dot';
                dot.setAttribute('aria-label', `Show slide ${index + 1}`);
                dot.addEventListener('click', () => {
                    setActiveSlide(index);
                    restartRotation();
                });
                dots.appendChild(dot);
            });
        }

        const restartRotation = () => {
            clearInterval(rotateTimer);
            rotateTimer = setInterval(() => {
                setActiveSlide(currentIndex + 1);
            }, delay);
        };

        setActiveSlide(0);
        restartRotation();

        carouselElement.addEventListener('mouseenter', () => clearInterval(rotateTimer));
        carouselElement.addEventListener('mouseleave', restartRotation);
        window.addEventListener('focus', restartRotation);
        window.addEventListener('blur', () => clearInterval(rotateTimer));
    };

    document.querySelectorAll('.gallery-carousel, .board-carousel').forEach(carousel => {
        setupCarousel(carousel, carousel.classList.contains('board-carousel') ? 3300 : 3500);
    });
});
