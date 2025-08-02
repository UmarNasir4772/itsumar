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
