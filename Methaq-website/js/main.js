// ==============================================
// HEADER FUNCTIONALITY
// Sticky Header & Mobile Menu Enhancement
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  // Sticky Header
  const header = document.getElementById("main-header");
  let scrollPosition = window.scrollY;

  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
});

/**
 * Hero Section Interactions
 * (minimal – ensures smooth performance and lazy loads background if needed)
 */
document.addEventListener('DOMContentLoaded', function() {
  // Optional: Add a class to body when hero is in view for any animations
  const hero = document.querySelector('.hero');
  
  if (hero) {
    // Simple intersection observer to preload background if not already
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // The background is already set in CSS; this could trigger
          // additional tracking or analytics if needed
          entry.target.classList.add('hero-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(hero);
  }
});

// ==============================================
// SERVICES SECTION ANIMATIONS
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  // Service cards animation on scroll
  const serviceCards = document.querySelectorAll(
    ".service-card.animate-on-scroll",
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set initial styles for animation
  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Service card hover effects enhancement
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".service-icon");
      const link = this.querySelector(".service-link i");

      if (icon) {
        icon.style.transform = "rotateY(180deg) scale(1.1)";
      }

      if (link) {
        link.style.transform = "translateX(5px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".service-icon");
      const link = this.querySelector(".service-link i");

      if (icon) {
        icon.style.transform = "rotateY(0) scale(1)";
      }

      if (link) {
        link.style.transform = "translateX(0)";
      }
    });
  });

  // CTA box animation
  const ctaBox = document.querySelector(".cta-box");
  if (ctaBox) {
    const ctaObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 },
    );

    ctaBox.style.opacity = "0";
    ctaBox.style.transform = "translateY(30px)";
    ctaBox.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    ctaObserver.observe(ctaBox);
  }
});

// ==============================================
// WHY CHOOSE US SECTION ANIMATIONS
// ==============================================

