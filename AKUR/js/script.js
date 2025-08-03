document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".bg-slide");
  let current = 0;

  function changeSlide() {
    slides[current].classList.remove("active");

    // Set next slide index
    current = (current + 1) % slides.length;

    slides[current].classList.add("active");
  }

  // Change every 7 seconds
  setInterval(changeSlide, 7000);

});

// JavaScript to handle toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const sideNavbar = document.querySelector('.side-navbar');
  const overlay = document.querySelector('.side-navbar-overlay');
  const toggleBtn = document.querySelector('.side-navbar-toggle');
  const closeBtn = document.querySelector('.side-navbar-close');
  
  // Toggle sidebar
  if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
          sideNavbar.classList.add('active');
          overlay.classList.add('active');
      });
  }
  
  // Close sidebar with close button
  if (closeBtn) {
      closeBtn.addEventListener('click', function() {
          sideNavbar.classList.remove('active');
          overlay.classList.remove('active');
      });
  }
  
  // Close sidebar when clicking on overlay
  if (overlay) {
      overlay.addEventListener('click', function() {
          sideNavbar.classList.remove('active');
          overlay.classList.remove('active');
      });
  }

});