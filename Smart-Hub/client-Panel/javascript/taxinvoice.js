// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", () => {
  const modal = new bootstrap.Modal(document.getElementById("taxInvoiceModal"));
  const modalEl = document.getElementById("taxInvoiceModal");

  const saveBtn = modalEl.querySelector(".btn-success");
  const cancelBtn = modalEl.querySelector(".btn-secondary");
  const title = modalEl.querySelector("#taxInvoiceModalLabel");

  const refInput = document.getElementById("invoiceRef");
  const dateInput = document.getElementById("invoiceDate");
  const paidAmount = document.getElementById("paidAmount");
  const paidBy = document.getElementById("paidBy");
  const amountDue = document.getElementById("amountDue");
  const previouslyPaid = document.getElementById("previouslyPaid");
  const remarks = document.getElementById("paymentRemarks");

  let currentMode = "add";

  function showToast(message, type = "success") {
    const toastContainer = document.createElement("div");
    toastContainer.className = `toast align-items-center text-white bg-${type} border-0 position-fixed bottom-0 end-0 m-3`;
    toastContainer.style.zIndex = 1056;
    toastContainer.setAttribute("role", "alert");
    toastContainer.setAttribute("aria-live", "assertive");
    toastContainer.setAttribute("aria-atomic", "true");

    toastContainer.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

    document.body.appendChild(toastContainer);
    const toast = new bootstrap.Toast(toastContainer);
    toast.show();
    toastContainer.addEventListener("hidden.bs.toast", () =>
      toastContainer.remove()
    );
  }

  function resetForm() {
    paidAmount.value = "";
    paidBy.value = "Select Method";
    remarks.value = "";
    paidAmount.classList.remove("is-invalid");
    paidBy.classList.remove("is-invalid");
  }

  function setFieldState(disabled) {
    [dateInput, paidAmount, paidBy, remarks].forEach(
      (field) => (field.disabled = disabled)
    );
  }

  function configureModal(mode) {
    currentMode = mode;
    resetForm();
    if (mode === "view") {
      title.textContent = "View Tax Invoice";
      saveBtn.classList.add("d-none");
      setFieldState(true);
    } else if (mode === "edit") {
      title.textContent = "Edit Tax Invoice";
      saveBtn.classList.remove("d-none");
      setFieldState(false);
    } else if (mode === "payment") {
      title.textContent = "Add Payment";
      saveBtn.classList.remove("d-none");
      setFieldState(false);
    } else {
      title.textContent = "Add Tax Invoice";
      saveBtn.classList.remove("d-none");
      setFieldState(false);
    }
  }

  // Attach actions to buttons
  document.querySelectorAll("#taxInvoiceTable tbody tr").forEach((row) => {
    const [editBtn, viewBtn] = row.querySelectorAll("button");

    editBtn.addEventListener("click", () => {
      configureModal("edit");
      refInput.value = "INV-1004";
      dateInput.value = "2025-06-04";
      modal.show();
    });

    viewBtn.addEventListener("click", () => {
      configureModal("view");
      refInput.value = "INV-1004";
      dateInput.value = "2025-06-04";
      modal.show();
    });
  });

  // Save button handler
  saveBtn.addEventListener("click", () => {
    const paid = parseFloat(paidAmount.value) || 0;
    const due = parseFloat(amountDue.value) || 0;

    let valid = true;

    if (paid > due || paid < 0) {
      paidAmount.classList.add("is-invalid");
      valid = false;
    } else {
      paidAmount.classList.remove("is-invalid");
    }

    if (paidBy.value === "Select Method") {
      paidBy.classList.add("is-invalid");
      valid = false;
    } else {
      paidBy.classList.remove("is-invalid");
    }

    if (!valid) {
      showToast("Please correct the errors before saving.", "danger");
      return;
    }

    showToast("Tax Invoice saved successfully.", "success");
    modal.hide();
  });

  // Reset modal state on Add New click
  document
    .querySelector("button[data-bs-target='#taxInvoiceModal']")
    ?.addEventListener("click", () => {
      configureModal("add");
    });

  // Blur close button to fix accessibility warning
  modalEl.addEventListener("hide.bs.modal", () => {
    modalEl.querySelector(".btn-close")?.blur();
  });
});
