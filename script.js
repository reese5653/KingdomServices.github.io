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

    const revealTargets = document.querySelectorAll('.quick-card, .service-card, .news-card, .tip-card, .learning-feature, .contact-form, .stat');
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
});
