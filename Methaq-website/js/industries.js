/**
 * Industries Page JavaScript
 * Methaq Almajara Technical Service LLC - Dubai
 * Version: 1.0.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initIndustryFilter();
    initIndustryModals();
    initComparisonTable();
    initCaseStudies();
    initResponsiveBehaviors();
    initAccessibilityFeatures();
});

/**
 * Initialize Industry Filtering System
 */
function initIndustryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const industryCards = document.querySelectorAll('.industry-card');
    const industriesGrid = document.getElementById('industriesGrid');
    
    if (!filterButtons.length || !industryCards.length) return;
    
    // Set initial grid height for smooth transitions
    setGridHeight(industriesGrid);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter industry cards
            filterIndustryCards(filterValue, industryCards, industriesGrid);
            
            // Update URL hash for bookmarking
            updateFilterHash(filterValue);
        });
    });
    
    // Check for initial filter from URL hash
    checkInitialFilter();
}

/**
 * Set grid height for smooth transitions
 */
function setGridHeight(grid) {
    const gridHeight = grid.offsetHeight;
    grid.style.minHeight = `${gridHeight}px`;
}

/**
 * Filter industry cards based on selected category
 */
function filterIndustryCards(filter, cards, grid) {
    let visibleCount = 0;
    let maxRowHeight = 0;
    
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.classList.remove('hidden');
            visibleCount++;
            
            // Track max card height for this row
            const cardHeight = card.offsetHeight;
            maxRowHeight = Math.max(maxRowHeight, cardHeight);
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Animate grid height adjustment
    animateGridHeight(grid, visibleCount, maxRowHeight);
    
    // Announce filter change for screen readers
    announceFilterChange(filter, visibleCount);
}

/**
 * Animate grid height adjustment
 */
function animateGridHeight(grid, visibleCount, cardHeight) {
    const currentHeight = grid.offsetHeight;
    const rows = Math.ceil(visibleCount / getGridColumns());
    const targetHeight = rows * (cardHeight + parseInt(getComputedStyle(grid).gap));
    
    grid.style.transition = 'min-height 0.3s ease';
    grid.style.minHeight = `${Math.max(targetHeight, currentHeight)}px`;
    
    setTimeout(() => {
        grid.style.minHeight = `${targetHeight}px`;
    }, 50);
}

/**
 * Get current number of grid columns
 */
function getGridColumns() {
    const grid = document.querySelector('.industries-grid');
    const gridStyle = window.getComputedStyle(grid);
    
    if (gridStyle.gridTemplateColumns) {
        return gridStyle.gridTemplateColumns.split(' ').length;
    }
    
    // Fallback based on screen width
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

/**
 * Update URL hash for filter bookmarking
 */
function updateFilterHash(filter) {
    if (filter !== 'all') {
        window.history.replaceState(null, null, `#filter-${filter}`);
    } else {
        window.history.replaceState(null, null, window.location.pathname);
    }
}

/**
 * Check for initial filter from URL hash
 */
function checkInitialFilter() {
    const hash = window.location.hash;
    
    if (hash && hash.startsWith('#filter-')) {
        const filter = hash.replace('#filter-', '');
        const button = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        
        if (button) {
            button.click();
        }
    }
}

/**
 * Announce filter change for screen readers
 */
function announceFilterChange(filter, count) {
    const announcement = document.getElementById('filter-announcement') || createAnnouncementElement();
    const filterNames = {
        'all': 'All Industries',
        'residential': 'Residential',
        'commercial': 'Commercial',
        'hospitality': 'Hospitality',
        'retail': 'Retail',
        'industrial': 'Industrial'
    };
    
    announcement.textContent = `Showing ${count} ${filterNames[filter] || filter} industry ${count === 1 ? 'sector' : 'sectors'}`;
}

/**
 * Create announcement element for screen readers
 */
function createAnnouncementElement() {
    const announcement = document.createElement('div');
    announcement.id = 'filter-announcement';
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcement);
    return announcement;
}

/**
 * Initialize Industry Detail Modals
 */
