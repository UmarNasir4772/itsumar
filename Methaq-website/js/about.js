/**
 * About Page JavaScript
 * Methaq Almajara Technical Service LLC - Dubai
 * Version: 1.0.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCounterAnimation();
    initTimelineAnimation();
    initTeamHoverEffects();
    initCertificationCards();
    initLazyLoading();
    initAccessibilityFeatures();
    initScrollAnimations();
});

/**
 * Initialize Counter Animation for Statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (!counters.length || !isElementInViewport(counters[0])) {
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.replace(/[0-9]/g, '');
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Initialize Timeline Animation
 */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineItems.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('timeline-item-visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
    
    // Add CSS class for animations
    addTimelineAnimationStyles();
}

/**
 * Add timeline animation styles dynamically
 */
function addTimelineAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.timeline-item-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd).timeline-item-visible .timeline-content {
            animation: slideInRight 0.6s ease forwards;
        }
        
        .timeline-item:nth-child(even).timeline-item-visible .timeline-content {
            animation: slideInLeft 0.6s ease forwards;
        }
        
        .timeline-item.timeline-item-visible .timeline-icon {
            animation: bounceIn 0.6s ease forwards;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: translateX(-50%) scale(0.3);
            }
            50% {
                opacity: 1;
                transform: translateX(-50%) scale(1.05);
            }
            70% {
                transform: translateX(-50%) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Team Hover Effects
 */
function initTeamHoverEffects() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        // Add touch support for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('team-card-touch');
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('team-card-touch');
        }, { passive: true });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('team-card-active');
            }
        });
        
        // Add focus styles for accessibility
        card.addEventListener('focus', function() {
            this.classList.add('team-card-focused');
        });
        
        card.addEventListener('blur', function() {
            this.classList.remove('team-card-focused');
        });
    });
    
    // Add team card active styles
    addTeamCardStyles();
}

/**
 * Add team card active styles
 */
function addTeamCardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .team-card-focused {
            outline: 3px solid var(--secondary-color);
            outline-offset: 2px;
        }
        
        .team-card-active .team-overlay {
            opacity: 1 !important;
        }
        
        @media (hover: none) and (pointer: coarse) {
            .team-overlay {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Certification Cards Interaction
 */
function initCertificationCards() {
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
        // Add click to expand functionality
        card.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                this.classList.toggle('certification-card-expanded');
            }
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('certification-card-expanded');
            }
        });
    });
    
    // Add certification card expanded styles
    addCertificationCardStyles();
}

/**
 * Add certification card expanded styles
 */
function addCertificationCardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .certification-card {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .certification-card-expanded {
            transform: scale(1.05) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
            z-index: 10;
        }
        
        .certification-card-expanded .certification-desc {
            max-height: 500px;
            opacity: 1;
        }
        
        .certification-desc {
            max-height: 100px;
            overflow: hidden;
            transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        
        @media (min-width: 768px) {
            .certification-card:hover .certification-desc {
                max-height: 500px;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Lazy Loading for Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', function() {
                    this.classList.add('image-loaded');
                });
            }
        });
    } else {
        // Fallback for older browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('image-loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Add loading animation styles
    addLoadingStyles();
}

/**
 * Add loading animation styles
 */
function addLoadingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.image-loaded {
            opacity: 1;
        }
        
        .loading-placeholder {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add skip to content functionality
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.setAttribute('tabindex', '-1');
                target.focus();
                setTimeout(() => {
                    target.removeAttribute('tabindex');
                }, 1000);
            }
        });
    }
    
    // Add ARIA live regions for dynamic content
    addAriaLiveRegions();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

/**
 * Add ARIA live regions for announcements
 */
function addAriaLiveRegions() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
}

/**
 * Enhance focus management
 */
