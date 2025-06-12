// === ACCOUNTS INVOICES JAVASCRIPT ===

window.addEventListener("DOMContentLoaded", () => {
  setupInvoiceModalHandlers();
  setupInvoiceValidation();
  //   setupInvoiceCalculations();
});

function setupInvoiceModalHandlers() {
  document
    .querySelectorAll(".btn-invoice-add")
    .forEach((btn) =>
      btn.addEventListener("click", () => openInvoiceModal("add"))
    );

  document
    .querySelectorAll(".btn-invoice-edit")
    .forEach((btn) =>
      btn.addEventListener("click", () => openInvoiceModal("edit"))
    );

  document
    .querySelectorAll(".btn-invoice-view")
    .forEach((btn) =>
      btn.addEventListener("click", () => openInvoiceModal("view"))
    );

  document
    .getElementById("addInvoiceRow")
    .addEventListener("click", () => addInvoiceRow());

  document
    .getElementById("invoiceVATPercent")
    .addEventListener("input", calculateInvoiceTotals);
}

function openInvoiceModal(mode) {
  const form = document.querySelector("#invoiceModal form");
  form.reset();
  clearInvoiceRows();
  //   addInvoiceRow();

  const inputs = form.querySelectorAll("input, select, textarea, button");
  const isView = mode === "view";
  inputs.forEach((el) => (el.disabled = isView));

  document
    .getElementById("addInvoiceBtn")
    .classList.toggle("d-none", mode !== "add");
  document
    .getElementById("updateInvoiceBtn")
    .classList.toggle("d-none", mode !== "edit");

  document.getElementById("invoiceModalLabel").textContent =
    mode === "add"
      ? "Add Invoice"
      : mode === "edit"
      ? "Edit Invoice"
      : "View Invoice";

  if (mode !== "add") {
    document.getElementById("invoiceNo").value = "INV-1004";
    document.getElementById("qtnRef").value = "QTN-1004";
    document.getElementById("invoiceDate").value = "2025-06-04";
    document.getElementById("invoiceLocation").value = "Dubai";
    document.getElementById("customerName").value = "Athar Gul";
    document.getElementById("customerContact").value = "+971507648636";
    document.getElementById("customerEmail").value = "agm@gmail.com";
    document.getElementById("trnNo").value = "7996532145699";
    document.getElementById("customerAddress").value = "Dubai Business Bay";
    addInvoiceRow("Service A", 500, 3);
  } else {
    document.getElementById("invoiceNo").value = generateInvoiceNo();
    document.getElementById("invoiceDate").value = new Date()
      .toISOString()
      .split("T")[0];
  }
  calculateInvoiceTotals();
}

function generateInvoiceNo() {
  const prefix = "INV-";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return prefix + randomNum;
}

function addInvoiceRow(description = "", price = 0, qty = 1) {
  if (typeof description === "object" && description instanceof Event) {
    description = "";
    price = 0;
    qty = 1;
  } else {
    const tbody = document.querySelector("#invoiceItemsTable tbody");
    const row = document.createElement("tr");
    const index = tbody.children.length + 1;

    row.innerHTML = `
            <td>${index}</td>
            <td><input type="text" class="form-control invoice-description" value="${description}" /></td>
            <td><input type="number" class="form-control invoice-price" value="${price}" /></td>
            <td><input type="number" class="form-control invoice-qty" value="${qty}" /></td>
            <td><input type="text" class="form-control invoice-amount" value="0" readonly /></td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove(); calculateInvoiceTotals();">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;

    tbody.appendChild(row);
    attachInvoiceRowEvents(row);
    calculateInvoiceTotals();
  }
}

function clearInvoiceRows() {
  document.querySelector("#invoiceItemsTable tbody").innerHTML = "";
}

function attachInvoiceRowEvents(row) {
  row
    .querySelector(".invoice-price")
    .addEventListener("input", calculateInvoiceTotals);
  row
    .querySelector(".invoice-qty")
    .addEventListener("input", calculateInvoiceTotals);
}

function calculateInvoiceTotals() {
  let subTotal = 0;
  document.querySelectorAll("#invoiceItemsTable tbody tr").forEach((row) => {
    const price = parseFloat(row.querySelector(".invoice-price")?.value) || 0;
    const qty = parseFloat(row.querySelector(".invoice-qty")?.value) || 0;
    const amount = price * qty;
    row.querySelector(".invoice-amount").value = amount.toFixed(2);
    subTotal += amount;
  });

  document.getElementById("invoiceSubTotal").value = subTotal.toFixed(2);
  const vatPercent =
    parseFloat(document.getElementById("invoiceVATPercent")?.value) || 0;
  const vatAmount = (subTotal * vatPercent) / 100;
  document.getElementById("invoiceVATAmount").value = vatAmount.toFixed(2);
  document.getElementById("invoiceTotal").value = (
    subTotal + vatAmount
  ).toFixed(2);
}

function setupInvoiceValidation() {
  const saveBtn = document.getElementById("addInvoiceBtn");
  const updateBtn = document.getElementById("updateInvoiceBtn");

  [saveBtn, updateBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        const requiredFields = [
          "customerName",
          "customerContact",
          "customerEmail",
          "invoiceDate",
          "invoiceLocation",
        ];
        let isValid = true;

        requiredFields.forEach((id) => {
          const field = document.getElementById(id);
          if (!field.value.trim()) {
            field.classList.add("is-invalid");
            isValid = false;
          } else {
            field.classList.remove("is-invalid");
          }
        });

        document
          .querySelectorAll("#invoiceItemsTable tbody tr")
          .forEach((row) => {
            const desc = row.querySelector(".invoice-description");
            const price = row.querySelector(".invoice-price");
            const qty = row.querySelector(".invoice-qty");

            [desc, price, qty].forEach((input) => {
              if (!input.value.trim() || parseFloat(input.value) <= 0) {
                input.classList.add("is-invalid");
                isValid = false;
              } else {
                input.classList.remove("is-invalid");
              }
            });
          });

        if (!isValid) {
          e.preventDefault();
          showToast("Please correct highlighted errors.", "danger");
        } else {
          showToast("Invoice submitted successfully!", "success");
        }
      });
    }
  });
}

function showToast(message, type = "success") {
  const toastEl = document.getElementById("toastMessage");
  const toastBody = toastEl?.querySelector(".toast-body");

  if (!toastEl || !toastBody) return;
  toastBody.textContent = message;
  toastEl.classList.remove("bg-success", "bg-danger");
  toastEl.classList.add(`bg-${type}`);
  new bootstrap.Toast(toastEl).show();
}
