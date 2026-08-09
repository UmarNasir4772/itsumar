/**
 * ============================================================
 * BLOG.JS - Blog Page Specific Functionality
 * ============================================================
 */

 (function() {
    'use strict';

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initCategoryFilter();
        initLoadMore();
    });

    // ============================================================
    // Category Filter
    // ============================================================
    function initCategoryFilter() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        const blogItems = document.querySelectorAll('.blog-item');

        if (!categoryTabs.length || !blogItems.length) return;

        // Show initial items (first 6)
        showInitialItems(blogItems);

        categoryTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(function(t) {
                    t.classList.remove('active');
                });

                // Add active class to clicked tab
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                // Reset display
                let visibleCount = 0;

                blogItems.forEach(function(item, index) {
                    const itemCategory = item.getAttribute('data-category');

                    if (category === 'all' || itemCategory === category) {
                        item.classList.remove('hidden');
                        // Show items with animation
                        item.style.opacity = '0';
                        setTimeout(function() {
                            item.style.opacity = '1';
                        }, 50 * visibleCount);
                        visibleCount++;
                    } else {
                        item.classList.add('hidden');
                    }
                });

                // Reset load more state
                const loadMoreBtn = document.getElementById('loadMoreBtn');
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = visibleCount > 6 ? 'inline-block' : 'none';
                }

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
    // Show Initial Items
    // ============================================================
    function showInitialItems(items) {
        const itemsToShow = 6;

        items.forEach(function(item, index) {
            if (index < itemsToShow) {
                item.classList.remove('hidden');
                item.style.opacity = '1';
            } else {
                item.classList.add('hidden');
            }
        });

        // Show load more button if there are more items
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (items.length > itemsToShow) {
                loadMoreBtn.style.display = 'inline-block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    // ============================================================
    // Load More
    // ============================================================
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const blogItems = document.querySelectorAll('.blog-item');

        if (!loadMoreBtn || !blogItems.length) return;

        let currentVisible = 6;

        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.blog-item.hidden');

            if (hiddenItems.length === 0) {
                this.style.display = 'none';
                return;
            }

            // Show next 3 items
            const itemsToShow = Math.min(3, hiddenItems.length);

            for (let i = 0; i < itemsToShow; i++) {
                const item = hiddenItems[i];
                if (item) {
                    item.classList.remove('hidden');
                    // Animate appearance
                    item.style.opacity = '0';
                    setTimeout(function() {
                        item.style.opacity = '1';
                    }, 100 * i);
                }
            }

            // Update current visible count
            currentVisible += itemsToShow;

            // Check if all items are visible
            const remainingHidden = document.querySelectorAll('.blog-item.hidden');
            if (remainingHidden.length === 0) {
                this.style.display = 'none';
            }

            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                setTimeout(function() {
                    AOS.refresh();
                }, 300);
            }
        });
    }

})();

