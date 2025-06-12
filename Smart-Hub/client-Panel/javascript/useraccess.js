// === ADMIN USER ACCESS LOGIC ===

window.addEventListener("DOMContentLoaded", () => {
  setupUserModalHandlers();
  setupUserValidation();
});

function setupUserModalHandlers() {
  document
    .querySelectorAll(".btn-user-add")
    .forEach((btn) =>
      btn.addEventListener("click", () => openUserModal("add"))
    );

  document
    .querySelectorAll(".btn-user-edit")
    .forEach((btn) =>
      btn.addEventListener("click", () => openUserModal("edit"))
    );

  document
    .querySelectorAll(".btn-user-view")
    .forEach((btn) =>
      btn.addEventListener("click", () => openUserModal("view"))
    );

  document.querySelectorAll(".btn-user-delete").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.getElementById("deleteUserName").textContent = "Athar Gul"; // Replace dynamically
      document.getElementById("confirmDeleteUserBtn").onclick = () => {
        showUserToast("User deleted successfully!", "success");
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("userDeleteModal")
        );
        modal.hide();
      };
    })
  );
}

function openUserModal(mode) {
  const form = document.getElementById("userAccessForm");
  form.reset();
  clearUserValidation();

  const fields = form.querySelectorAll("input, select, textarea");
  const isView = mode === "view";

  fields.forEach((el) => (el.disabled = isView));

  document.getElementById("userAccessModalLabel").textContent =
    mode === "add" ? "Add User" : mode === "edit" ? "Edit User" : "View User";

  // Toggle buttons visibility
  document
    .getElementById("addUserBtn")
    .classList.toggle("d-none", mode !== "add");
  document
    .getElementById("updateUserBtn")
    .classList.toggle("d-none", mode !== "edit");
  //   document
  //     .getElementById("closeUserViewBtn")
  //     .classList.toggle("d-none", mode !== "view");

  // Ensure Cancel button is hidden in view mode
  document
    .querySelector(".modal-footer .btn-secondary")
    .classList.toggle("d-none", mode === "view");

  if (mode !== "add") {
    document.getElementById("userName").value = "Athar Gul";
    document.getElementById("userMobile").value = "+971507648636";
    document.getElementById("userEmail").value = "agm@gmail.com";
    document.getElementById("userDept").value = "Sales";
    document.getElementById("userRole").value = "Manager";
    document.getElementById("userPassword").value = "secret@123";
    document.getElementById("accessSales").checked = true;
    document.getElementById("userStatus").checked = true;
  } else {
    document.getElementById("userPassword").value = "";
    document.getElementById("userStatus").checked = true;
    document
      .querySelectorAll(".permission-check")
      .forEach((el) => (el.checked = false));
  }
}

function togglePasswordVisibility(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const icon = input.parentElement?.querySelector("i");
  if (!icon) return;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function clearUserValidation() {
  document
    .querySelectorAll("#userAccessForm .is-invalid")
    .forEach((el) => el.classList.remove("is-invalid"));
}

function setupUserValidation() {
  const saveBtn = document.getElementById("addUserBtn");
  const updateBtn = document.getElementById("updateUserBtn");

  [saveBtn, updateBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const fields = [
        "userName",
        "userMobile",
        "userEmail",
        "userDept",
        "userRole",
        "userPassword",
      ];
      let valid = true;

      fields.forEach((id) => {
        const el = document.getElementById(id);
        const val = el.value.trim();
        if (
          !val ||
          (id === "userEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) ||
          (id === "userMobile" && !/^\+\d{7,15}$/.test(val))
        ) {
          el.classList.add("is-invalid");
          valid = false;
        } else {
          el.classList.remove("is-invalid");
        }
      });

      if (!valid) {
        e.preventDefault();
        showUserToast("Please fix validation errors.", "danger");
      } else {
        showUserToast("User saved successfully!", "success");
        const userAccessModal = bootstrap.Modal.getInstance(
          document.getElementById("userAccessModal")
        );
        userAccessModal.hide();
      }
    });
  });
}

function showUserToast(message, type = "success") {
  const toast = document.getElementById("toastMessage");
  const body = toast?.querySelector(".toast-body");
  if (!toast || !body) return;

  body.textContent = message;
  toast.classList.remove("bg-success", "bg-danger", "bg-warning");
  toast.classList.add(`bg-${type}`);
  new bootstrap.Toast(toast).show();
}
