// ==================== DOM ELEMENTS ====================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const heroBg = document.getElementById('heroBg');
const contactForm = document.getElementById('contactForm');

// ==================== MOBILE MENU TOGGLE ====================
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('open');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ==================== PARALLAX HERO BACKGROUND ====================
function updateParallax() {
    if (heroBg && window.innerWidth > 768) {
        const scrollY = window.scrollY;
        const speed = 0.4;
        heroBg.style.transform = `translateY(${scrollY * speed}px)`;
    }
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==================== SCROLL REVEAL (Intersection Observer) ====================
const revealOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ==================== COUNTER ANIMATION ====================
const counterOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.3,
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, counterOptions);

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// ==================== CONTACT FORM HANDLING ====================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i data-lucide="loader" class="inline-block w-5 h-5 mr-2 animate-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="check-circle" class="inline-block w-5 h-5 mr-2"></i> Message Sent!';
            submitBtn.classList.add('bg-[#10B981]', 'from-[#10B981]', 'to-[#059669]');

            // Reset form
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-[#10B981]', 'from-[#10B981]', 'to-[#059669]');
                lucide.createIcons();
            }, 3000);

            lucide.createIcons();
        }, 1500);
    });
}

// ==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        e.preventDefault();
        const target = document.querySelector(targetId);

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});

// ==================== COMBINED SCROLL LISTENER (Throttled) ====================
let ticking = false;

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavbar();
            updateParallax();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==================== INITIAL SETUP ====================
function init() {
    updateNavbar();
    updateParallax();
    updateActiveNavLink();

    // Re-initialize Lucide icons (in case any were added dynamically)
    lucide.createIcons();
}

// Run on load
window.addEventListener('DOMContentLoaded', init);

// ==================== RESIZE HANDLER ====================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateParallax();
    }, 100);
});

// ==================== KEYBOARD NAVIGATION (Accessibility) ====================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});

// ==================== FOCUS TRAP FOR MOBILE MENU ====================
mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && isMenuOpen) {
        const focusableElements = mobileMenu.querySelectorAll('a');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

// ==================== LAZY LOAD IMAGES (Native) ====================
if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
}

console.log('%c⚽ IJABALL School of Thought %c— Premium Football Coaching',
    'font-size: 18px; font-weight: bold; color: #D4AF37;',
    'font-size: 12px; color: #10B981;');
console.log('%cCoach Daniel Ogunmodede Precious %c| %cBuilt with passion.',
    'color: #fff;', 'color: #D4AF37;', 'color: #aaa;');