function initIndustryModals() {
    const modalButtons = document.querySelectorAll('.industry-modal-btn');
    const modal = document.getElementById('industryModal');
    const modalTitle = document.getElementById('industryModalTitle');
    const modalContent = document.getElementById('industryModalContent');
    
    if (!modal || !modalButtons.length) return;
    
    // Industry data for modals
    const industryData = {
        'luxury-residential': {
            title: 'Luxury Residential Maintenance',
            icon: 'home',
            tag: 'Premium Service',
            description: 'Exclusive technical maintenance solutions for Dubai\'s most prestigious residential properties. We provide discreet, professional service for luxury villas, apartments, and residential communities across Palm Jumeirah, Emirates Hills, Dubai Hills Estate, and other premium locations.',
            services: [
                'Smart home system installation & maintenance',
                'Private pool & spa technical systems',
                'Premium fixture and fitting installation',
                'Landscaping irrigation & lighting systems',
                'Home automation and security systems',
                'Climate control & specialized HVAC',
                'Backup power & generator systems'
            ],
            compliance: ['DEWA Certified', 'Dubai Municipality Approved', 'RERA Registered'],
            stats: [
                { value: '98%', label: 'Client Retention Rate' },
                { value: '45 min', label: 'Average Response Time' },
                { value: '0', label: 'Safety Incidents' },
                { value: '24/7', label: 'VIP Support Line' }
            ],
            locations: ['Palm Jumeirah', 'Emirates Hills', 'Dubai Hills Estate', 'Jumeirah Islands', 'Al Barari']
        },
        'commercial-offices': {
            title: 'Commercial Office Towers',
            icon: 'building',
            tag: 'Corporate Solutions',
            description: 'Comprehensive facility management for high-rise office buildings, business parks, and corporate headquarters. Our certified teams ensure operational excellence with minimal disruption to business activities.',
            services: [
                'Elevator & escalator maintenance',
                'Building automation systems (BAS)',
                'HVAC optimization & energy management',
                'Emergency power & backup systems',
                'Fire safety system maintenance',
                'Plumbing & water management',
                'Lighting control systems'
            ],
            compliance: ['DEWA Certified', 'Dubai Civil Defense', 'DIFC Compliance', 'DM Regulations'],
            stats: [
                { value: '100+', label: 'Buildings Managed' },
                { value: '99.5%', label: 'System Uptime' },
                { value: '20%', label: 'Energy Savings' },
                { value: '24/7', label: 'Command Center' }
            ],
            locations: ['DIFC', 'Dubai Marina', 'Business Bay', 'Sheikh Zayed Road', 'JLT']
        },
        'hospitality-hotels': {
            title: 'Hospitality & Hotels',
            icon: 'hotel',
            tag: '5-Star Service',
            description: '24/7 technical support for luxury hotels, resorts, and hospitality venues. We ensure uninterrupted guest experience with preventive maintenance and rapid emergency response.',
            services: [
                'Guest room technical systems',
                'Kitchen & restaurant equipment',
                'Pool & recreational facilities',
                'Conference & banquet systems',
                'Laundry & housekeeping equipment',
                'Entertainment & AV systems',
                'Waste management systems'
            ],
            compliance: ['DTCM Approved', 'DHA Certified', 'Dubai Tourism Standards', 'HACCP Compliance'],
            stats: [
                { value: '50+', label: 'Hotel Properties' },
                { value: '99.9%', label: 'Guest Satisfaction' },
                { value: '15 min', label: 'Emergency Response' },
                { value: '100%', label: 'Compliance Rate' }
            ],
            locations: ['JBR', 'Palm Jumeirah', 'Downtown Dubai', 'Deira', 'Dubai Creek']
        },
        'retail-malls': {
            title: 'Retail & Shopping Malls',
            icon: 'shopping-cart',
            tag: 'Retail Excellence',
            description: 'Specialized maintenance for retail spaces, shopping malls, and showrooms. We provide off-peak services to minimize business disruption while maintaining optimal operational conditions.',
            services: [
                'Storefront & facade maintenance',
                'Escalator & lift systems',
                'Lighting & display systems',
                'Food court & restaurant equipment',
                'Parking facility systems',
                'Security & surveillance support',
                'Waste & recycling systems'
            ],
            compliance: ['DM Approved', 'RERA Certified', 'Civil Defense', 'Health Authority'],
            stats: [
                { value: '200+', label: 'Retail Stores' },
                { value: '90%', label: 'Off-Peak Service' },
                { value: '60 min', label: 'Maximum Response' },
                { value: '0', label: 'Major Disruptions' }
            ],
            locations: ['Dubai Mall', 'Mall of Emirates', 'Ibn Battuta', 'City Centre', 'Festival City']
        },
        'industrial-warehouses': {
            title: 'Industrial & Warehouses',
            icon: 'industry',
            tag: 'Industrial Solutions',
            description: 'Robust maintenance solutions for industrial facilities, warehouses, and logistics centers. We focus on safety compliance, operational efficiency, and preventive maintenance.',
            services: [
                'Heavy machinery maintenance',
                'Loading dock & door systems',
                'Industrial lighting & power',
                'HVAC for storage facilities',
                'Fire suppression systems',
                'Material handling equipment',
                'Compressed air systems'
            ],
            compliance: ['TRA Compliance', 'Civil Defense', 'DM Regulations', 'ISO Standards'],
            stats: [
                { value: '30+', label: 'Industrial Facilities' },
                { value: '0', label: 'Safety Incidents' },
                { value: '90 min', label: 'Site Response' },
                { value: '100%', label: 'Compliance Audit' }
            ],
            locations: ['JAFZA', 'DIC', 'DWC', 'Al Quoz', 'Dubai Investment Park']
        },
        'educational-institutions': {
            title: 'Educational Institutions',
            icon: 'graduation-cap',
            tag: 'Education Sector',
            description: 'Safe and reliable maintenance for schools, universities, and training centers. We schedule services during off-hours and holidays to minimize disruption to educational activities.',
            services: [
                'Laboratory & science equipment',
                'Classroom AV & IT systems',
                'Sports & recreational facilities',
                'Library & resource centers',
                'Food service equipment',
                'Safety & security systems',
                'Energy management'
            ],
            compliance: ['KHDA Guidelines', 'Civil Defense', 'Health Authority', 'Safety Standards'],
            stats: [
                { value: '40+', label: 'Educational Campuses' },
                { value: '100%', label: 'Safety Certified' },
                { value: 'Off-Peak', label: 'Service Hours' },
                { value: '0', label: 'Class Disruptions' }
            ],
            locations: ['Academic City', 'Dubai Silicon Oasis', 'Al Barsha', 'Jumeirah', 'Mirdif']
        },
        'healthcare-facilities': {
            title: 'Healthcare Facilities',
            icon: 'hospital',
            tag: 'Healthcare Sector',
            description: 'Specialized maintenance for hospitals, clinics, and medical centers with strict compliance to health authority regulations and infection control standards.',
            services: [
                'Medical equipment support systems',
                'HVAC with infection control',
                'Emergency power & backup',
                'Sterilization systems',
                'Medical gas systems',
                'Laboratory equipment',
                'Patient room systems'
            ],
            compliance: ['DHA Approved', 'JCI Standards', 'Infection Control', 'Safety Protocols'],
            stats: [
                { value: '25+', label: 'Healthcare Facilities' },
                { value: 'DHA', label: 'Approved Contractor' },
                { value: '30 min', label: 'Emergency Response' },
                { value: '100%', label: 'Compliance Rate' }
            ],
            locations: ['Dubai Healthcare City', 'Various Hospitals', 'Medical Centers', 'Clinics']
        }
    };
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const industryKey = this.getAttribute('data-industry');
            const data = industryData[industryKey];
            
            if (data) {
                loadModalData(data, modalTitle, modalContent);
                
                // Show modal
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
                
                // Track modal view
                trackModalView(industryKey);
            }
        });
    });
}

