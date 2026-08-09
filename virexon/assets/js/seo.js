/**
 * ============================================================
 * SEO.JS - SEO Enhancements & Structured Data
 * ============================================================
 */

 (function() {
    'use strict';

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initBreadcrumbSchema();
        initFAQSchema();
        initImageAltChecker();
        initHeadingStructure();
    });

    // ============================================================
    // Breadcrumb Schema
    // ============================================================
    function initBreadcrumbSchema() {
        // Check if breadcrumb schema already exists
        const existing = document.querySelector('script[data-breadcrumb]');
        if (existing) return;

        const breadcrumbData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': window.location.origin + '/'
                }
            ]
        };

        // Add current page as breadcrumb item
        const currentPage = document.querySelector('h1')?.textContent || document.title;
        if (currentPage && currentPage !== 'Home') {
            breadcrumbData.itemListElement.push({
                '@type': 'ListItem',
                'position': 2,
                'name': currentPage,
                'item': window.location.href
            });
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-breadcrumb', 'true');
        script.textContent = JSON.stringify(breadcrumbData);
        document.head.appendChild(script);
    }

    // ============================================================
    // FAQ Schema
    // ============================================================
    function initFAQSchema() {
        const faqItems = document.querySelectorAll('.accordion-item');
        if (!faqItems.length) return;

        // Check if FAQ schema already exists
        const existing = document.querySelector('script[data-faq]');
        if (existing) return;

        const faqData = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': []
        };

        faqItems.forEach(function(item) {
            const questionEl = item.querySelector('.accordion-button');
            const answerEl = item.querySelector('.accordion-body');
            
            if (questionEl && answerEl) {
                faqData.mainEntity.push({
                    '@type': 'Question',
                    'name': questionEl.textContent.trim(),
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': answerEl.textContent.trim()
                    }
                });
            }
        });

        if (faqData.mainEntity.length) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-faq', 'true');
            script.textContent = JSON.stringify(faqData);
            document.head.appendChild(script);
        }
    }

    // ============================================================
    // Image Alt Text Checker
    // ============================================================
    function initImageAltChecker() {
        const images = document.querySelectorAll('img');
        let missingAltCount = 0;

        images.forEach(function(img) {
            const alt = img.getAttribute('alt');
            if (alt === null || alt.trim() === '') {
                missingAltCount++;
                // Log warning in console
                console.warn('Missing alt text for image:', img.src || img.getAttribute('data-src') || 'unknown');
                
                // Set generic alt if missing (for accessibility)
                if (!img.hasAttribute('alt')) {
                    const filename = img.src.split('/').pop().split('.')[0];
                    img.setAttribute('alt', filename.replace(/[_-]/g, ' ') || 'Image');
                }
            }
        });

        if (missingAltCount > 0) {
            console.log('SEO: Found ' + missingAltCount + ' images with missing alt text');
        }
    }

    // ============================================================
    // Heading Structure Checker
    // ============================================================
    function initHeadingStructure() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let h1Count = 0;
        let issues = [];

        headings.forEach(function(h) {
            const tag = h.tagName.toLowerCase();
            
            if (tag === 'h1') {
                h1Count++;
                if (h1Count > 1) {
                    issues.push('Multiple H1 tags found');
                }
            }

            // Check for empty headings
            if (h.textContent.trim() === '') {
                issues.push('Empty heading: ' + tag);
            }
        });

        if (h1Count === 0) {
            issues.push('No H1 tag found');
        }

        if (issues.length) {
            console.log('SEO: Heading structure issues:', issues);
        }
    }

    // ============================================================
    // Canonical URL Check
    // ============================================================
    function checkCanonical() {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            console.warn('SEO: No canonical URL found');
            
            // Add canonical if missing
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = window.location.href.split('?')[0];
            document.head.appendChild(link);
        }
    }

    // ============================================================
    // Meta Description Check
    // ============================================================
    function checkMetaDescription() {
        const meta = document.querySelector('meta[name="description"]');
        if (!meta) {
            console.warn('SEO: No meta description found');
        } else if (meta.content.length < 50 || meta.content.length > 190) {
            console.warn('SEO: Meta description length: ' + meta.content.length + ' characters (recommended: 50-160)');
        }
    }

    // ============================================================
    // Open Graph Check
    // ============================================================
    function checkOpenGraph() {
        const ogTags = [
            'og:title',
            'og:description',
            'og:image',
            'og:url',
            'og:type'
        ];

        ogTags.forEach(function(tag) {
            const meta = document.querySelector('meta[property="' + tag + '"]');
            if (!meta) {
                console.warn('SEO: Missing Open Graph tag:', tag);
            }
        });
    }

    // ============================================================
    // Run all SEO checks
    // ============================================================
    setTimeout(function() {
        checkCanonical();
        checkMetaDescription();
        checkOpenGraph();
    }, 1000);

})();