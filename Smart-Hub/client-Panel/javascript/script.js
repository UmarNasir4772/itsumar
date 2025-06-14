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

document.addEventListener("DOMContentLoaded", function () {
  const uploadInput = document.getElementById("uploadPhoto");
  const profileImg = document.getElementById("profileImageUpdate");
  const saveBtn = document.querySelector("#userSettingsModal .btn-primary");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  // Image Preview
  uploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Toast Function
  function showToast(message, type = "success") {
    const toast = document.getElementById("toastMessage");
    const body = toast?.querySelector(".toast-body");
    if (!toast || !body) return;

    body.textContent = message;
    toast.classList.remove("bg-success", "bg-danger", "bg-warning");
    toast.classList.add(`bg-${type}`);
    new bootstrap.Toast(toast).show();
  }

  // Save Button Action
  saveBtn.addEventListener("click", function () {
    const pass1 = newPassword.value.trim();
    const pass2 = confirmPassword.value.trim();

    if (pass1 !== pass2) {
      newPassword.classList.add("is-invalid");
      confirmPassword.classList.add("is-invalid");
      showToast("Passwords do not match", "danger");
      return;
    } else {
      newPassword.classList.remove("is-invalid");
      confirmPassword.classList.remove("is-invalid");
    }

    showToast("Profile updated successfully", "success");

    // You can optionally reset password fields here
    // newPassword.value = "";
    // confirmPassword.value = "";

    // Close modal (optional)
    const modal = bootstrap.Modal.getInstance(document.getElementById("userSettingsModal"));
    if (modal) modal.hide();
  });

  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function () {
      const input = document.getElementById(this.dataset.target);
      const icon = this.querySelector("i");
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  });
});




