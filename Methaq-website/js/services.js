// Service Data Structure - Complete & Updated
const servicesData = {
    electrical: {
        title: "Electrical Services",
        images: [
            { 
                src: "images/services/electrical-1.webp", 
                alt: "Commercial electrical installation Dubai - DB panel setup",
                title: "Commercial Electrical Installation"
            },
            { 
                src: "images/services/electrical-2.webp", 
                alt: "Residential wiring service Dubai - modern apartment wiring",
                title: "Residential Wiring"
            },
            { 
                src: "images/services/electrical-3.webp", 
                alt: "DB panel maintenance Dubai - safety inspection",
                title: "DB Panel Maintenance"
            },
            { 
                src: "images/services/electrical-4.webp", 
                alt: "Lighting system installation Dubai - modern LED installation",
                title: "Lighting System Installation"
            }
        ],
        certifications: [
            { 
                icon: "fas fa-certificate", 
                title: "DEWA Certified", 
                desc: "Authorized electrical contractor"
            },
            { 
                icon: "fas fa-shield-alt", 
                title: "Safety Certified", 
                desc: "ISO 9001:2015 compliant"
            }
        ],
        emergency: true,
        color: "#1F4F7A"
    },
    
    plumbing: {
        title: "Plumbing & Sanitary Services",
        images: [
            { 
                src: "images/services/plumbing-1.webp", 
                alt: "Professional plumbing installation Dubai - pipe fitting",
                title: "Pipe Installation"
            },
            { 
                src: "images/services/plumbing-2.webp", 
                alt: "Leak detection Dubai - advanced water leak detection",
                title: "Leak Detection"
            },
            { 
                src: "images/services/plumbing-3.webp", 
                alt: "Bathroom plumbing Dubai - sanitary ware installation",
                title: "Bathroom Plumbing"
            },
            { 
                src: "images/services/plumbing-4.webp", 
                alt: "Water heater installation Dubai - modern water heating system",
                title: "Water Heater Installation"
            }
        ],
        certifications: [
            { 
                icon: "fas fa-tint", 
                title: "DHA Approved", 
                desc: "Health authority certified"
            }
        ],
        emergency: true,
        color: "#28a745"
    },
    
    hvac: {
        title: "HVAC & Cooling Services",
        images: [
            { 
                src: "images/services/hvac-1.webp", 
                alt: "Commercial chiller maintenance Dubai - industrial HVAC system",
                title: "Commercial Chiller Maintenance"
            },
            { 
                src: "images/services/hvac-2.webp", 
                alt: "Split AC installation Dubai - residential AC setup",
                title: "Split AC Installation"
            },
            { 
                src: "images/services/hvac-3.webp", 
                alt: "Duct cleaning service Dubai - HVAC duct maintenance",
                title: "Duct Cleaning Service"
            },
            { 
                src: "images/services/hvac-4.webp", 
                alt: "AC repair service Dubai - technician performing maintenance",
                title: "AC Repair Service"
            }
        ],
        certifications: [
            { 
                icon: "fas fa-certificate", 
                title: "CAR Certified", 
                desc: "Certified AC Refrigeration Technician"
            },
            { 
                icon: "fas fa-user-shield", 
                title: "EPA Certified", 
                desc: "Environmental Protection Agency certified"
            },
            { 
                icon: "fas fa-bolt", 
                title: "Energy Star Partner", 
                desc: "Energy efficiency optimization certified"
            }
        ],
        emergency: true,
        color: "#17a2b8"
    },
    
    civil: {
        title: "Civil & Structural Works",
        images: [
            { 
                src: "images/services/civil-1.webp", 
                alt: "Concrete repair Dubai - structural concrete work",
                title: "Concrete Repair Work"
            },
            { 
                src: "images/services/civil-2.webp", 
                alt: "Waterproofing Dubai - basement waterproofing application",
                title: "Waterproofing Application"
            },
            { 
                src: "images/services/civil-3.webp", 
                alt: "Tiling service Dubai - floor tile installation",
                title: "Tiling Work"
            },
            { 
                src: "images/services/civil-4.webp", 
                alt: "Masonry work Dubai - brick laying and construction",
                title: "Masonry & Block Work"
            }
        ],
        certifications: [
            { 
                icon: "fas fa-certificate", 
                title: "DM Licensed", 
                desc: "Dubai Municipality approved contractor"
            },
            { 
                icon: "fas fa-user-tie", 
                title: "Structural Engineer", 
                desc: "Licensed structural engineering team"
            },
            { 
                icon: "fas fa-shield-alt", 
                title: "Safety Certified", 
                desc: "OSHA certified safety protocols"
            }
        ],
        emergency: false,
        color: "#6c757d"
    },
    
    painting: {
        title: "Painting & Finishing Services",
        images: [
            { 
                src: "images/services/painting-1.webp", 
                alt: "Interior painting Dubai - luxury villa interior painting",
                title: "Interior Painting"
            },
            { 
                src: "images/services/painting-2.webp", 
                alt: "Exterior painting Dubai - building facade painting",
                title: "Exterior Painting"
            },
            { 
                src: "images/services/painting-3.webp", 
                alt: "Texture painting Dubai - decorative wall texture",
                title: "Texture Painting"
            },
            { 
                src: "images/services/painting-4.webp", 
                alt: "Spray painting Dubai - professional paint spray application",
                title: "Spray Painting"
            }
        ],
        brands: [
            { 
                name: "Jotun", 
                logo: "images/brands/jotun.png"
            },
            { 
                name: "Berger", 
                logo: "images/brands/berger.png"
            },
            { 
                name: "Dulux", 
                logo: "images/brands/dulux.png"
            },
            { 
                name: "Nippon", 
                logo: "images/brands/nippon.png"
            }
        ],
        emergency: false,
        color: "#ffc107"
    },
    
    carpentry: {
        title: "Carpentry & Joinery Services",
        images: [
            { 
                src: "images/services/carpentry-1.webp", 
                alt: "Custom kitchen cabinets Dubai - modern kitchen cabinet installation",
                title: "Custom Kitchen Cabinets"
            },
            { 
                src: "images/services/carpentry-2.webp", 
                alt: "Built-in wardrobes Dubai - custom wardrobe installation",
                title: "Built-in Wardrobes"
            },
            { 
                src: "images/services/carpentry-3.webp", 
                alt: "Custom doors Dubai - elegant wooden door installation",
                title: "Custom Doors"
            },
            { 
                src: "images/services/carpentry-4.webp", 
                alt: "Wooden furniture Dubai - custom furniture making",
                title: "Custom Furniture"
            }
        ],
        woodTypes: [
            { 
                name: "Solid Oak", 
                image: "images/woods/oak.jpg",
                desc: "Durable, beautiful grain, traditional",
                price: "Premium"
            },
            { 
                name: "American Walnut", 
                image: "images/woods/walnut.jpg",
                desc: "Rich color, elegant, luxury",
                price: "Luxury"
            },
            { 
                name: "Teak", 
                image: "images/woods/teak.jpg",
                desc: "Weather resistant, outdoor use",
                price: "Premium"
            },
            { 
                name: "MDF", 
                image: "images/woods/mdf.jpg",
                desc: "Smooth finish, paintable, economical",
                price: "Economical"
            }
        ],
        emergency: false,
        color: "#795548"
    },
    
    additional: {
        title: "Additional Maintenance Services",
        images: [
            { 
                src: "images/services/additional-1.webp", 
                alt: "Pest control Dubai - professional pest control service",
                title: "Pest Control Service"
            },
            { 
                src: "images/services/additional-2.webp", 
                alt: "Deep cleaning Dubai - post construction cleaning",
                title: "Deep Cleaning"
            },
            { 
                src: "images/services/additional-3.webp", 
                alt: "Security systems Dubai - CCTV camera installation",
                title: "Security Systems"
            },
            { 
                src: "images/services/additional-4.webp", 
                alt: "Glass works Dubai - window and glass installation",
                title: "Glass & Aluminum Works"
            }
        ],
        categories: [
            { 
                id: "pest-control", 
                name: "Pest Control",
                icon: "fas fa-bug"
            },
            { 
                id: "cleaning", 
                name: "Deep Cleaning",
                icon: "fas fa-soap"
            },
            { 
                id: "security", 
                name: "Security Systems",
                icon: "fas fa-shield-alt"
            },
            { 
                id: "specialized", 
                name: "Specialized Services",
                icon: "fas fa-tools"
            }
        ],
        emergency: true,
        color: "#dc3545"
    }
};