/**
 * Load data into modal
 */
function loadModalData(data, titleElement, contentElement) {
    // Set modal title
    titleElement.textContent = data.title;
    
    // Create modal content HTML
    const html = `
        <div class="modal-industry-content">
            <div class="modal-industry-header">
                <div class="modal-industry-icon">
                    <i class="fas fa-${data.icon}"></i>
                </div>
                <div class="modal-industry-title">
                    <h3>${data.title}</h3>
                    <span class="modal-industry-tag">${data.tag}</span>
                </div>
            </div>
            
            <p class="modal-industry-description">${data.description}</p>
            
            <div class="modal-industry-details">
                <div class="detail-section">
                    <h4>Core Services</h4>
                    <ul>
                        ${data.services.map(service => `
                            <li>
                                <i class="fas fa-check"></i>
                                <span>${service}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>Compliance & Certifications</h4>
                    <ul>
                        ${data.compliance.map(item => `
                            <li>
                                <i class="fas fa-certificate"></i>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>Key Locations</h4>
                    <ul>
                        ${data.locations.map(location => `
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${location}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="modal-industry-stats">
                ${data.stats.map(stat => `
                    <div class="modal-stat">
                        <div class="modal-stat-value">${stat.value}</div>
                        <div class="modal-stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-industry-cta">
                <a href="contact.html?industry=${encodeURIComponent(data.title)}" 
                   class="btn btn-primary btn-lg">
                    <i class="fas fa-calendar-alt me-2"></i>
                    Request Industry Consultation
                </a>
                <p class="text-muted small mt-3">
                    <i class="fas fa-info-circle me-1"></i>
                    Get a customized maintenance proposal for your ${data.title.toLowerCase()}
                </p>
            </div>
        </div>
    `;
    
    contentElement.innerHTML = html;
    
    // Focus first element in modal for accessibility
    setTimeout(() => {
        const firstFocusable = contentElement.querySelector('a, button, [tabindex]');
        if (firstFocusable) firstFocusable.focus();
    }, 300);
}

/**
 * Track modal views for analytics
 */
function trackModalView(industryKey) {
    // Implement analytics tracking here
    console.log(`Industry modal viewed: ${industryKey}`);
    
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'industry_modal_view', {
            'industry_category': industryKey
        });
    }
}

/**
 * Initialize Comparison Table Features
 */
function initComparisonTable() {
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    // Add zebra striping
    addTableStriping(table);
    
    // Make table responsive
    makeTableResponsive(table);
    
    // Add hover effects
    addTableHoverEffects(table);
}

/**
 * Add zebra striping to table
 */
function addTableStriping(table) {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.classList.add('table-row-even');
        } else {
            row.classList.add('table-row-odd');
        }
    });
}



