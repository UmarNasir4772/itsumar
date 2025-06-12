// === PURCHASE EXPENSES JAVASCRIPT ===

window.addEventListener("DOMContentLoaded", () => {
  attachPurchaseExpenseHandlers();
  setupExpenseFormValidation();
  setupRealtimeValidation();
});

function attachPurchaseExpenseHandlers() {
  document
    .querySelectorAll(".btn-expense-add")
    .forEach((btn) =>
      btn.addEventListener("click", () => openExpenseModal("add"))
    );

  document
    .querySelectorAll(".btn-expense-edit")
    .forEach((btn) =>
      btn.addEventListener("click", () => openExpenseModal("edit"))
    );

  document
    .querySelectorAll(".btn-expense-view")
    .forEach((btn) =>
      btn.addEventListener("click", () => openExpenseModal("view"))
    );
}

function openExpenseModal(mode) {
  const title = document.getElementById("expenseModalLabel");
  const name = document.getElementById("expenseName");
  const amount = document.getElementById("expenseAmount");
  const date = document.getElementById("expenseDate");
  const purpose = document.getElementById("expensePurpose");
  const mobile = document.getElementById("expenseMobile");
  const receipt = document.getElementById("expenseReceipt");

  const previewWrapper = document.getElementById("receiptPreview");
  const preview = document.getElementById("receiptDisplay");

  const submitBtn = document.getElementById("addExpenseBtn");
  const updateBtn = document.getElementById("updateExpenseBtn");

  name.value = "";
  amount.value = "";
  date.value = new Date().toISOString().split("T")[0];
  purpose.value = "";
  mobile.value = "";
  receipt.value = "";
  previewWrapper.style.display = "none";
  preview.innerHTML = "";

  const allFields = [name, amount, date, purpose, mobile, receipt];
  allFields.forEach((el) => {
    el.disabled = mode === "view";
    el.classList.remove("is-invalid");
  });

  submitBtn.classList.toggle("d-none", mode !== "add");
  updateBtn.classList.toggle("d-none", mode !== "edit");

  title.textContent =
    mode === "add"
      ? "Add Expense"
      : mode === "edit"
      ? "Edit Expense"
      : "View Expense";

  if (mode !== "add") {
    name.value = "Athar Gull";
    amount.value = "100";
    date.value = "2025-05-25";
    purpose.value = "Fuel for site visit";
    mobile.value = "+971507648636";
    previewWrapper.style.display = "block";
    preview.innerHTML = '<a href="#" target="_blank">receipt.pdf</a>';
  }
}

function setupExpenseFormValidation() {
  const submitBtn = document.getElementById("addExpenseBtn");
  const updateBtn = document.getElementById("updateExpenseBtn");

  [submitBtn, updateBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        const name = document.getElementById("expenseName");
        const amount = document.getElementById("expenseAmount");
        const date = document.getElementById("expenseDate");
        const purpose = document.getElementById("expensePurpose");
        const mobile = document.getElementById("expenseMobile");

        let valid = true;

        [name, amount, date, purpose, mobile].forEach((field) => {
          if (
            !field.value.trim() ||
            (field.id === "expenseAmount" && parseFloat(field.value) <= 0)
          ) {
            field.classList.add("is-invalid");
            valid = false;
          } else {
            field.classList.remove("is-invalid");
          }
        });

        if (!valid) {
          e.preventDefault();
          showExpenseToast(
            "Please fill in all required fields correctly.",
            "danger"
          );
        } else {
          showExpenseToast("Expense successfully saved.", "success");
        }
      });
    }
  });
}

function setupRealtimeValidation() {
  const fields = [
    { id: "expenseName", type: "text" },
    { id: "expenseAmount", type: "number" },
    { id: "expenseDate", type: "date" },
    { id: "expensePurpose", type: "text" },
    { id: "expenseMobile", type: "text" },
  ];

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (input) {
      input.addEventListener("input", () => {
        const isValid =
          field.type === "number"
            ? parseFloat(input.value) > 0
            : input.value.trim().length > 0;

        input.classList.toggle("is-invalid", !isValid);
      });
    }
  });
}

function showExpenseToast(message, type = "success") {
  const toastEl = document.getElementById("toastMessage");
  const toastBody = toastEl?.querySelector(".toast-body");
  if (!toastEl || !toastBody) return;

  toastBody.textContent = message;
  toastEl.classList.remove("bg-success", "bg-danger");
  toastEl.classList.add(`bg-${type}`);
  new bootstrap.Toast(toastEl).show();
}