/**
 * ============================================================
 * BLOG.JS - Blog Page Specific Functionality
 * ============================================================
 */

 (function() {
    'use strict';

    // ============================================================
    // Blog Posts Data
    // ============================================================
    const blogPosts = {
        1: {
            title: 'Tips for Choosing the Right Paint Colors for Your Villa in Dubai',
            category: 'Painting',
            date: 'January 15, 2026',
            readTime: '5 min read',
            image: 'assets/images/blog/blog-1.webp',
            imageAlt: 'Tips for choosing the right paint colors for your villa in Dubai',
            content: `
                <p>Choosing the right paint colors for your villa in Dubai is about more than just personal preference. The city's unique climate, architecture, and lifestyle all play a role in determining which colors will work best for your property.</p>
                
                <h3>Consider Dubai's Natural Light</h3>
                <p>Dubai is known for its abundant sunshine. This means that colors can appear differently throughout the day. What looks like a soft beige in the morning might appear stark white in the afternoon sun. Consider how natural light interacts with your chosen colors at different times of day.</p>
                
                <h3>Complement Your Architecture</h3>
                <p>Dubai's architecture ranges from traditional Arabic designs to ultra-modern contemporary styles. Your paint colors should complement the architectural style of your property. For modern villas, consider neutral tones with bold accent walls. For more traditional properties, warmer earth tones often work well.</p>
                
                <h3>Climate Considerations</h3>
                <p>The Dubai climate can be harsh on exterior paint. Choose colors and paint formulations that are designed to withstand high temperatures, humidity, and UV exposure. Lighter colors tend to reflect heat better and maintain their appearance longer.</p>
                
                <h3>Popular Color Trends in Dubai</h3>
                <p>Currently, neutral color palettes with subtle gold and warm beige accents are popular in Dubai's luxury properties. These colors create a sophisticated, timeless look that appeals to both residents and potential buyers.</p>
                
                <p><strong>Need help choosing the perfect colors for your property?</strong> Contact Virexon's painting experts for professional color consultation and premium painting services.</p>
            `
        },
        2: {
            title: 'Common Plumbing Issues in Dubai Properties and How to Fix Them',
            category: 'Plumbing',
            date: 'January 10, 2026',
            readTime: '6 min read',
            image: 'assets/images/blog/blog-2.webp',
            imageAlt: 'Common plumbing issues in Dubai properties',
            content: `
                <p>Dubai properties face unique plumbing challenges due to the city's climate, water quality, and building standards. Understanding common plumbing issues can help you prevent costly repairs and maintain your property's value.</p>
                
                <h3>1. Leaking Pipes and Fixtures</h3>
                <p>Leaks are one of the most common plumbing issues in Dubai properties. They can occur due to aging pipes, poor installation, or corrosion. Even small leaks can lead to significant water damage and mold growth if left unaddressed.</p>
                
                <h3>2. Blocked Drains</h3>
                <p>Sand and debris can accumulate in drains, leading to blockages. This is particularly common in properties near construction sites or in areas with sandy conditions. Regular maintenance and professional drain cleaning can prevent these issues.</p>
                
                <h3>3. Water Pressure Problems</h3>
                <p>Inconsistent water pressure can indicate issues with the main water supply, pipes, or fixtures. This can be frustrating for residents and may indicate a more serious underlying problem.</p>
                
                <h3>4. Hot Water System Issues</h3>
                <p>Dubai's hot climate means many properties rely heavily on hot water systems. Issues with water heaters, storage tanks, or distribution systems can disrupt daily life.</p>
                
                <p><strong>Need professional plumbing assistance?</strong> Contact Virexon for expert plumbing services across Dubai.</p>
            `
        },
        3: {
            title: 'The Ultimate Guide to Tile Selection for Luxury Properties in Dubai',
            category: 'Tile Masonry',
            date: 'January 5, 2026',
            readTime: '7 min read',
            image: 'assets/images/blog/blog-3.webp',
            imageAlt: 'Tile selection for luxury properties in Dubai',
            content: `
                <p>Selecting the right tiles for your luxury property in Dubai is a significant decision that impacts both aesthetics and functionality. With countless options available, it's important to understand the different types of tiles and their applications.</p>
                
                <h3>Porcelain Tiles</h3>
                <p>Porcelain tiles are a popular choice for Dubai properties due to their durability, water resistance, and low maintenance requirements. They're available in a wide range of finishes that mimic natural stone, wood, and other materials.</p>
                
                <h3>Natural Stone</h3>
                <p>For a truly luxurious look, natural stone tiles like marble, travertine, and limestone are unmatched. They bring timeless elegance to any space but require more maintenance and care than porcelain.</p>
                
                <h3>Ceramic Tiles</h3>
                <p>Ceramic tiles offer a cost-effective alternative that still provides excellent durability and aesthetic appeal. They're particularly popular for walls and splashbacks.</p>
                
                <h3>Where to Use Different Tiles</h3>
                <p>Consider the function of each space when selecting tiles. High-traffic areas need durable, slip-resistant options. Bathrooms and kitchens require water-resistant materials. Outdoor spaces need tiles that can withstand temperature changes and UV exposure.</p>
                
                <p><strong>Need professional tile installation?</strong> Virexon's tile masons specialize in luxury tile installation across Dubai.</p>
            `
        },
        4: {
            title: 'Brick Masonry vs Block Work: Which is Right for Your Dubai Property?',
            category: 'Brick Masonry',
            date: 'December 28, 2025',
            readTime: '5 min read',
            image: 'assets/images/blog/blog-4.webp',
            imageAlt: 'Brick masonry vs block work comparison',
            content: `
                <p>When planning construction or renovation work on your Dubai property, understanding the differences between brick masonry and block work is essential. Each method has its advantages and is suited to different applications.</p>
                
                <h3>Brick Masonry</h3>
                <p>Brick masonry involves using fired clay bricks that are laid in mortar. This traditional method offers excellent structural integrity and aesthetic appeal. Brick is durable, fire-resistant, and provides good thermal mass.</p>
                
                <h3>Block Work</h3>
                <p>Block work uses concrete blocks that are larger than standard bricks. This method is typically faster and more cost-effective for large-scale projects. Concrete blocks offer good strength and insulation properties.</p>
                
                <h3>Choosing Between Them</h3>
                <p>The choice between brick and block depends on several factors including budget, timeline, aesthetic preferences, and structural requirements. Brick is often preferred for premium projects where aesthetics matter, while block work is common for structural walls where the surface will be covered.</p>
                
                <p><strong>Need professional masonry services?</strong> Virexon's brick masons provide expert brick and block work for Dubai properties.</p>
            `
        },
        5: {
            title: 'Essential Villa Maintenance Checklist for Dubai Property Owners',
            category: 'Maintenance',
            date: 'December 20, 2025',
            readTime: '8 min read',
            image: 'assets/images/blog/blog-5.webp',
            imageAlt: 'Villa maintenance checklist for Dubai property owners',
            content: `
                <p>Maintaining a villa in Dubai requires regular attention to ensure your property remains in pristine condition. A proactive maintenance approach can prevent costly repairs and preserve your property's value.</p>
                
                <h3>Monthly Maintenance</h3>
                <p>Check your plumbing fixtures for leaks, test your water pressure, and inspect for any signs of mold or water damage. Clean out gutters and drains to prevent blockages.</p>
                
                <h3>Quarterly Maintenance</h3>
                <p>Inspect your exterior paintwork for signs of wear or damage. Check your roof for any issues and clean all air conditioning filters. Test all safety systems including smoke detectors and alarms.</p>
                
                <h3>Annual Maintenance</h3>
                <p>Schedule a comprehensive inspection of your property including plumbing systems, electrical systems, and structural elements. Consider a professional painting refresh for interior and exterior surfaces. Have your HVAC system serviced by a professional.</p>
                
                <p><strong>Need professional maintenance services?</strong> Virexon offers comprehensive property maintenance across Dubai.</p>
            `
        },
        6: {
            title: 'Interior Painting Trends for Dubai Homes and Offices in 2026',
            category: 'Painting',
            date: 'December 15, 2025',
            readTime: '6 min read',
            image: 'assets/images/blog/blog-6.webp',
            imageAlt: 'Interior painting trends for Dubai homes and offices 2026',
            content: `
                <p>As we move through 2026, interior painting trends in Dubai are evolving to reflect the city's sophisticated lifestyle, architectural diversity, and design-forward culture. Here are the top trends shaping Dubai interiors this year.</p>
                
                <h3>Warm Neutrals with Gold Accents</h3>
                <p>Neutral colors with warm undertones are dominating Dubai interiors. These shades create a calm, sophisticated atmosphere while allowing gold accents to provide visual interest and luxury.</p>
                
                <h3>Bold Accent Walls</h3>
                <p>Statement walls in bold colors are becoming increasingly popular. Deep navy, emerald green, and rich terracotta are being used to create dramatic focal points in both homes and offices.</p>
                
                <h3>Textured Finishes</h3>
                <p>Textured paint finishes add depth and dimension to walls. Venetian plaster, lime wash, and other textural techniques are creating sophisticated, tactile surfaces that catch the light beautifully.</p>
                
                <h3>Sustainable Paint Choices</h3>
                <p>Dubai property owners are increasingly focused on sustainability. Low-VOC and eco-friendly paint options are becoming standard, providing healthier indoor environments.</p>
                
                <p><strong>Ready to transform your space?</strong> Virexon's painting team can bring these trends to life in your property.</p>
            `
        },
        7: {
            title: 'How to Prevent Plumbing Emergencies in Your Dubai Property',
            category: 'Plumbing',
            date: 'December 10, 2025',
            readTime: '5 min read',
            image: 'assets/images/blog/blog-7.webp',
            imageAlt: 'Prevent plumbing emergencies in Dubai properties',
            content: `
                <p>Plumbing emergencies can be stressful, disruptive, and expensive. Taking proactive steps to prevent issues can save you time, money, and peace of mind. Here are essential tips for preventing plumbing emergencies in your Dubai property.</p>
                
                <h3>Regular Inspections</h3>
                <p>Schedule regular inspections of your plumbing system, including pipes, fixtures, and water heaters. Early detection of issues can prevent minor problems from becoming emergencies.</p>
                
                <h3>Address Leaks Immediately</h3>
                <p>Even a small drip can indicate a larger problem. Address any signs of leakage immediately to prevent water damage and mold growth.</p>
                
                <h3>Know Your Water Shut-Off Valves</h3>
                <p>Familiarize yourself with the location of your main water shut-off valve and learn how to turn it off quickly. This can prevent extensive damage in the event of a major leak.</p>
                
                <h3>Professional Maintenance</h3>
                <p>Schedule professional plumbing maintenance at least once a year. This allows professionals to identify and address potential issues before they become emergencies.</p>
                
                <p><strong>Need emergency plumbing assistance?</strong> Virexon provides 24/7 plumbing services across Dubai.</p>
            `
        },
        8: {
            title: 'Bathroom Tiling Ideas for Luxury Villas and Apartments in Dubai',
            category: 'Tile Masonry',
            date: 'December 5, 2025',
            readTime: '7 min read',
            image: 'assets/images/blog/blog-8.webp',
            imageAlt: 'Bathroom tiling ideas for luxury properties in Dubai',
            content: `
                <p>The bathroom is one of the most important spaces in any luxury property. The right tiling can transform your bathroom into a spa-like retreat that adds significant value to your property.</p>
                
                <h3>Marble Tiles</h3>
                <p>Marble remains the ultimate luxury tile choice. Its natural beauty, veining, and timeless appeal make it perfect for high-end bathrooms. White and warm-toned marbles are particularly popular in Dubai properties.</p>
                
                <h3>Large Format Tiles</h3>
                <p>Large format tiles are trending in Dubai bathrooms. They create a seamless, spacious look with fewer grout lines, making the space feel more open and luxurious.</p>
                
                <h3>Texture and Pattern</h3>
                <p>Textured tiles and patterned designs are adding character to modern bathrooms. Geometric patterns, encaustic-style tiles, and three-dimensional surfaces create visual interest.</p>
                
                <h3>Neutral with Gold Accents</h3>
                <p>Combining neutral tiles with gold fixtures and accents creates a sophisticated, cohesive look. Gold hardware and accessories complement warm-toned tiles beautifully.</p>
                
                <p><strong>Need professional tile installation?</strong> Virexon's tile masons specialize in luxury bathroom tiling across Dubai.</p>
            `
        },
        9: {
            title: 'Commercial Property Maintenance Tips for Dubai Business Owners',
            category: 'Maintenance',
            date: 'November 28, 2025',
            readTime: '6 min read',
            image: 'assets/images/blog/blog-9.webp',
            imageAlt: 'Commercial property maintenance tips for Dubai business owners',
            content: `
                <p>Maintaining a commercial property in Dubai requires a comprehensive approach that balances aesthetics, functionality, and cost-effectiveness. Well-maintained commercial properties attract tenants, support business operations, and preserve asset value.</p>
                
                <h3>Professional Exterior Maintenance</h3>
                <p>First impressions matter. Ensure your property's exterior is always well-maintained with regular cleaning, painting, and repairs. This includes facades, windows, and signage.</p>
                
                <h3>Regular MEP Inspections</h3>
                <p>Mechanical, Electrical, and Plumbing systems require regular inspection and maintenance to prevent failures and ensure efficiency. Schedule professional inspections at least twice a year.</p>
                
                <h3>Interior Fit-Out Upkeep</h3>
                <p>Maintain interior finishes including paintwork, flooring, and tiling. Regular touch-ups and spot repairs can extend the life of these finishes and maintain a professional appearance.</p>
                
                <h3>Safety and Compliance</h3>
                <p>Stay current with Dubai's building safety regulations and ensure all systems meet compliance standards. This includes fire safety, electrical systems, and accessibility requirements.</p>
                
                <p><strong>Need professional commercial maintenance?</strong> Virexon provides comprehensive services for commercial properties across Dubai.</p>
            `
        }
    };

    // ============================================================
    // DOM Ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initCategoryFilter();
        initLoadMore();
        initBlogModal();
    });

    // ============================================================
    // Category Filter
    // ============================================================
    function initCategoryFilter() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        const blogItems = document.querySelectorAll('.blog-item');

        if (!categoryTabs.length || !blogItems.length) return;

        // Show initial items (first 6)
        showInitialItems(blogItems);

        categoryTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(function(t) {
                    t.classList.remove('active');
                });

                // Add active class to clicked tab
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                // Reset display
                let visibleCount = 0;

                blogItems.forEach(function(item, index) {
                    const itemCategory = item.getAttribute('data-category');

                    if (category === 'all' || itemCategory === category) {
                        item.classList.remove('hidden');
                        // Show items with animation
                        item.style.opacity = '0';
                        setTimeout(function() {
                            item.style.opacity = '1';
                        }, 50 * visibleCount);
                        visibleCount++;
                    } else {
                        item.classList.add('hidden');
                    }
                });

                // Reset load more state
                const loadMoreBtn = document.getElementById('loadMoreBtn');
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = visibleCount > 6 ? 'inline-block' : 'none';
                }

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
    // Show Initial Items
    // ============================================================
    function showInitialItems(items) {
        const itemsToShow = 6;

        items.forEach(function(item, index) {
            if (index < itemsToShow) {
                item.classList.remove('hidden');
                item.style.opacity = '1';
            } else {
                item.classList.add('hidden');
            }
        });

        // Show load more button if there are more items
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (items.length > itemsToShow) {
                loadMoreBtn.style.display = 'inline-block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    // ============================================================
    // Load More
    // ============================================================
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const blogItems = document.querySelectorAll('.blog-item');

        if (!loadMoreBtn || !blogItems.length) return;

        let currentVisible = 6;

        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.blog-item.hidden');

            if (hiddenItems.length === 0) {
                this.style.display = 'none';
                return;
            }

            // Show next 3 items
            const itemsToShow = Math.min(3, hiddenItems.length);

            for (let i = 0; i < itemsToShow; i++) {
                const item = hiddenItems[i];
                if (item) {
                    item.classList.remove('hidden');
                    // Animate appearance
                    item.style.opacity = '0';
                    setTimeout(function() {
                        item.style.opacity = '1';
                    }, 100 * i);
                }
            }

            // Update current visible count
            currentVisible += itemsToShow;

            // Check if all items are visible
            const remainingHidden = document.querySelectorAll('.blog-item.hidden');
            if (remainingHidden.length === 0) {
                this.style.display = 'none';
            }

            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                setTimeout(function() {
                    AOS.refresh();
                }, 300);
            }
        });
    }

    // ============================================================
    // Blog Modal
    // ============================================================
    function initBlogModal() {
        const modal = document.getElementById('blogModal');
        const overlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        const postLinks = document.querySelectorAll('.blog-post-link');

        if (!modal || !overlay || !closeBtn || !postLinks.length) return;

        // Open modal on link click
        postLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const blogId = parseInt(this.getAttribute('data-blog-id'));
                if (blogId && blogPosts[blogId]) {
                    openModal(blogId);
                }
            });
        });

        // Close modal functions
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeydown);
        }

        function handleKeydown(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }

        // Click overlay to close
        overlay.addEventListener('click', closeModal);

        // Click close button to close
        closeBtn.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', handleKeydown);

        // Prevent body scroll when modal is open
        function openModal(blogId) {
            const post = blogPosts[blogId];
            
            // Populate modal with post data
            document.getElementById('modalImage').src = post.image;
            document.getElementById('modalImage').alt = post.imageAlt || 'Blog post image';
            document.getElementById('modalCategory').textContent = post.category;
            document.getElementById('modalDate').textContent = post.date;
            document.getElementById('modalReadTime').textContent = post.readTime;
            document.getElementById('modalTitle').textContent = post.title;
            document.getElementById('modalContent').innerHTML = post.content;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Reset scroll position
            const modalBody = modal.querySelector('.blog-modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }

        // Expose close function globally for any other use
        window.closeBlogModal = closeModal;
    }

})();