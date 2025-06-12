// === SIDEBAR NAVIGATION & SECTION TOGGLING ===

window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".list-group-item[data-target]");
  const allSections = document.querySelectorAll(".page-section");
  const collapses = document.querySelectorAll(".collapse");
  const subMenu = document.querySelectorAll(".showsub");
  const backWraper = document.getElementById("blackwrapper");
  const closeBtn = document.getElementById("sibebarclose");
  const toggleBar = document.getElementById("toggleBar");

  backWraper.addEventListener("click", function (e) {
    e.preventDefault();
    closeBtn.parentElement.classList.remove("active");
    backWraper.classList.add("d-none");
  });

  toggleBar.addEventListener("click", function (e) {
    e.preventDefault();
    closeBtn.parentElement.classList.add("active");
    backWraper.classList.remove("d-none");
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  });

  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeBtn.parentElement.classList.remove("active");
    backWraper.classList.add("d-none");
  });

  // Show dashboard by default
  showSection("dashboard");

  subMenu.forEach((sub) => {
    sub.addEventListener("click", function (e) {
      e.preventDefault();
      const parentCollapse = this.closest(".collapse");
      collapses.forEach((c) => {
        if (c !== parentCollapse && c.classList.contains("show")) {
          bootstrap.Collapse.getInstance(c)?.hide();
        }
      });
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-target");
      if (!targetId) return;

      // Show selected section, hide others
      showSection(targetId);
      closeBtn.parentElement.classList.remove("active");
      backWraper.classList.add("d-none");

      // Handle submenu toggle logic
      const parentCollapse = this.closest(".collapse");
      collapses.forEach((c) => {
        if (c !== parentCollapse && c.classList.contains("show")) {
          bootstrap.Collapse.getInstance(c)?.hide();
        }
      });
    });
  });

  function showSection(id) {
    allSections.forEach((section) => {
      if (section.id === id) {
        section.classList.remove("d-none");
        section.classList.add("fade-in");
      } else {
        section.classList.add("d-none");
        section.classList.remove("fade-in");
      }
    });
  }
});

// === ANIMATION STYLE ===
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
