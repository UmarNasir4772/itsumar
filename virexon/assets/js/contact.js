/**
 * ============================================================
 * CONTACT.JS - Contact Page Specific Functionality
 * ============================================================
 */

 (function() {
    'use strict';

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initContactCardHover();
        initGoogleMapsLazyLoad();
    });

    // ============================================================
    // Contact Card Hover Effects
    // ============================================================
    function initContactCardHover() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contact-card-icon');
                if (icon) {
                    icon.style.transition = 'all 0.4s ease';
                }
            });
        });
    }

    // ============================================================
    // Google Maps Lazy Load
    // ============================================================
    function initGoogleMapsLazyLoad() {
        const mapIframe = document.querySelector('.map-container iframe');
        if (!mapIframe) return;

        // Check if the iframe is already loaded
        const isLoaded = mapIframe.getAttribute('src') && mapIframe.getAttribute('src') !== '';

        if (!isLoaded) {
            // Lazy load the map when it comes into view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const iframe = entry.target;
                        const src = iframe.getAttribute('data-src');
                        if (src) {
                            iframe.setAttribute('src', src);
                            iframe.removeAttribute('data-src');
                        }
                        observer.unobserve(iframe);
                    }
                });
            }, {
                rootMargin: '100px',
                threshold: 0.1
            });

            observer.observe(mapIframe);
        }
    }

    // ============================================================
    // Phone Number Formatting (Optional)
    // ============================================================
    function formatPhoneNumber(phone) {
        // Remove any non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Check if it's a UAE number
        if (cleaned.startsWith('971')) {
            return '+' + cleaned;
        }
        
        // If it starts with 0, replace with +971
        if (cleaned.startsWith('0')) {
            return '+971' + cleaned.substring(1);
        }
        
        return phone;
    }

    // ============================================================
    // WhatsApp Click Tracking (Optional)
    // ============================================================
    function initWhatsAppTracking() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Track WhatsApp clicks if analytics is available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        'event_category': 'Contact',
                        'event_label': this.href
                    });
                }
                console.log('WhatsApp clicked: ' + this.href);
            });
        });
    }

    // Initialize WhatsApp tracking
    initWhatsAppTracking();

})();