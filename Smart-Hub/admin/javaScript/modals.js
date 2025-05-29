document.addEventListener("DOMContentLoaded", function () {
  const ProModal = this.getElementById("profileModal");
  const ProSetModal = this.getElementById("pSetModal");
  const ProBtn = this.getElementById("PorfileBtn");
  const ProSetBtn = this.getElementById("ProSetBtn");
  const bgBlack = this.getElementById("blackWall");
  const closeBtn = this.getElementById("closeBTN");
  const pSetBTN = this.getElementById("pSetBTN");

  ProBtn.addEventListener("click", function () {
    ShowProModal();
    showBlack();
  });

  closeBtn.addEventListener("click", function () {
    HideProModal();
    HideBlack();
  });

  pSetBTN.addEventListener("click", function () {
    HideProSetModal();
    HideBlack();
  });

  bgBlack.addEventListener("click", function () {
    if (!ProModal.classList.contains("d-none")) {
      HideProModal();
    }
    if (!ProSetModal.classList.contains("d-none")) {
      HideProSetModal();
    }
    HideBlack();
  });

  ProSetBtn.addEventListener("click", function () {
    showProSetModal();
    showBlack();
  });

  function HideBlack() {
    bgBlack.classList.add("d-none");
  }

  function showBlack() {
    bgBlack.classList.remove("d-none");
  }

  function HideProSetModal() {
    ProSetModal.classList.add("d-none");
  }

  function showProSetModal() {
    ProSetModal.classList.remove("d-none");
  }

  function HideProModal() {
    ProModal.classList.add("d-none");
  }
  function ShowProModal() {
    ProModal.classList.remove("d-none");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("profileUpdateForm");
  const imageUpload = document.getElementById("imageUpload");
  const profileImage = document.getElementById("profileImage");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const progressBar = document.querySelector(".progress-bar");

  // Image Upload Preview
  imageUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        profileImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Password Strength Indicator
  newPassword.addEventListener("input", function () {
    const password = this.value;
    let strength = 0;

    if (password.length > 0) strength += 20;
    if (password.length >= 8) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    progressBar.style.width = strength + "%";

    if (strength < 40) {
      progressBar.className = "progress-bar bg-danger";
    } else if (strength < 70) {
      progressBar.className = "progress-bar bg-warning";
    } else {
      progressBar.className = "progress-bar bg-success";
    }
  });

  // Password Match Validation
  confirmPassword.addEventListener("input", function () {
    if (newPassword.value !== this.value && this.value.length > 0) {
      this.classList.add("is-invalid");
    } else {
      this.classList.remove("is-invalid");
    }
  });

  // Form Submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate password match
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.classList.add("is-invalid");
      return;
    }

    // Here you would typically send data to server
    const formData = {
      name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      currentPassword: document.getElementById("currentPassword").value,
      newPassword: newPassword.value,
    };

    console.log("Form data to be submitted:", formData);

    // Simulate successful submission
    const toast = document.createElement("div");
    toast.className = "position-fixed bottom-0 end-0 p-3";
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header bg-success text-white">
            <strong class="me-auto">Success</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Profile updated successfully!
          </div>
        </div>
      `;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  });
});
