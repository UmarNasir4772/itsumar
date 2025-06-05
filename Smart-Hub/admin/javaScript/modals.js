document.addEventListener("DOMContentLoaded", function () {
  // Profile Modal Variable
  const ProModal = this.getElementById("profileModal");
  const ProBtn = this.getElementById("PorfileBtn");

  // Client Modal Variable
  const CLientModal = this.getElementById("client-details");
  const cSetBTN = this.getElementById("cSetBTN");
  const cVeiwBTn = this.querySelectorAll("#ClientView");

  // Staff Modal Variable
  const StaffModal = this.getElementById("Staff-details");
  const sVeiwBTn = this.querySelectorAll("#StaffView");
  const sSetBTN = this.getElementById("StaffSetBTN");

  // Profile Set Modal
  const ProSetModal = this.getElementById("pSetModal");
  const ProSetBtn = this.getElementById("ProSetBtn");
  const pSetBTN = this.getElementById("pSetBTN");

  // Staff Update Modal
  const StaffUPModal = this.getElementById("StaffUpdate");
  const SUpBtn = this.getElementById("SUpBTN");
  const sEditBTn = this.querySelectorAll("#StaffEdit");

  // ADD Staff Modal
  const AddStaffModal = this.getElementById("addStaff");
  const ModalcloseBtn = this.getElementById("AddStaffTN");
  const AddStaffBTn = this.getElementById("ShowModal");

  // Payment Modal
  const PaymentModal = this.getElementById("addPayment");
  const closePayModal = this.getElementById("closePayModal");
  // const ShowPayModal = this.getElementById("ShowPayModal");

  // BackGround Color Black variable
  const bgBlack = this.getElementById("blackWall");
  const closeBtn = this.getElementById("closeBTN");

  // Product Modals
  const productViewModal = this.getElementById("Product-details");
  const productUpadateModal = this.getElementById("Product-Update");
  const prodcutaddModal = this.getElementById("Product-Add");
  const ProductViewBTN = this.getElementById("ProductView");
  const ProductEditBTN = this.getElementById("ProductEdit");
  const ProductAddBTN = this.getElementById("ShowProductModal");
  const closeProductModal = this.querySelectorAll("#Product-Modal-btn");

  ProductAddBTN.addEventListener("click", function () {
    prodcutaddModal.classList.remove("d-none");
    showBlack();
  });
  ProductEditBTN.addEventListener("click", function () {
    productUpadateModal.classList.remove("d-none");
    showBlack();
  });
  ProductViewBTN.addEventListener("click", function () {
    productViewModal.classList.remove("d-none");
    showBlack();
  });

  closeProductModal.forEach((BTN) => {
    BTN.addEventListener("click", function (e) {
      e.preventDefault();

      // view client detials
      BTN.parentElement.classList.add("d-none");
      HideBlack();
    });
  });

  // clink Event Funtion for all
  ProBtn.addEventListener("click", function () {
    ShowProModal();
    showBlack();
  });

  // ShowPayModal.addEventListener("click", function () {
  //   PaymentModal.classList.remove("d-none");
  //   showBlack();
  // });

  closePayModal.addEventListener("click", function () {
    PaymentModal.classList.add("d-none");
    HideBlack();
  });

  AddStaffBTn.addEventListener("click", function () {
    AddStaffModal.classList.remove("d-none");
    console.log(AddStaffModal);
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

  SUpBtn.addEventListener("click", function () {
    HideStaffUpModal();
    HideBlack();
  });

  ModalcloseBtn.addEventListener("click", function () {
    AddStaffModal.classList.add("d-none");
    HideBlack();
  });

  cSetBTN.addEventListener("click", function () {
    HideClientSetModal();
    HideBlack();
  });

  sSetBTN.addEventListener("click", function () {
    HideStaffModal();
    HideBlack();
  });

  bgBlack.addEventListener("click", function () {
    if (!ProModal.classList.contains("d-none")) {
      HideProModal();
    }
    if (!ProSetModal.classList.contains("d-none")) {
      HideProSetModal();
    }
    if (!CLientModal.classList.contains("d-none")) {
      HideClientSetModal();
    }
    if (!StaffModal.classList.contains("d-none")) {
      HideStaffModal();
    }
    if (!StaffUPModal.classList.contains("d-none")) {
      HideStaffUpModal();
    }
    if (!AddStaffModal.classList.contains("d-none")) {
      AddStaffModal.classList.add("d-none");
    }

    if (!PaymentModal.classList.contains("d-none")) {
      PaymentModal.classList.add("d-none");
    }

    HideBlack();
  });

  ProSetBtn.addEventListener("click", function () {
    showProSetModal();
    showBlack();
  });

  cVeiwBTn.forEach((client) => {
    client.addEventListener("click", function (e) {
      e.preventDefault();

      // view client detials
      CLientModal.classList.remove("d-none");
      showBlack();
    });
  });

  sVeiwBTn.forEach((staff) => {
    staff.addEventListener("click", function (e) {
      e.preventDefault();

      // view client detials
      StaffModal.classList.remove("d-none");
      showBlack();
    });
  });

  sEditBTn.forEach((staff) => {
    staff.addEventListener("click", function (e) {
      e.preventDefault();

      // view client detials
      StaffUPModal.classList.remove("d-none");
      showBlack();
    });
  });

  // Function Details
  function HideBlack() {
    bgBlack.classList.add("d-none");
  }

  function showBlack() {
    bgBlack.classList.remove("d-none");
  }

  function HideClientSetModal() {
    CLientModal.classList.add("d-none");
  }

  function HideStaffUpModal() {
    StaffUPModal.classList.add("d-none");
  }

  function HideStaffModal() {
    StaffModal.classList.add("d-none");
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

document.addEventListener("DOMContentLoaded", function () {
  // Document viewer functionality
  const documentViewerModal = new bootstrap.Modal(
    document.getElementById("documentViewerModal")
  );
  const viewButtons = document.querySelectorAll(".view-btn");
  const DelButtons = document.querySelectorAll(".del-btn");
  const documentImage = document.getElementById("documentImage");
  const documentPdf = document.getElementById("documentPdf");
  const unsupportedDocument = document.getElementById("unsupportedDocument");
  const downloadBtn = document.getElementById("downloadBtn");
  const downloadDocument = document.getElementById("downloadDocument");
  const documentModalLabel = document.getElementById("documentModalLabel");

  // Delete button functionality
  DelButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const docId = this.getAttribute("data-doc-id");
      const docName = this.getAttribute("data-doc-name");
      const row = this.closest("tr"); // Get the table row for removal

      try {
        // Show confirmation dialog
        const isConfirmed = confirm(
          `Are you sure you want to delete ${docName}?`
        );
        if (!isConfirmed) return;

        // API call to delete document (replace with your actual endpoint)
        const response = await fetch(`/api/documents/${docId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
              .content,
          },
        });

        if (!response.ok) throw new Error("Failed to delete document");

        // Remove the row from UI
        row.remove();

        // Show success toast
        showToast("success", `${docName} deleted successfully`);
      } catch (error) {
        console.error("Delete error:", error);
        showToast("error", `Failed to delete ${docName}`);
      }
    });
  });

  // Toast notification function (reusable)
  function showToast(type, message) {
    const toastContainer = document.createElement("div");
    toastContainer.className = "position-fixed bottom-0 end-0 p-3";
    toastContainer.style.zIndex = "1100";

    const toastClass =
      type === "success" ? "bg-success text-white" : "bg-danger text-white";

    toastContainer.innerHTML = `
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header ${toastClass}">
        <strong class="me-auto">${
          type === "success" ? "Success" : "Error"
        }</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;

    document.body.appendChild(toastContainer);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      toastContainer.remove();
    }, 5000);
  }

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const docName = this.getAttribute("data-doc");
      const docTitle =
        this.parentElement.querySelector(".document-title").textContent;
      const docUrl = `/documents/${docName}`; // Replace with your actual document path

      documentModalLabel.textContent = docTitle;
      downloadBtn.href = docUrl;
      downloadDocument.href = docUrl;

      // Hide all viewers first
      documentImage.style.display = "none";
      documentPdf.style.display = "none";
      unsupportedDocument.classList.add("d-none");

      // Check file type and show appropriate viewer
      if (docName.match(/\.(jpeg|jpg|gif|png)$/i)) {
        documentImage.src = docUrl;
        documentImage.style.display = "block";
      } else if (docName.match(/\.(pdf)$/i)) {
        documentPdf.src = docUrl;
        documentPdf.style.display = "block";
      } else {
        unsupportedDocument.classList.remove("d-none");
      }

      documentViewerModal.show();
    });
  });

  // Close PDF viewer when modal is closed to stop any playing content
  document
    .getElementById("documentViewerModal")
    .addEventListener("hidden.bs.modal", function () {
      if (documentPdf.src) {
        documentPdf.src = "";
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("staffUpdateForm");
  const togglePasswordBtns = document.querySelectorAll(".toggle-password");
  const newPassword = document.getElementById("staffnewPassword");
  const confirmPassword = document.getElementById("staffconfirmPassword");
  const progressBar = document.querySelector(
    ".staff-password-strength .staff-progress-bar"
  );

  // Toggle password visibility
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.closest(".form-floating").querySelector("input");
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  // Password strength indicator
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

  // Password match validation
  confirmPassword.addEventListener("input", function () {
    if (newPassword.value !== this.value && this.value.length > 0) {
      this.classList.add("is-invalid");
    } else {
      this.classList.remove("is-invalid");
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate password match
    if (newPassword.value && newPassword.value !== confirmPassword.value) {
      confirmPassword.classList.add("is-invalid");
      return;
    }

    // Prepare form data
    const formData = {
      name: document.getElementById("staffName").value,
      phone: document.getElementById("staffPhone").value,
      email: document.getElementById("staffEmail").value,
      role: document.getElementById("staffRole").value,
      currentPassword: document.getElementById("currentPassword").value,
      newPassword: newPassword.value || undefined,
    };

    console.log("Form data to be submitted:", formData);

    // Show success message (replace with actual API call)
    const toast = document.createElement("div");
    toast.className = "position-fixed bottom-0 end-0 p-3";
    toast.innerHTML = `
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">Success</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Staff information updated successfully!
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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addStaffForm");
  const togglePasswordBtns = document.querySelectorAll(".toggle-password");
  const passwordInput = document.getElementById("addStaffPassword");
  const confirmPasswordInput = document.getElementById(
    "addStaffConfirmPassword"
  );
  const progressBar = document.querySelector(
    ".password-strength .progress-bar"
  );

  // Toggle password visibility
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.closest(".form-floating").querySelector("input");
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  // Password strength indicator
  passwordInput.addEventListener("input", function () {
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

  // Password match validation
  confirmPasswordInput.addEventListener("input", function () {
    if (passwordInput.value !== this.value && this.value.length > 0) {
      this.classList.add("is-invalid");
    } else {
      this.classList.remove("is-invalid");
    }
  });

  // Form validation and submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    // Validate password match
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) return;

    // Prepare form data
    const formData = {
      name: document.getElementById("addStaffName").value,
      phone: document.getElementById("addStaffPhone").value,
      email: document.getElementById("addStaffEmail").value,
      role: document.getElementById("addStaffRole").value,
      password: passwordInput.value,
    };

    console.log("Form data to be submitted:", formData);

    // Show success message (replace with actual API call)
    const toast = document.createElement("div");
    toast.className = "position-fixed bottom-0 end-0 p-3";
    toast.innerHTML = `
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">Success</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          New staff member added successfully!
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds and reset form
    setTimeout(() => {
      toast.remove();
      form.reset();
      progressBar.style.width = "0%";
      progressBar.className = "progress-bar";
    }, 3000);
  });

  // Real-time validation for required fields
  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", function () {
      if (this.value.trim()) {
        this.classList.remove("is-invalid");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addPaymentForm");
  const payDate = document.getElementById("PayDate");
  const payClientName = document.getElementById("PayClentName");
  const payReceipt = document.getElementById("PayReceipt");

  // Validate date (not in future)
  function validateDate() {
    const selectedDate = new Date(payDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

    if (!payDate.value) {
      payDate.classList.add("is-invalid");
      console.log(payDate);
      return false;
    }

    if (selectedDate > today) {
      payDate.classList.add("is-invalid");
      payDate.nextElementSibling.nextElementSibling.textContent =
        "Date cannot be in the future";
      return false;
    }

    payDate.classList.remove("is-invalid");
    return true;
  }

  // Validate client name (minimum 2 characters)
  function validateClientName() {
    if (!payClientName.value.trim() || payClientName.value.trim().length < 2) {
      payClientName.classList.add("is-invalid");
      return false;
    }
    payClientName.classList.remove("is-invalid");
    return true;
  }

  // Validate receipt file (PDF, JPG, PNG)
  function validateReceipt() {
    if (!payReceipt.files || payReceipt.files.length === 0) {
      payReceipt.classList.add("is-invalid");
      return false;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const file = payReceipt.files[0];

    if (!allowedTypes.includes(file.type)) {
      payReceipt.classList.add("is-invalid");
      payReceipt.nextElementSibling.textContent =
        "Only PDF, JPG, or PNG files allowed";
      return false;
    }

    // Optional: Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      payReceipt.classList.add("is-invalid");
      payReceipt.nextElementSibling.textContent =
        "File size must be less than 2MB";
      return false;
    }

    payReceipt.classList.remove("is-invalid");
    return true;
  }

  // Real-time validation as user types
  payDate.addEventListener("change", validateDate);
  payClientName.addEventListener("input", validateClientName);
  payReceipt.addEventListener("change", validateReceipt);

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isDateValid = validateDate();
    const isNameValid = validateClientName();
    const isReceiptValid = validateReceipt();

    if (isDateValid && isNameValid && isReceiptValid) {
      // Prepare form data for submission
      const formData = {
        date: payDate.value,
        clientName: payClientName.value.trim(),
        receipt: payReceipt.files[0].name,
        // For actual submission, you would use FormData
      };

      console.log("Form data valid for submission:", formData);

      // Show success message
      showToast("success", "Payment receipt added successfully!");

      // Optional: Reset form after successful submission
      setTimeout(() => {
        form.reset();
      }, 2000);
    } else {
      // Show error message
      showToast("error", "Please correct the errors in the form");
    }
  });

  // Reset form handler
  form.addEventListener("reset", function () {
    // Clear all validation states
    [payDate, payClientName, payReceipt].forEach((field) => {
      field.classList.remove("is-invalid");
    });
  });

  // Helper function to show toast messages
  function showToast(type, message) {
    const toastContainer = document.createElement("div");
    toastContainer.className = "position-fixed bottom-0 end-0 p-3";
    toastContainer.style.zIndex = "1100"; // Above everything

    const toastClass =
      type === "success" ? "bg-success text-white" : "bg-danger text-white";

    toastContainer.innerHTML = `
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header ${toastClass}">
          <strong class="me-auto">${
            type === "success" ? "Success" : "Error"
          }</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;

    document.body.appendChild(toastContainer);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      toastContainer.remove();
    }, 5000);
  }
});