(function () {
  "use strict";

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Check if Section 5 exists on the page
    const whyChooseUsSection = document.getElementById("why-choose-us");
    if (!whyChooseUsSection) return;

    // ==============================================
    // 1. ANIMATE STATS COUNTERS
    // ==============================================
    const whyStatNumbers =
      whyChooseUsSection.querySelectorAll(".why-stat-number");

    const whyAnimateStats = function () {
      whyStatNumbers.forEach((stat) => {
        const originalText = stat.textContent;
        const hasPlus = originalText.includes("+");
        const hasPercent = originalText.includes("%");
        const suffix = hasPlus ? "+" : hasPercent ? "%" : "";
        const targetValue = parseFloat(
          originalText.replace("+", "").replace("%", ""),
        );

        // Reset to 0
        stat.textContent = "0" + suffix;

        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startValue = 0;

        const whyUpdateNumber = function () {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(
            startValue + (targetValue - startValue) * easeOutQuart,
          );

          stat.textContent = currentValue + suffix;

          if (progress < 1) {
            requestAnimationFrame(whyUpdateNumber);
          }
        };

        // Start animation
        requestAnimationFrame(whyUpdateNumber);
      });
    };

    // ==============================================
    // 2. ANIMATE CARDS ON SCROLL
    // ==============================================
    const whyAnimateCards = function () {
      const whyCards = whyChooseUsSection.querySelectorAll(
        ".why-animate-fade-in",
      );

      whyCards.forEach((card) => {
        // Remove any inline styles that might interfere
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

        // Add animation class
        card.classList.add("why-animate-fade-in");

        // Apply delay from data attribute
        const delay = card.getAttribute("data-delay") || "0";
        card.style.animationDelay = `${delay}ms`;
      });
    };

    // ==============================================
    // 3. HOVER EFFECTS FOR CARDS
    // ==============================================
    const whyAddHoverEffects = function () {
      const whyAdvantageCards = whyChooseUsSection.querySelectorAll(
        ".why-advantage-card",
      );
      const whyTrustItems =
        whyChooseUsSection.querySelectorAll(".why-trust-item");

      // Advantage Cards Hover
      whyAdvantageCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.zIndex = "10";
          this.style.transition = "all 0.3s ease";
        });

        card.addEventListener("mouseleave", function () {
          this.style.zIndex = "1";
        });
      });

      // Trust Items Hover
      whyTrustItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
          const icon = this.querySelector(".why-trust-icon");
          if (icon) {
            icon.style.transition = "all 0.3s ease";
            icon.style.transform = "scale(1.1) rotate(5deg)";
          }
        });

        item.addEventListener("mouseleave", function () {
          const icon = this.querySelector(".why-trust-icon");
          if (icon) {
            icon.style.transform = "scale(1) rotate(0)";
          }
        });
      });
    };

    // ==============================================
    // 4. INTERSECTION OBSERVER - Trigger on scroll
    // ==============================================
    const whyObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Trigger when 20% of section is visible
    };

    const whySectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start stats animation
          setTimeout(whyAnimateStats, 300);

          // Animate cards
          setTimeout(whyAnimateCards, 500);

          // Add hover effects
          whyAddHoverEffects();

          // Stop observing after animation
          whySectionObserver.unobserve(entry.target);
        }
      });
    }, whyObserverOptions);

    // Start observing Section 5
    whySectionObserver.observe(whyChooseUsSection);

    // ==============================================
    // 5. RESPONSIVE HEIGHT ADJUSTMENT
    // ==============================================
    const whyAdjustStatsCardHeight = function () {
      const whyStatsCard = whyChooseUsSection.querySelector(".why-stats-card");
      const whyAdvantageCards = whyChooseUsSection.querySelectorAll(
        ".why-advantage-card",
      );

      if (!whyStatsCard || !whyAdvantageCards.length) return;

      // Only adjust on desktop (≥992px)
      if (window.innerWidth >= 992) {
        // Get height of first row of advantage cards
        let maxRowHeight = 0;
        const whyFirstRowCards = Array.from(whyAdvantageCards).slice(0, 2);

        whyFirstRowCards.forEach((card) => {
          const cardHeight = card.offsetHeight;
          if (cardHeight > maxRowHeight) {
            maxRowHeight = cardHeight;
          }
        });

        // Set stats card height to match 3 rows of advantage cards
        if (maxRowHeight > 0) {
          const totalHeight = maxRowHeight * 3 + 2 * 16; // 3 rows + 2 gaps (1rem each)
          whyStatsCard.style.minHeight = `${totalHeight}px`;
        }
      } else {
        // Reset on mobile/tablet
        whyStatsCard.style.minHeight = "";
      }
    };

    // Initial adjustment
    setTimeout(whyAdjustStatsCardHeight, 100);

    // Adjust on window resize
    let whyResizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(whyResizeTimer);
      whyResizeTimer = setTimeout(whyAdjustStatsCardHeight, 250);
    });

    // ==============================================
    // 6. REDUCED MOTION SUPPORT
    // ==============================================
    const whyCheckReducedMotion = function () {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (prefersReducedMotion.matches) {
        // Disable animations
        const whyAllAnimatedElements = whyChooseUsSection.querySelectorAll(
          ".why-animate-fade-in, .why-advantage-card, .why-trust-item",
        );

        whyAllAnimatedElements.forEach((el) => {
          el.style.animation = "none";
          el.style.transition = "none";
        });

        // Show stats immediately
        whyStatNumbers.forEach((stat) => {
          const originalText = stat.textContent;
          stat.textContent = originalText;
        });

        // Show cards immediately
        const whyCards = whyChooseUsSection.querySelectorAll(
          ".why-animate-fade-in",
        );
        whyCards.forEach((card) => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
      }
    };

    // Check on page load
    whyCheckReducedMotion();

    // Listen for changes in preference
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", whyCheckReducedMotion);

    // ==============================================
    // 7. BUTTON CLICK HANDLERS (Optional Enhancement)
    // ==============================================
    const whySetupButtonEffects = function () {
      const whyButtons = whyChooseUsSection.querySelectorAll(".btn");

      whyButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          // Add ripple effect
          const ripple = document.createElement("span");
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.7);
                        transform: scale(0);
                        animation: whyRipple 0.6s linear;
                        width: ${size}px;
                        height: ${size}px;
                        top: ${y}px;
                        left: ${x}px;
                        pointer-events: none;
                    `;

          this.style.position = "relative";
          this.style.overflow = "hidden";
          this.appendChild(ripple);

          // Remove ripple after animation
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });

      // Add ripple animation CSS
      const rippleStyle = document.createElement("style");
      rippleStyle.textContent = `
                @keyframes whyRipple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                #why-choose-us .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
      document.head.appendChild(rippleStyle);
    };

    // Setup button effects
    whySetupButtonEffects();

    // ==============================================
    // 8. PERFORMANCE OPTIMIZATION
    // ==============================================
    const whyOptimizePerformance = function () {
      // Use will-change for smooth animations
      const whyCards = whyChooseUsSection.querySelectorAll(
        ".why-advantage-card, .why-trust-item",
      );
      whyCards.forEach((card) => {
        card.style.willChange = "transform";
      });

      // Clean up will-change after animations
      setTimeout(() => {
        whyCards.forEach((card) => {
          card.style.willChange = "auto";
        });
      }, 2000);

      // Preload any images in Section 5
      const whyImages = whyChooseUsSection.querySelectorAll("img");
      whyImages.forEach((img) => {
        if (img.complete === false) {
          img.loading = "lazy";
        }
      });
    };

    // Run performance optimizations
    whyOptimizePerformance();

    // ==============================================
    // 9. ERROR HANDLING
    // ==============================================
    const whyHandleErrors = function () {
      try {
        // Test if Intersection Observer is supported
        if (!("IntersectionObserver" in window)) {
          // Fallback for older browsers
          console.warn(
            "Intersection Observer not supported. Showing Section 5 animations immediately.",
          );

          // Show everything immediately
          whyStatNumbers.forEach((stat) => {
            const originalText = stat.textContent;
            stat.textContent = originalText;
          });

          const whyCards = whyChooseUsSection.querySelectorAll(
            ".why-animate-fade-in",
          );
          whyCards.forEach((card) => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });

          whyAddHoverEffects();
        }
      } catch (error) {
        console.error("Section 5 JavaScript error:", error);

        // Fallback: Show all content without animations
        const whyAllElements = whyChooseUsSection.querySelectorAll("*");
        whyAllElements.forEach((el) => {
          el.style.animation = "none";
          el.style.transition = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
    };

    // Run error handling
    whyHandleErrors();
  });
})();