function initAccessibilityFeatures() {
    // Add skip to content functionality
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.setAttribute('tabindex', '-1');
                target.focus();
                setTimeout(() => {
                    target.removeAttribute('tabindex');
                }, 1000);
            }
        });
    }
    
    // Add ARIA live regions for dynamic content
    addAriaLiveRegions();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Add focus visible polyfill if needed
    addFocusVisiblePolyfill();
}

/**
 * Add ARIA live regions for announcements
 */
function addAriaLiveRegions() {
    if (!document.getElementById('aria-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
    }
}

/**
 * Enhance focus management for better accessibility
 */
function enhanceFocusManagement() {
    // Add focus styles to all interactive elements
    const interactiveElements = document.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]'
    );
    
    interactiveElements.forEach(el => {
        if (!el.hasAttribute('tabindex') && !el.matches('a, button, input, select, textarea')) {
            el.setAttribute('tabindex', '0');
        }
    });
    
    // Trap focus in modals (if any modals are added later)
    document.addEventListener('keydown', trapFocus);
    
    // Add focus visible styles
    addFocusVisibleStyles();
}

/**
 * Add focus visible styles for better accessibility
 */
function addFocusVisibleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        :focus-visible {
            outline: 3px solid var(--secondary-color) !important;
            outline-offset: 2px !important;
        }
        
        button:focus-visible,
        a:focus-visible,
        [tabindex]:focus-visible {
            position: relative;
            z-index: 1000;
        }
        
        /* Fallback for browsers without :focus-visible */
        .focus-visible {
            outline: 3px solid var(--secondary-color) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Add focus visible polyfill for older browsers
 */
function addFocusVisiblePolyfill() {
    // Only load if needed
    if (!CSS.supports('selector(:focus-visible)')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js';
        script.defer = true;
        document.head.appendChild(script);
    }
}

/**
 * Trap focus in modal (if modals are added)
 */
function trapFocus(e) {
    const modals = document.querySelectorAll('.modal.show');
    if (!modals.length) return;
    
    const currentModal = modals[modals.length - 1];
    const focusableElements = currentModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
    
    if (e.key === 'Escape') {
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
}

/**
 * Add keyboard shortcuts for power users
 */
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Skip if user is typing in an input field
        if (e.target.matches('input, textarea, select')) return;
        
        // 1 - Skip to main content
        if (e.key === '1' && e.altKey) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.focus();
            }
        }
        
        // C - Scroll to certifications
        if (e.key === 'c' && e.altKey) {
            e.preventDefault();
            const certifications = document.querySelector('.certifications');
            if (certifications) {
                certifications.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // T - Scroll to team
        if (e.key === 't' && e.altKey) {
            e.preventDefault();
            const team = document.querySelector('.leadership-team');
            if (team) {
                team.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Add keyboard shortcuts help
    addKeyboardShortcutsHelp();
}

/**
 * Add keyboard shortcuts help modal
 */
function addKeyboardShortcutsHelp() {
    const helpButton = document.createElement('button');
    helpButton.className = 'keyboard-help-btn sr-only';
    helpButton.textContent = '?';
    helpButton.setAttribute('aria-label', 'Show keyboard shortcuts');
    helpButton.setAttribute('title', 'Press Alt + ? to show keyboard shortcuts');
    
    helpButton.addEventListener('click', showKeyboardShortcuts);
    document.body.appendChild(helpButton);
    
    // Add keyboard shortcut to show help (Alt + ?)
    document.addEventListener('keydown', function(e) {
        if (e.key === '?' && e.altKey) {
            e.preventDefault();
            showKeyboardShortcuts();
        }
    });
}

/**
 * Show keyboard shortcuts dialog
 */
function showKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Alt + 1', action: 'Skip to main content' },
        { key: 'Alt + T', action: 'Go to Team section' },
        { key: 'Alt + C', action: 'Go to Certifications' },
        { key: 'Alt + ?', action: 'Show this help dialog' }
    ];
    
    let html = `
        <div class="keyboard-shortcuts-modal">
            <div class="modal-content">
                <h3>Keyboard Shortcuts</h3>
                <p>Use these shortcuts for faster navigation:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Shortcut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    shortcuts.forEach(shortcut => {
        html += `
            <tr>
                <td><kbd>${shortcut.key}</kbd></td>
                <td>${shortcut.action}</td>
            </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
                <button class="close-btn" aria-label="Close keyboard shortcuts">
                    Close
                </button>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.innerHTML = html;
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-shortcuts-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .keyboard-shortcuts-modal .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
        }
        
        .keyboard-shortcuts-modal h3 {
            margin-top: 0;
            color: var(--primary-color);
        }
        
        .keyboard-shortcuts-modal table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        
        .keyboard-shortcuts-modal th,
        .keyboard-shortcuts-modal td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        
        .keyboard-shortcuts-modal th {
            background: var(--light-color);
            font-weight: 600;
        }
        
        .keyboard-shortcuts-modal kbd {
            background: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 3px;
            padding: 0.25rem 0.5rem;
            font-family: monospace;
            font-size: 0.9rem;
        }
        
        .keyboard-shortcuts-modal .close-btn {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .keyboard-help-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .keyboard-help-btn:not(.sr-only):hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    // Close on escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            style.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
    
    // Focus the close button
    closeBtn.focus();
}

/**
 * Initialize Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.value-card, .certification-card, .initiative-item'
    );
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation styles
    addScrollAnimationStyles();
}

/**
 * Add scroll animation styles
 */
function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .value-card,
        .certification-card,
        .initiative-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .value-card.animate-in,
        .certification-card.animate-in,
        .initiative-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered delays for grid items */
        .values-grid .value-card:nth-child(1) { transition-delay: 0.1s; }
        .values-grid .value-card:nth-child(2) { transition-delay: 0.2s; }
        .values-grid .value-card:nth-child(3) { transition-delay: 0.3s; }
        .values-grid .value-card:nth-child(4) { transition-delay: 0.4s; }
        .values-grid .value-card:nth-child(5) { transition-delay: 0.5s; }
        .values-grid .value-card:nth-child(6) { transition-delay: 0.6s; }
        
        .certifications-grid .certification-card:nth-child(1) { transition-delay: 0.1s; }
        .certifications-grid .certification-card:nth-child(2) { transition-delay: 0.2s; }
        .certifications-grid .certification-card:nth-child(3) { transition-delay: 0.3s; }
        .certifications-grid .certification-card:nth-child(4) { transition-delay: 0.4s; }
        .certifications-grid .certification-card:nth-child(5) { transition-delay: 0.5s; }
        .certifications-grid .certification-card:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize events with debouncing
 */
window.addEventListener('resize', debounce(function() {
    // Re-initialize any responsive-dependent features
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.certification-card-expanded')
            .forEach(card => card.classList.remove('certification-card-expanded'));
    }
}, 250));

/**
 * Initialize print styles
 */
function initPrintStyles() {
    const style = document.createElement('style');
    style.media = 'print';
    style.textContent = `
        .about-hero,
        .hero-shape,
        .team-overlay,
        .social-links,
        .cta-background,
        .background-pattern {
            display: none !important;
        }
        
        .hero-title,
        .section-title {
            color: #000 !important;
        }
        
        .timeline::before {
            background: #000 !important;
        }
        
        .team-card,
        .certification-card,
        .value-card {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid;
        }
    `;
    document.head.appendChild(style);
}

// Initialize print styles
initPrintStyles();

/**
 * Track page view for analytics
 */
function trackPageView() {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'About Us',
            page_location: window.location.href
        });
    }
    
    // Log to console for debugging
    console.log('About page loaded:', {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    });
}

// Track page view
trackPageView();

// Export for module system if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCounterAnimation,
        initTimelineAnimation,
        initTeamHoverEffects,
        initCertificationCards,
        initLazyLoading,
        initAccessibilityFeatures,
        initScrollAnimations,
        debounce
    };
}