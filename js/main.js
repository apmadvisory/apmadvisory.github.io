// ===================================
// Navigation Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Mobile Menu Toggle
// ===================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navLinks.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });
}

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===================================
// Card Hover Effects Enhancement
// ===================================

const cards = document.querySelectorAll('.service-card, .team-member, .value-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinksItems.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('#')[0];

        // Don't add active class to anchor links (like Contact)
        const isAnchorLink = href.includes('#') && linkPage !== '';

        if (!isAnchorLink && (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active link on page load
setActiveNavLink();

// ===================================
// Button Ripple Effect
// ===================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===================================
// Performance: Debounce Scroll Events
// ===================================

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any additional scroll-based operations can go here
});

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Lazy Loading Images (if needed in future)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c APM Consultancy ', 'background: #1a9b8e; color: white; font-size: 20px; padding: 10px;');
console.log('%c Driving Results — Maximizing Impact ', 'color: #1a9b8e; font-size: 14px;');

// ===================================
// Portfolio and Data Security Links
// ===================================

// Portfolio Link Handler
const portfolioLink = document.getElementById('portfolioLink');
if (portfolioLink) {
    portfolioLink.addEventListener('click', function (e) {
        e.preventDefault();
        // TODO: Replace with actual Google Drive portfolio link
        const portfolioUrl = 'https://drive.google.com/drive/folders/YOUR_PORTFOLIO_FOLDER_ID';
        alert('Portfolio link will be connected to Google Drive. Please update the URL in main.js');
        // Uncomment the line below once you have the actual URL
        // window.open(portfolioUrl, '_blank');
    });
}

// Data Security Link Handler
const dataSecurityLink = document.getElementById('dataSecurityLink');
if (dataSecurityLink) {
    dataSecurityLink.addEventListener('click', function (e) {
        e.preventDefault();
        // TODO: Replace with actual Google Drive data security documentation link
        const dataSecurityUrl = 'https://drive.google.com/drive/folders/YOUR_DATA_SECURITY_FOLDER_ID';
        alert('Data Security documentation link will be connected to Google Drive. Please update the URL in main.js');
        // Uncomment the line below once you have the actual URL
        // window.open(dataSecurityUrl, '_blank');
    });
}