// ==============================================
// CLIENT PORTFOLIO GALLERY FUNCTIONALITY
// ===============================================

document.addEventListener("DOMContentLoaded", function () {
  // Wait for Bootstrap to load
  setTimeout(initializePortfolioGallery, 100);
});

function initializePortfolioGallery() {
  // 1. FILTER PORTFOLIO ITEMS
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active to clicked
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Filter items
        portfolioItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filterValue === "all" || category === filterValue) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 50);
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // 2. VIEW PROJECT BUTTONS - SINGLE MODAL
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get project data from data attributes
      const projectData = {
        title: this.getAttribute("data-title") || "Project Details",
        type: this.getAttribute("data-type") || "Not specified",
        location: this.getAttribute("data-location") || "Dubai",
        client: this.getAttribute("data-client") || "Private Client",
        before: this.getAttribute("data-before") || "",
        after: this.getAttribute("data-after") || "",
        projectId: this.getAttribute("data-project") || "1",
      };

      // Generate modal content
      const modalContent = generateProjectModalContent(projectData);

      // Inject content into modal
      const modalContentDiv = document.getElementById("modalContent");
      if (modalContentDiv) {
        modalContentDiv.innerHTML = modalContent;

        // Set modal title
        const modalTitle = document.getElementById("portfolioModalTitle");
        if (modalTitle) {
          modalTitle.textContent = projectData.title;
        }

        // Show modal
        const portfolioModal = new bootstrap.Modal(
          document.getElementById("portfolioModal"),
        );
        portfolioModal.show();

        // Initialize slider after modal is shown
        document
          .getElementById("portfolioModal")
          .addEventListener("shown.bs.modal", function () {
            setTimeout(() => {
              initializeModalSlider("modalSlider");
            }, 100);
          });
      }
    });
  });

  // 3. COMPARE BUTTONS - SINGLE COMPARE MODAL
  const compareButtons = document.querySelectorAll(".compare-btn");

  compareButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Get comparison data
      const compareData = {
        before: this.getAttribute("data-before") || "",
        after: this.getAttribute("data-after") || "",
        title: this.getAttribute("data-title") || "Before & After",
      };

      // Generate comparison content
      const compareContent = generateCompareModalContent(compareData);

      // Inject content
      const compareContentDiv = document.getElementById("compareContent");
      if (compareContentDiv) {
        compareContentDiv.innerHTML = compareContent;

        // Set modal title
        const compareTitle = document.getElementById("compareModalTitle");
        if (compareTitle) {
          compareTitle.textContent = compareData.title;
        }

        // Show compare modal
        const compareModal = new bootstrap.Modal(
          document.getElementById("compareModal"),
        );
        compareModal.show();

        // Initialize slider
        document
          .getElementById("compareModal")
          .addEventListener("shown.bs.modal", function () {
            setTimeout(() => {
              initializeModalSlider("compareSlider");
            }, 100);
          });
      }
    });
  });

  // 4. GENERATE MODAL CONTENT FUNCTION
  function generateProjectModalContent(data) {
    // Project-specific details based on projectId
    const projectDetails = getProjectDetails(data.projectId);

    return `
            <div class="modal-project-content">
                <div class="modal-project-row">
                    <div class="modal-project-image">
                        <div class="modal-image-comparison">
                            <div class="image-wrapper">
                                <img src="${data.before}" alt="Before - ${data.title}" class="before-image" loading="lazy">
                                <img src="${data.after}" alt="After - ${data.title}" class="after-image" loading="lazy">
                            </div>
                            <input type="range" class="modal-comparison-slider" id="modalSlider" min="0" max="100" value="50">
                            <div class="modal-comparison-label modal-before-label">Before</div>
                            <div class="modal-comparison-label modal-after-label">After</div>
                        </div>
                    </div>
                    
                    <div class="modal-project-details">
                        <h3>Project Details</h3>
                        <ul class="modal-project-info">
                            <li><strong>Client:</strong> ${data.client}</li>
                            <li><strong>Location:</strong> ${data.location}</li>
                            <li><strong>Property Type:</strong> ${data.type}</li>
                            <li><strong>Services Provided:</strong> ${projectDetails.services}</li>
                            <li><strong>Duration:</strong> ${projectDetails.duration}</li>
                            <li><strong>Completion:</strong> ${projectDetails.completion}</li>
                        </ul>
                        
                        <div class="modal-project-description">
                            <h4>Scope of Work</h4>
                            <ul class="modal-project-scope">
                                ${projectDetails.scope.map((item) => `<li>${item}</li>`).join("")}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  // 5. GENERATE COMPARE MODAL CONTENT
  function generateCompareModalContent(data) {
    return `
            <div class="modal-image-comparison compare-modal-image">
                <div class="image-wrapper">
                    <img src="${data.before}" alt="Before" class="before-image" loading="lazy">
                    <img src="${data.after}" alt="After" class="after-image" loading="lazy">
                </div>
                <input type="range" class="modal-comparison-slider" id="compareSlider" min="0" max="100" value="50">
                <div class="modal-comparison-label modal-before-label">Before</div>
                <div class="modal-comparison-label modal-after-label">After</div>
            </div>
        `;
  }

  // 6. PROJECT DETAILS DATABASE (You can expand this)
  function getProjectDetails(projectId) {
    const projects = {
      1: {
        services: "Complete Electrical Renovation",
        duration: "3 Weeks",
        completion: "January 2024",
        scope: [
          "New wiring throughout the villa",
          "Smart home automation system installation",
          "LED lighting design and installation",
          "DB panel upgrade to latest standards",
          "Backup power system integration",
        ],
      },
      2: {
        services: "HVAC System Maintenance",
        duration: "2 Weeks",
        completion: "December 2023",
        scope: [
          "Chiller plant inspection and servicing",
          "Cooling tower maintenance",
          "AHU filter replacement across 40 floors",
          "Thermostat calibration and optimization",
          "Energy efficiency improvements",
        ],
      },
      3: {
        services: "Complete Building Maintenance",
        duration: "Ongoing Contract",
        completion: "November 2023",
        scope: [
          "Electrical system maintenance",
          "Plumbing repairs and upgrades",
          "HVAC system optimization",
          "Civil works and structural repairs",
          "Preventive maintenance schedule",
        ],
      },
      4: {
        services: "Plumbing System Renovation",
        duration: "2 Weeks",
        completion: "October 2023",
        scope: [
          "Complete plumbing system replacement",
          "Premium fixtures installation",
          "Leak detection system installation",
          "Waterproofing solutions",
          "Sanitary ware installation",
        ],
      },
      5: {
        services: "Retail Space Maintenance",
        duration: "Annual Contract",
        completion: "September 2023",
        scope: [
          "Electrical maintenance for 200+ stores",
          "AC system servicing",
          "Civil and structural repairs",
          "Emergency repair services",
          "Preventive maintenance planning",
        ],
      },
      6: {
        services: "Hotel Facility Management",
        duration: "Ongoing Contract",
        completion: "August 2023",
        scope: [
          "24/7 facility management",
          "Preventive maintenance schedule",
          "Guest room maintenance",
          "Public area upkeep",
          "Energy management optimization",
        ],
      },
    };

    return projects[projectId] || projects["1"]; // Default to project 1 if not found
  }

  // 7. INITIALIZE MODAL SLIDER
  function initializeModalSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const container = slider.closest(".modal-image-comparison");
    if (!container) return;

    const afterImage = container.querySelector(".after-image");
    if (!afterImage) return;

    // Initialize slider
    slider.addEventListener("input", function () {
      const value = this.value + "%";
      afterImage.style.clipPath = `polygon(0 0, ${value} 0, ${value} 100%, 0 100%)`;
    });

    // Set initial position
    afterImage.style.clipPath = "polygon(0 0, 50% 0, 50% 100%, 0 100%)";
    slider.value = 50;

    // Touch support
    let isDragging = false;

    container.addEventListener(
      "touchstart",
      function (e) {
        isDragging = true;
        handleTouch(e);
      },
      { passive: true },
    );

    container.addEventListener(
      "touchmove",
      function (e) {
        if (isDragging) {
          e.preventDefault();
          handleTouch(e);
        }
      },
      { passive: false },
    );

    container.addEventListener("touchend", function () {
      isDragging = false;
    });

    function handleTouch(e) {
      const touchX = e.touches[0].clientX;
      const rect = container.getBoundingClientRect();
      const percentage = ((touchX - rect.left) / rect.width) * 100;
      const clamped = Math.min(100, Math.max(0, percentage));

      slider.value = clamped;
      slider.dispatchEvent(new Event("input"));
    }
  }

  // 8. LAZY LOADING
  const portfolioImages = document.querySelectorAll(".portfolio-image img");

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute("src");
            lazyImageObserver.unobserve(img);
          }
        });
      },
      { threshold: 0.1 },
    );

    portfolioImages.forEach((img) => {
      lazyImageObserver.observe(img);
    });
  }

  // 9. KEYBOARD NAVIGATION
  document.addEventListener("keydown", function (e) {
    // Close modals with ESC
    if (e.key === "Escape") {
      const portfolioModal = bootstrap.Modal.getInstance(
        document.getElementById("portfolioModal"),
      );
      const compareModal = bootstrap.Modal.getInstance(
        document.getElementById("compareModal"),
      );

      if (portfolioModal) portfolioModal.hide();
      if (compareModal) compareModal.hide();
    }

    // Navigate filters with arrow keys
    if (
      (e.key === "ArrowRight" || e.key === "ArrowLeft") &&
      document.querySelector(".filter-btn.active")
    ) {
      const activeFilter = document.querySelector(".filter-btn.active");
      const allFilters = Array.from(filterButtons);
      const currentIndex = allFilters.indexOf(activeFilter);

      let nextIndex;
      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % allFilters.length;
      } else {
        nextIndex = (currentIndex - 1 + allFilters.length) % allFilters.length;
      }

      allFilters[nextIndex].click();
      allFilters[nextIndex].focus();
    }
  });

  // 10. PERFORMANCE OPTIMIZATION
  function optimizeImages() {
    portfolioImages.forEach((img) => {
      // Add loading lazy if not present
      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }

      // Add dimensions if image is loaded
      if (img.complete && !img.getAttribute("width")) {
        img.setAttribute("width", img.naturalWidth);
        img.setAttribute("height", img.naturalHeight);
      }
    });
  }

  optimizeImages();
}

/**
 * Trust & Credibility Section - Dubai Technical Maintenance
 * Professional Implementation with Animated Counters
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize trust section
  initTrustSection();

  function initTrustSection() {
    // Initialize hover effects
    initHoverEffects();

    // Initialize visibility observers
    initVisibilityObservers();

    // Initialize click handlers
    initClickHandlers();
  }

  /**
   * Enhanced Hover Effects
   */
  function initHoverEffects() {
    // Add subtle tilt effect on cards
    const trustCards = document.querySelectorAll(".trust-card");

    trustCards.forEach((card) => {
      card.addEventListener("mouseenter", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / rect.width;
        const yPercent = y / rect.height;

        // Subtle 3D tilt effect
        const tiltX = (xPercent - 0.5) * 5;
        const tiltY = (yPercent - 0.5) * -5;

        this.style.transform = `translateY(-5px) perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform =
          "translateY(-5px) perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    });

    // Add ripple effect to certification items
    const certItems = document.querySelectorAll(
      ".certification-item, .guarantee-item",
    );

    certItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Create ripple element
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(31, 79, 122, 0.1);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple CSS if not exists
    if (!document.querySelector("#ripple-animations")) {
      const style = document.createElement("style");
      style.id = "ripple-animations";
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  /**
   * Visibility Observers for Lazy Loading
   */
  function initVisibilityObservers() {
    if ("IntersectionObserver" in window) {
      // Lazy load icons on scroll
      const icons = document.querySelectorAll(
        ".card-icon i, .indicator-icon i",
      );

      const iconObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const icon = entry.target;
              icon.style.opacity = "0";
              icon.style.transform = "scale(0)";

              // Animate in
              setTimeout(() => {
                icon.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
                icon.style.opacity = "1";
                icon.style.transform = "scale(1)";
              }, 100);

              iconObserver.unobserve(icon);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        },
      );

      icons.forEach((icon) => iconObserver.observe(icon));

      // Animate badges in sequence
      const complianceBadges = document.querySelectorAll(".compliance-badge");

      const badgeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              complianceBadges.forEach((badge, index) => {
                setTimeout(() => {
                  badge.style.opacity = "0";
                  badge.style.transform = "translateY(20px)";

                  setTimeout(() => {
                    badge.style.transition =
                      "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
                    badge.style.opacity = "1";
                    badge.style.transform = "translateY(0)";
                  }, 50);
                }, index * 100);
              });

              badgeObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3,
        },
      );

      const complianceSection = document.querySelector(".compliance-section");
      if (complianceSection) {
        badgeObserver.observe(complianceSection);
      }
    }
  }

  /**
   * Click Handlers for Interactive Elements
   */
  function initClickHandlers() {
    // Copy certification details on click
    const certItems = document.querySelectorAll(".certification-item");

    certItems.forEach((item) => {
      item.addEventListener("click", function () {
        const title = this.querySelector("h4").textContent;
        const desc = this.querySelector(".certification-desc").textContent;
        const textToCopy = `${title}: ${desc}`;

        // Copy to clipboard if supported
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              showToast("Certification details copied to clipboard");
            })
            .catch((err) => {
              console.error("Failed to copy:", err);
            });
        }
      });
    });

    // Add smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  /**
   * Toast Notification System
   */
  function showToast(message) {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "trust-toast";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = message;

    // Style toast
    toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    }, 10);

    // Remove after delay
    setTimeout(() => {
      toast.style.transform = "translateY(100px)";
      toast.style.opacity = "0";

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Performance Optimization
   */
  function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Update any scroll-dependent elements
      }, 100);
    });

    // Throttle resize events
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments
      }, 250);
    });

    // Use passive event listeners for touch
    const touchEvents = ["touchstart", "touchmove"];
    touchEvents.forEach((eventName) => {
      window.addEventListener(eventName, () => {}, {
        passive: true,
        capture: false,
      });
    });
  }

  // Initialize performance optimizations
  optimizePerformance();
});