// Service Navigation State Management
let currentService = ''; // Default service
let isScrolling = false;
let scrollTimeout = null;

// Initialize Services Page
document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
    setupEventListeners();
    initializeServiceNavigation();
    initializeFAQ();
    initializeCalculators();
});

// Initialize Services Functionality
function initializeServices() {
    // Set active service from URL hash or default
    const hash = window.location.hash.substring(1);
    if (hash && isValidService(hash)) {
        currentService = hash;
        // Update URL if needed
        if (window.location.hash !== `#${hash}`) {
            history.replaceState(null, null, `#${hash}`);
        }
    }
    
    // Highlight active service in navigation
    highlightActiveService();
    
    // Scroll to active service section if it's from URL
    if (hash && isValidService(hash)) {
        setTimeout(() => {
            scrollToService(hash, false);
        }, 100);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Service gallery preview click
    document.querySelectorAll('.preview-item').forEach(item => {
        item.addEventListener('click', function() {
            const service = this.closest('.gallery-preview').querySelector('.btn-view-gallery').dataset.service;
            const index = Array.from(this.parentNode.children).indexOf(this);
            openServiceGallery(service, index);
        });
    });
    
    // View gallery buttons
    document.querySelectorAll('.btn-view-gallery').forEach(button => {
        button.addEventListener('click', function() {
            openServiceGallery(this.dataset.service, 0);
        });
    });
    
    // Modal close events
    const galleryModal = document.getElementById('serviceGalleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('hidden.bs.modal', function() {
            resetGallery();
        });
    }
    
    // Color picker for painting
    document.querySelectorAll('.color-item').forEach(color => {
        color.addEventListener('click', function() {
            const selectedColor = this.dataset.color;
            const colorName = this.querySelector('span').textContent;
            updateSelectedColor(selectedColor, colorName);
        });
    });
    
    // Additional service tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            switchAdditionalCategory(category);
        });
    });
}

