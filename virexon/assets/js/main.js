/**
 * ============================================================
 * MAIN.JS - Core JavaScript
 * ============================================================
 */

(function () {
    'use strict';

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function () {
        initPreloader();
        initHeaderScroll();
        initSmoothScroll();
        initMobileNav();
        initCounterAnimation();
        initSwiperSliders();
        initGLightbox();
        initAOS();
    });

    // ============================================================
    // Preloader
    // ============================================================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', function () {
            preloader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 600);
        });

        // Fallback: hide after 3 seconds if load event is slow
        setTimeout(function () {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                setTimeout(function () {
                    preloader.style.display = 'none';
                }, 600);
            }
        }, 3000);
    }

    // ============================================================
    // Header Scroll Effect
    // ============================================================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const threshold = 50;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > threshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > threshold) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================================
    // Smooth Scroll for Anchor Links
    // ============================================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 76;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without causing jump
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    // ============================================================
    // Mobile Navigation
    // ============================================================

    function initMobileNav() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
    
        if (!navbarToggler || !navbarCollapse) return;
    
        // Target all links & buttons inside the menu EXCEPT the dropdown toggle trigger ("Services")
        const clickableItems = navbarCollapse.querySelectorAll('a:not(.dropdown-toggle), button:not(.navbar-toggler)');
    
        // Close mobile menu when any regular link, dropdown sub-item, or CTA button is clicked
        clickableItems.forEach(function (item) {
            item.addEventListener('click', function () {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    
        // Close mobile menu when clicking outside the navigation bar
        document.addEventListener('click', function (e) {
            const isNavbar = e.target.closest('.navbar');
            if (!isNavbar && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // ============================================================
    // Counter Animation
    // ============================================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
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
            const startValue = 0;

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
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

    // ============================================================
    // Swiper Sliders
    // ============================================================
    function initSwiperSliders() {
        // Check if Swiper is available
        if (typeof Swiper === 'undefined') return;

        // Projects Slider
        const projectsSlider = document.querySelector('.projects-slider');

        if (projectsSlider) {
            // Dynamic check for loop safety based on actual slide count (4 slides)
            const slideCount = projectsSlider.querySelectorAll('.swiper-slide').length;
            // const enableLoop = slideCount > 3;

            new Swiper(projectsSlider, {
                // Base Swiper Options
                slidesPerView: 1,
                spaceBetween: 24,
                centeredSlides: false,

                // Safe Loop Control (Prevents console loop warnings with 4 items)
                // loop: enableLoop,
                // loopedSlides: enableLoop ? slideCount : null,

                // Autoplay Configuration
                // autoplay: {
                //     delay: 1000,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true, // Pauses when user hovers to view details
                // },

                pagination: {
                    el: projectsSlider.querySelector('.swiper-pagination'),
                    clickable: true,
                    dynamicBullets: false,
                },

                // Responsive Breakpoints matching your grid layout
                breakpoints: {
                    // 576: {
                    //     slidesPerView: 2,
                    //     spaceBetween: 20,
                    // },
                    // 768: {
                    //     slidesPerView: 2,
                    //     spaceBetween: 24,
                    // },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                },

                // Smooth Rendering & Accessibility
                watchSlidesProgress: true,
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous project',
                    nextSlideMessage: 'Next project',
                },
            });
        }

        // Testimonials Slider
        const testimonialsSlider = document.querySelector('.testimonials-slider');
        if (testimonialsSlider) {
            // Determine slide count to safely enable loop mode only when sufficient DOM nodes exist
            const slideCount = testimonialsSlider.querySelectorAll('.swiper-slide').length;
            const enableLoop = slideCount > 4;

            new Swiper(testimonialsSlider, {
                // Base Layout
                slidesPerView: 1,
                spaceBetween: 24,
                centeredSlides: false,

                // Loop Safety
                loop: enableLoop,
                loopedSlides: enableLoop ? slideCount : null,

                // Autoplay
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Enhances UX for reading testimonials
                },

                // Pagination
                pagination: {
                    el: testimonialsSlider.querySelector('.swiper-pagination') || '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: false,
                },

                // Responsive Breakpoints
                breakpoints: {
                    640: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 2.5, // Changed 2.5 to 3 for clean desktop grid alignment
                        spaceBetween: 30,
                    },
                },

                // Performance & Accessibility
                watchSlidesProgress: true,
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                },
            });
        }
    }

    // ============================================================
    // GLightbox
    // ============================================================
    function initGLightbox() {
        if (typeof GLightbox === 'undefined') return;

        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
        });
    }

    // ============================================================
    // AOS Animation
    // ============================================================
    function initAOS() {
        if (typeof AOS === 'undefined') return;

        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: function () {
                return window.innerWidth < 576;
            }
        });

        // Refresh AOS on window resize
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                AOS.refresh();
            }, 250);
        }, { passive: true });
    }

})();