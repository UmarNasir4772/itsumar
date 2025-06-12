// === HR EMPLOYEES JAVASCRIPT ===

window.addEventListener("DOMContentLoaded", () => {
  setupEmployeeHandlers();
  setupEmployeeValidation();
});

function setupEmployeeHandlers() {
  document
    .querySelectorAll(".btn-employee-add")
    .forEach((btn) =>
      btn.addEventListener("click", () => openEmployeeModal("add"))
    );

  document
    .querySelectorAll(".btn-employee-edit")
    .forEach((btn) =>
      btn.addEventListener("click", () => openEmployeeModal("edit"))
    );

  document
    .querySelectorAll(".btn-employee-view")
    .forEach((btn) =>
      btn.addEventListener("click", () => openEmployeeModal("view"))
    );

  document.querySelectorAll(".btn-employee-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("deleteEmpName").textContent = "Athar Gul"; // Replace with dynamic name
      document.getElementById("confirmDeleteBtn").onclick = () => {
        // Perform deletion logic here
        showEmpToast("Employee deleted successfully!", "success");
        const deleteModal = bootstrap.Modal.getInstance(
          document.getElementById("employeeDeleteModal")
        );
        deleteModal.hide();
      };
    });
  });
}

function openEmployeeModal(mode) {
  const form = document.getElementById("employeeForm");
  form.reset();
  clearValidation();

  const title = document.getElementById("employeeModalLabel");
  const inputs = form.querySelectorAll("input, select, textarea");
  const isView = mode === "view";

  inputs.forEach((el) => (el.disabled = isView));
  title.textContent =
    mode === "add"
      ? "Add Employee"
      : mode === "edit"
      ? "Edit Employee"
      : "View Employee";

  // Toggle buttons visibility
  document
    .getElementById("addEmpBtn")
    .classList.toggle("d-none", mode !== "add");
  document
    .getElementById("updateEmpBtn")
    .classList.toggle("d-none", mode !== "edit");
  // document
  //   .getElementById("closeEmpViewBtn")
  //   .classList.toggle("d-none", mode !== "view");

  // Ensure Cancel button is hidden in view mode
  document
    .querySelector(".modal-footer .btn-secondary")
    .classList.toggle("d-none", mode === "view");

  if (mode !== "add") {
    document.getElementById("empName").value = "Athar Gul";
    document.getElementById("empMobile").value = "+971507648636";
    document.getElementById("empEmail").value = "agm@gmail.com";
    document.getElementById("empEID").value = "789-1996";
    document.getElementById("empPassport").value = "GM479456";
    document.getElementById("empDepartment").value = "HR";
    document.getElementById("empJoinDate").value = "2023-01-01";
    document.getElementById("empVisaExpiry").value = "2025-10-10";
    document.getElementById("empPassportExpiry").value = "2031-07-07";
    document.getElementById("empRole").value = "HR Executive";
  } else {
    document.getElementById("empJoinDate").value = new Date()
      .toISOString()
      .split("T")[0];
  }
}

function clearValidation() {
  document.querySelectorAll("#employeeForm .is-invalid").forEach((el) => {
    el.classList.remove("is-invalid");
  });
}

function setupEmployeeValidation() {
  const saveBtn = document.getElementById("addEmpBtn");
  const updateBtn = document.getElementById("updateEmpBtn");

  [saveBtn, updateBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const fields = [
        "empName",
        "empMobile",
        "empEmail",
        "empEID",
        "empDepartment",
      ];
      let isValid = true;

      fields.forEach((id) => {
        const input = document.getElementById(id);
        const value = input.value.trim();
        if (
          !value ||
          (id === "empEmail" && !validateEmail(value)) ||
          (id === "empMobile" && !validatePhone(value))
        ) {
          input.classList.add("is-invalid");
          isValid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      });

      const file = document.getElementById("empPhoto").files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        document.getElementById("empPhoto").classList.add("is-invalid");
        isValid = false;
      } else {
        document.getElementById("empPhoto").classList.remove("is-invalid");
      }

      if (!isValid) {
        e.preventDefault();
        showEmpToast("Please correct the highlighted errors.", "danger");
      } else {
        showEmpToast("Employee information saved successfully!", "success");
      }
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\+\d{7,15}$/.test(phone);
}

function showEmpToast(message, type = "success") {
  const toast = document.getElementById("toastMessage");
  const toastBody = toast?.querySelector(".toast-body");
  if (!toast || !toastBody) return;

  toastBody.textContent = message;
  toast.classList.remove("bg-success", "bg-danger");
  toast.classList.add(`bg-${type}`);
  new bootstrap.Toast(toast).show();
}