// Initialize Service Navigation - UPDATED WITH SCROLL DETECTION
function initializeServiceNavigation() {
    const navLinks = document.querySelectorAll('.services-nav .nav-link');
    const serviceSections = document.querySelectorAll('.service-detail-section');
    
    // Set initial active state from URL
    const hash = window.location.hash.substring(1);
    if (hash && isValidService(hash)) {
        setActiveServiceNav(hash);
    }
    
    // 1. Intersection Observer for active nav highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-120px 0px -50% 0px', // Adjusted for sticky nav
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const service = entry.target.dataset.service;
                setActiveServiceNav(service);
                updateURLHash(service);
            }
        });
    }, observerOptions);
    
    // Observe all service sections
    serviceSections.forEach(section => {
        observer.observe(section);
    });
    
    // 2. Manual scroll detection as fallback
    window.addEventListener('scroll', handleScroll);
    
    // 3. Nav link click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.dataset.service;
            if (service) {
                scrollToService(service, true);
                setActiveServiceNav(service);
                updateURLHash(service);
                
                // Update main navbar dropdown if exists
                updateMainNavbarHighlight(service);
            }
        });
    });
    
    // 4. Hash change listener (when using browser back/forward)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && isValidService(hash)) {
            setActiveServiceNav(hash);
            scrollToService(hash, false);
        }
    });
}

// Handle Scroll Event with Throttling
function handleScroll() {
    if (isScrolling) return;
    
    isScrolling = true;
    
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY + 150; // Account for sticky nav
        
        let currentSection = null;
        const serviceSections = document.querySelectorAll('.service-detail-section');
        
        // Find which section is currently in view
        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const service = currentSection.dataset.service;
            setActiveServiceNav(service);
            updateURLHash(service);
        }
        
        isScrolling = false;
    }, 150);
}

// Scroll to Service Section
function scrollToService(service, smooth = true) {
    const targetSection = document.getElementById(service);
    if (!targetSection) return;
    
    const stickyNav = document.querySelector('.services-nav-section');
    const offset = stickyNav ? stickyNav.offsetHeight + 20 : 120;
    const targetPosition = targetSection.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: smooth ? 'smooth' : 'auto'
    });
}

// Set Active Service in Navigation
function setActiveServiceNav(service) {
    if (!service || !isValidService(service)) return;
    
    // Remove active class from all service nav links
    document.querySelectorAll('.services-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current service nav link
    const activeLink = document.querySelector(`.services-nav .nav-link[data-service="${service}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Also update main navbar dropdown if it's open
    updateMainNavbarHighlight(service);
}

// Update Main Navbar Dropdown Highlight
function updateMainNavbarHighlight(service) {
    const mainNavLinks = document.querySelectorAll('.dropdown-menu .dropdown-item');
    mainNavLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(`#${service}`)) {
            link.classList.add('active');
        }
    });
}

