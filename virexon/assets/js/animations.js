/**
 * ============================================================
 * ANIMATIONS.JS - Scroll & UI Animations
 * ============================================================
 */

 (function() {
    'use strict';

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        // initHoverEffects();
        initStaggerAnimation();
        // initParallaxHero();
    });

    // ============================================================
    // Hover Effects
    // ============================================================
    // function initHoverEffects() {
    //     // Service cards - subtle glow on hover
    //     const serviceCards = document.querySelectorAll('.service-card');
    //     serviceCards.forEach(function(card) {
    //         card.addEventListener('mouseenter', function(e) {
    //             const icon = this.querySelector('.service-icon');
    //             if (icon) {
    //                 icon.style.transition = 'all 0.4s ease';
    //             }
    //         });
    //     });
    // }

    // ============================================================
    // Stagger Animation for Grid Items
    // ============================================================
    function initStaggerAnimation() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        staggerContainers.forEach(function(container) {
            const items = container.children;
            const delayIncrement = 100;
            
            Array.from(items).forEach(function(item, index) {
                const delay = index * delayIncrement;
                item.style.transitionDelay = delay + 'ms';
            });
        });
    }

    // ============================================================
    // Parallax Hero Effect
    // ============================================================
    // function initParallaxHero() {
    //     const hero = document.querySelector('.hero');
    //     if (!hero) return;

    //     const heroBg = hero.querySelector('::before');
    //     if (!heroBg) return;

    //     let isTouching = false;

    //     window.addEventListener('scroll', function() {
    //         // Only apply on larger screens
    //         if (window.innerWidth < 992) return;
    //         if (isTouching) return;

    //         const scrollPos = window.pageYOffset;
    //         const heroHeight = hero.offsetHeight;
    //         const maxScroll = heroHeight * 0.5;
    //         const parallaxOffset = Math.min(scrollPos * 0.3, maxScroll);

    //         hero.style.backgroundPosition = 'center ' + (-parallaxOffset) + 'px';
    //     }, { passive: true });

    //     // Disable parallax on touch devices
    //     document.addEventListener('touchstart', function() {
    //         isTouching = true;
    //     });

    //     document.addEventListener('touchend', function() {
    //         setTimeout(function() {
    //             isTouching = false;
    //         }, 100);
    //     });
    // }

    // ============================================================
    // Number Animation for Statistics (Enhanced)
    // ============================================================
    // This is a backup/alternative to the counter in main.js
    // function animateNumbers() {
    //     const numbers = document.querySelectorAll('.stat-number');
        
    //     numbers.forEach(function(el) {
    //         const target = parseInt(el.getAttribute('data-count'), 10);
    //         if (isNaN(target)) return;

    //         const suffix = el.getAttribute('data-suffix') || '';
    //         const isPercentage = target === 98;

    //         const observer = new IntersectionObserver(function(entries) {
    //             entries.forEach(function(entry) {
    //                 if (entry.isIntersecting) {
    //                     let current = 0;
    //                     const increment = target / 60;
    //                     const timer = setInterval(function() {
    //                         current += increment;
    //                         if (current >= target) {
    //                             current = target;
    //                             clearInterval(timer);
    //                         }
    //                         if (isPercentage) {
    //                             el.textContent = Math.round(current) + '%';
    //                         } else {
    //                             el.textContent = Math.round(current) + '+' + suffix;
    //                         }
    //                     }, 30);
    //                     observer.unobserve(el);
    //                 }
    //             });
    //         }, { threshold: 0.5 });

    //         observer.observe(el);
    //     });
    // }

    // Run enhanced animation as fallback
    // if (document.querySelectorAll('.stat-number').length) {
    //     // Wait for main counter to finish, then run this as backup
    //     setTimeout(animateNumbers, 3000);
    // }

})();