/**
 * Add hover effects to table
 */
function addTableHoverEffects(table) {
    const cells = table.querySelectorAll('td');
    
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const row = this.closest('tr');
            const index = Array.from(row.cells).indexOf(this);
            
            // Highlight entire column
            table.querySelectorAll(`tr td:nth-child(${index + 1})`).forEach(td => {
                td.classList.add('column-highlight');
            });
        });
        
        cell.addEventListener('mouseleave', function() {
            table.querySelectorAll('.column-highlight').forEach(td => {
                td.classList.remove('column-highlight');
            });
        });
    });
}

/**
 * Initialize Case Studies Interactions
 */
function initCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    caseStudyCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const link = this.querySelector('.case-study-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.case-study-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        // Add focus styles
        card.setAttribute('tabindex', '0');
        card.style.cursor = 'pointer';
    });
}

/**
 * Initialize Responsive Behaviors
 */
function initResponsiveBehaviors() {
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
    
    // Handle mobile menu if needed
    initMobileMenu();
    
    // Lazy load images
    initLazyLoading();
}

/**
 * Handle window resize
 */
function handleResize() {
    // Update grid columns
    const grid = document.querySelector('.industries-grid');
    if (grid) {
        grid.style.minHeight = 'auto';
        setTimeout(() => {
            setGridHeight(grid);
        }, 100);
    }
    
    // Update table responsiveness
    const table = document.querySelector('.comparison-table');
    if (table) {
        makeTableResponsive(table);
    }
}

/**
 * Initialize mobile menu for industries page
 */
function initMobileMenu() {
    // This would integrate with the main navigation
    // Currently handled by main.js
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        return;
    }
    
    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
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

/**
 * Initialize Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add skip links
    addSkipLinks();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add ARIA labels where needed
    enhanceARIALabels();
}

/**
 * Add skip links for better navigation
 */
function addSkipLinks() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
    }
}

/**
 * Enhance focus management
 */
function enhanceFocusManagement() {
    // Add focus styles to interactive elements
    const interactiveElements = document.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]'
    );
    
    interactiveElements.forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });
}

/**
 * Enhance ARIA labels
 */
function enhanceARIALabels() {
    // Add ARIA labels to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        const label = filter === 'all' ? 'Show all industries' : `Show ${filter} industries`;
        button.setAttribute('aria-label', label);
    });
    
    // Add ARIA labels to modal buttons
    const modalButtons = document.querySelectorAll('.industry-modal-btn');
    modalButtons.forEach(button => {
        const industry = button.getAttribute('data-industry');
        button.setAttribute('aria-label', `View details for ${industry.replace('-', ' ')}`);
    });
}

/**
 * Utility function for smooth scrolling
 */
function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Export functions if needed for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initIndustryFilter,
        initIndustryModals,
        initComparisonTable,
        initCaseStudies,
        smoothScrollTo
    };
}