/**
 * Footer Section - Dubai Technical Maintenance
 * Professional Implementation with Enhanced Features
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize footer functionality
  initFooter();

  function initFooter() {
    // Update current year
    updateCurrentYear();

    // Initialize back to top button
    initBackToTop();

    // Initialize social media analytics
    initSocialAnalytics();

    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();

    // Initialize working hours based on current time
    updateWorkingHoursStatus();

    // Initialize lazy loading for logo
    initLogoLoading();
  }

  /**
   * Update Current Year in Copyright
   */
  function updateCurrentYear() {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.textContent = currentYear;
    }
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Scroll to top function
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Event listeners
    window.addEventListener("scroll", toggleBackToTop);
    backToTopBtn.addEventListener("click", scrollToTop);

    // Initial check
    toggleBackToTop();

    // Keyboard support
    backToTopBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToTop();
      }
    });
  }

  /**
   * Social Media Analytics
   */
  function initSocialAnalytics() {
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const platform = this.className.includes("facebook")
          ? "facebook"
          : this.className.includes("twitter")
            ? "twitter"
            : this.className.includes("linkedin")
              ? "linkedin"
              : this.className.includes("instagram")
                ? "instagram"
                : "whatsapp";

        const url = this.getAttribute("href");
        // Optional: Open in new tab with tracking parameters
        if (!url.includes("whatsapp")) {
          e.preventDefault();
          window.open(url, "_blank", "noopener,noreferrer");
        }
      });
    });
  }

  /**
   * Smooth Scrolling for Anchor Links
   */
  function initSmoothScrolling() {
    // Select all links with hashes
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Calculate header offset
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update URL hash without scrolling
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  /**
   * Update Working Hours Status
   */
  function updateWorkingHoursStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday

    const emergencyItem = document.querySelector(".hours-item:first-child");

    if (emergencyItem) {
      const timeElement = emergencyItem.querySelector(".hours-time");

      // Dubai timezone (UTC+4)
      const isAfterHours = currentHour < 8 || currentHour >= 20;
      const isFriday = currentDay === 5; // Friday in UAE

      let statusText = "24/7";
      let statusClass = "normal";

      if (isFriday && (currentHour < 9 || currentHour >= 18)) {
        statusText = "Reduced Hours";
        statusClass = "warning";
      } else if (isAfterHours) {
        statusText = "On-Call Team";
        statusClass = "after-hours";
      }

      // Update display
      timeElement.textContent = statusText;
      timeElement.className = `hours-time ${statusClass}`;

      // Add CSS for status classes if not exists
      if (!document.querySelector("#hours-status-styles")) {
        const style = document.createElement("style");
        style.id = "hours-status-styles";
        style.textContent = `
                    .hours-time.warning {
                        background: rgba(255, 193, 7, 0.2);
                        color: #ffc107;
                    }
                    .hours-time.after-hours {
                        background: rgba(220, 53, 69, 0.2);
                        color: #dc3545;
                    }
                `;
        document.head.appendChild(style);
      }
    }
  }

  /**
   * Lazy Load Footer Logo
   */
  function initLogoLoading() {
    const logo = document.querySelector(".footer-logo img");
    if (!logo) return;

    // If logo is already loaded, add loaded class
    if (logo.complete) {
      logo.classList.add("loaded");
    } else {
      logo.addEventListener("load", function () {
        this.classList.add("loaded");
      });

      logo.addEventListener("error", function () {
        // Fallback to text logo if image fails to load
        this.style.display = "none";
        const logoContainer = this.closest(".footer-logo");
        const textLogo = document.createElement("div");
        textLogo.className = "text-logo";
        textLogo.innerHTML = `
                    <h3 style="color: var(--white-color); margin: 0;">Methaq Almajara</h3>
                    <p style="color: var(--secondary-color); margin: 0; font-size: 0.875rem;">Technical Service LLC</p>
                `;
        logoContainer.appendChild(textLogo);
      });
    }
  }

  /**
   * Performance Optimizations
   */
  function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const scrollHandlers = [];

    function addScrollHandler(handler) {
      scrollHandlers.push(handler);
    }

    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollHandlers.forEach((handler) => handler());
      }, 100);
    });

    // Add back to top handler
    addScrollHandler(() => {
      const backToTopBtn = document.getElementById("backToTop");
      if (backToTopBtn) {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }
    });

    // Throttle resize events
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Update any responsive elements
      }, 250);
    });
  }

  // Initialize performance optimizations
  optimizePerformance();
});

// Make functions available globally for debugging
window.footerUtils = {
  updateYear: function () {
    updateCurrentYear();
  },

  testEmergency: function () {
    const emergencyBtn = document.querySelector(".emergency-btn");
    if (emergencyBtn) {
      emergencyBtn.click();
    }
  },

  printContactInfo: function () {
    const printEvent = new Event("click");
    const printBtn = document.querySelector(".footer-print-btn");
    if (printBtn) {
      printBtn.dispatchEvent(printEvent);
    }
  },
};
