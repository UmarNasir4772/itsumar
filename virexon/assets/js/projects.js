/**
 * ============================================================
 * PROJECTS.JS - Projects Page Specific Functionality
 * ============================================================
 */

 (function() {
    'use strict';

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initProjectFilter();
        initGLightbox();
        initCounterAnimation();
    });

    // ============================================================
    // Project Filter
    // ============================================================
    function initProjectFilter() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const projectItems = document.querySelectorAll('.project-item');

        if (!filterTabs.length || !projectItems.length) return;

        filterTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                filterTabs.forEach(function(t) {
                    t.classList.remove('active');
                });

                // Add active class to clicked tab
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter projects
                projectItems.forEach(function(item) {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        // Add a small delay for smooth appearance
                        item.style.opacity = '0';
                        setTimeout(function() {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.classList.add('hidden');
                    }
                });

                // Refresh AOS for newly visible items
                if (typeof AOS !== 'undefined') {
                    setTimeout(function() {
                        AOS.refresh();
                    }, 300);
                }
            });
        });
    }

    // ============================================================
    // GLightbox
    // ============================================================
    function initGLightbox() {
        if (typeof GLightbox === 'undefined') {
            console.warn('GLightbox not loaded');
            return;
        }

        try {
            const lightbox = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true,
                zoomable: true,
                draggable: true,
                width: '90vw',
                height: '90vh',
            });
            console.log('GLightbox initialized successfully');
        } catch (error) {
            console.error('Error initializing GLightbox:', error);
        }
    }

    // ============================================================
    // Counter Animation
    // ============================================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.project-stats .stat-number');
        if (!counters.length) return;

        let animated = false;

        function animateCounters() {
            if (animated) return;

            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.8;

            counters.forEach(function (counter) {
                if (counter.dataset.animated === 'true') return;
            
                const rect = counter.getBoundingClientRect();
                const isVisible = rect.top < triggerPoint && rect.bottom > 0;
            
                if (isVisible) {
                    const target = parseInt(counter.getAttribute('data-count'), 10);
            
                    if (isNaN(target) || target === 0) return;
            
                    counter.dataset.animated = 'true';
                    animateCounter(counter, target);
                }
            });
        }

        function animateCounter(element, target) {
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                if (target === 98) {
                    element.textContent = current + '%';
                } else {
                    element.textContent = current + '+';
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 98) {
                        element.textContent = target + '%';
                    } else {
                        element.textContent = target + '+';
                    }
                }
            }

            requestAnimationFrame(updateCounter);
        }

        // Initial check
        animateCounters();

        // Check on scroll
        window.addEventListener('scroll', animateCounters, { passive: true });
    }

})();