// Update URL Hash without page jump
function updateURLHash(service) {
    if (!service || !isValidService(service)) return;
    
    // Only update if different from current hash
    if (window.location.hash !== `#${service}`) {
        history.replaceState(null, null, `#${service}`);
    }
}

// Highlight Active Service from URL
function highlightActiveService() {
    const hash = window.location.hash.substring(1);
    if (hash && isValidService(hash)) {
        setActiveServiceNav(hash);
    }
}

// Check if service ID is valid
function isValidService(serviceId) {
    const validServices = ['electrical', 'plumbing', 'hvac', 'civil', 'painting', 'carpentry', 'additional'];
    return validServices.includes(serviceId);
}

// Initialize FAQ Accordion
function initializeFAQ() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-bs-target');
            const collapse = document.querySelector(target);
            
            // Close other FAQ items if needed
            document.querySelectorAll('.faq-collapse.show').forEach(item => {
                if (item !== collapse) {
                    item.classList.remove('show');
                }
            });
        });
    });
}

// Initialize Service Calculators
function initializeCalculators() {
    // HVAC Energy Calculator
    const calculateSavingsBtn = document.getElementById('calculateSavings');
    if (calculateSavingsBtn) {
        calculateSavingsBtn.addEventListener('click', calculateEnergySavings);
    }
    
    // Civil Material Calculator
    const calculateMaterialBtn = document.getElementById('calculateMaterial');
    if (calculateMaterialBtn) {
        calculateMaterialBtn.addEventListener('click', calculateMaterial);
    }
    
    // Paint Calculator
    const calculatePaintBtn = document.getElementById('calculatePaint');
    if (calculatePaintBtn) {
        calculatePaintBtn.addEventListener('click', calculatePaint);
    }
    
    // Carpentry Project Calculator
    const calculateProjectBtn = document.getElementById('calculateProject');
    if (calculateProjectBtn) {
        calculateProjectBtn.addEventListener('click', calculateProject);
    }
}

// Service Gallery Functions
function openServiceGallery(service, startIndex = 0) {
    const serviceImages = servicesData[service]?.images || [];
    
    if (serviceImages.length === 0) return;
    
    const modal = new bootstrap.Modal(document.getElementById('serviceGalleryModal'));
    const modalTitle = document.getElementById('galleryModalTitle');
    const mainImage = document.getElementById('galleryMainImage');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    
    // Set modal title
    modalTitle.textContent = `${servicesData[service]?.title || 'Service'} Gallery`;
    
    // Clear existing thumbnails
    thumbnailsContainer.innerHTML = '';
    
    // Set main image
    if (serviceImages[startIndex]) {
        mainImage.src = serviceImages[startIndex].src;
        mainImage.alt = serviceImages[startIndex].alt;
    }
    
    // Create thumbnails
    serviceImages.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail' + (index === startIndex ? ' active' : '');
        thumbnail.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
        `;
        
        thumbnail.addEventListener('click', () => {
            mainImage.src = image.src;
            mainImage.alt = image.alt;
            
            // Update active thumbnail
            document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    modal.show();
}

function resetGallery() {
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
    }
}

// Color Picker Functions
function updateSelectedColor(color, name) {
    const colorPreview = document.querySelector('.color-preview');
    const colorName = document.getElementById('selectedColorName');
    
    if (colorPreview) {
        colorPreview.style.backgroundColor = color;
    }
    
    if (colorName) {
        colorName.textContent = name;
    }
}

// Additional Services Tab Switching
function switchAdditionalCategory(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    // Show active content
    document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `${category}-content`) {
            content.classList.add('active');
        }
    });
}

// Calculator Functions
function calculateEnergySavings() {
    const acUnits = parseInt(document.getElementById('acUnits').value) || 0;
    const usageHours = parseInt(document.getElementById('usageHours').value) || 0;
    
    if (acUnits <= 0 || usageHours <= 0) {
        showCalculationResult('savingsResult', 'Please enter valid numbers', 'error');
        return;
    }
    
    // Simplified calculation (real formula would be more complex)
    const baseConsumption = 1.5; // kWh per AC unit per hour
    const savingPercentage = 0.25; // 25% energy saving
    const rate = 0.45; // AED per kWh
    
    const dailySavings = acUnits * usageHours * baseConsumption * savingPercentage * rate;
    const monthlySavings = dailySavings * 30;
    const yearlySavings = monthlySavings * 12;
    
    const result = `
        <strong>Estimated Savings:</strong><br>
        Daily: <strong>AED ${dailySavings.toFixed(2)}</strong><br>
        Monthly: <strong>AED ${monthlySavings.toFixed(2)}</strong><br>
        Yearly: <strong>AED ${yearlySavings.toFixed(2)}</strong>
    `;
    
    showCalculationResult('savingsResult', result, 'success');
}

function calculateMaterial() {
    const materialType = document.getElementById('materialType').value;
    const areaSize = parseFloat(document.getElementById('areaSize').value) || 0;
    
    if (areaSize <= 0) {
        showCalculationResult('materialResult', 'Please enter a valid area', 'error');
        return;
    }
    
    let result = '';
    const rates = {
        cement: { rate: 0.4, unit: 'bags', label: 'Cement (50kg bags)' },
        sand: { rate: 0.02, unit: 'cubic feet', label: 'Sand' },
        bricks: { rate: 5, unit: 'bricks', label: 'Bricks' },
        tiles: { rate: 1.1, unit: 'tiles', label: 'Tiles' }
    };
    
    const material = rates[materialType];
    const quantity = Math.ceil(areaSize * material.rate);
    
    result = `
        <strong>Material Required:</strong><br>
        ${material.label}: <strong>${quantity} ${material.unit}</strong><br>
        For area: ${areaSize} sq. ft.
    `;
    
    showCalculationResult('materialResult', result, 'success');
}

function calculatePaint() {
    const length = parseFloat(document.getElementById('roomLength').value) || 0;
    const width = parseFloat(document.getElementById('roomWidth').value) || 0;
    const height = parseFloat(document.getElementById('roomHeight').value) || 0;
    
    if (length <= 0 || width <= 0 || height <= 0) {
        showCalculationResult('paintResult', 'Please enter valid room dimensions', 'error');
        return;
    }
    
    // Calculate wall area (excluding windows/doors)
    const wallArea = 2 * (length + width) * height;
    const ceilingArea = length * width;
    const totalArea = wallArea + ceilingArea;
    
    // Account for doors and windows (approx 20%)
    const adjustedArea = totalArea * 0.8;
    
    // Paint coverage: 1 liter covers approx 12 sq.m (130 sq.ft)
    const paintLiters = adjustedArea / 130;
    const paintCans = Math.ceil(paintLiters / 4); // 4 liters per can
    
    const result = `
        <strong>Paint Required:</strong><br>
        Area to paint: <strong>${Math.round(adjustedArea)} sq. ft.</strong><br>
        Paint needed: <strong>${paintLiters.toFixed(1)} liters</strong><br>
        Cans required: <strong>${paintCans} cans (4L each)</strong>
    `;
    
    showCalculationResult('paintResult', result, 'success');
}

function calculateProject() {
    const projectType = document.getElementById('projectType').value;
    const material = document.getElementById('woodMaterial').value;
    const size = parseFloat(document.getElementById('projectSize').value) || 0;
    
    if (size <= 0) {
        showCalculationResult('projectResult', 'Please enter a valid size', 'error');
        return;
    }
    
    const baseRates = {
        cabinet: { mdf: 250, plywood: 350, solid: 500, premium: 800 },
        wardrobe: { mdf: 200, plywood: 300, solid: 450, premium: 700 },
        shelf: { mdf: 150, plywood: 200, solid: 300, premium: 500 },
        door: { mdf: 400, plywood: 600, solid: 900, premium: 1500 }
    };
    
    const rate = baseRates[projectType]?.[material] || 0;
    const totalCost = Math.round(size * rate);
    
    const projectNames = {
        cabinet: 'Kitchen Cabinet',
        wardrobe: 'Wardrobe',
        shelf: 'Shelving Unit',
        door: 'Custom Door'
    };
    
    const materialNames = {
        mdf: 'MDF',
        plywood: 'Plywood',
        solid: 'Solid Wood',
        premium: 'Premium Wood'
    };
    
    const result = `
        <strong>Project Estimate:</strong><br>
        ${projectNames[projectType]} (${materialNames[material]})<br>
        Size: ${size} linear feet<br>
        Estimated Cost: <strong>AED ${totalCost.toLocaleString()}</strong>
    `;
    
    showCalculationResult('projectResult', result, 'success');
}

// Helper function to show calculation results
function showCalculationResult(elementId, message, type = 'success') {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.classList.remove('d-none');
    element.innerHTML = message;
    element.className = 'calculation-result  ' + type;
    
}

// Clean up event listeners on page unload
window.addEventListener('beforeunload', function() {
    window.removeEventListener('scroll', handleScroll);
});