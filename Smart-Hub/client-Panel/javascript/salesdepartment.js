// === QUOTATION MODULE ===

// Entry point
window.addEventListener("DOMContentLoaded", () => {
  initQuotationHandlers();
  attachEvents();
  setupVatListener();

  // Show or hide Save Btn button
  document.querySelectorAll(".view-quotation").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Hide the Save button when in view mode
      const saveButton = document.querySelector("#qmsBtn");
      const pdfButton = document.querySelector("#downloadPDF");

      if (!saveButton.classList.contains("d-none")) {
        saveButton.classList.add("d-none");
      }
      if (pdfButton.classList.contains("d-none")) {
        pdfButton.classList.remove("d-none");
      }
    });
  });

  document
    .querySelectorAll(".edit-quotation, #createQuotationBtn")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        const saveButton = document.querySelector("#qmsBtn");
        const pdfButton = document.querySelector("#downloadPDF");
        if (saveButton) {
          saveButton.classList.remove("d-none");
        }
        if (!pdfButton.classList.contains("d-none")) {
          pdfButton.classList.add("d-none");
        }
      });
    });
});

function initQuotationHandlers() {
  document.querySelectorAll(".edit-quotation").forEach((btn) => {
    btn.addEventListener("click", () => loadQuotation(btn));
  });

  document.querySelectorAll(".view-quotation").forEach((btn) => {
    btn.addEventListener("click", () => loadQuotation(btn));
  });
}

function loadQuotation(button) {
  // Populate fields
  setField("refNo", button.dataset.ref);
  setField("quotationDate", button.dataset.date);
  setField("validTill", button.dataset.valid);
  setField("location", button.dataset.location);
  setField("clientName", button.dataset.name);
  setField("contactNo", button.dataset.contact);
  setField("clientEmail", button.dataset.email);
  setField("clientAddress", button.dataset.address);

  // Populate item table
  const tableBody = document.querySelector("#itemsTable tbody");
  tableBody.innerHTML = "";
  const items = parseItems(button.dataset.items);

  items.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${i + 1}</td>
        <td><input type="text" class="form-control description" value="${
          item.description
        }" /></td>
        <td><input type="number" class="form-control price" value="${
          item.price
        }" /></td>
        <td><input type="number" class="form-control qty" value="${
          item.qty
        }" /></td>
        <td><input type="text" class="form-control amount" value="${(
          item.price * item.qty
        ).toFixed(2)}" readonly /></td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button></td>`;
    tableBody.appendChild(row);
  });

  attachEvents();
  calculateTotals();
}

function setField(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || "";
}

function parseItems(data) {
  try {
    return JSON.parse(data) || [];
  } catch {
    return [
      { description: "Item A", price: 100, qty: 2 },
      { description: "Item B", price: 50, qty: 3 },
    ];
  }
}

function addRow() {
  const table = document.querySelector("#itemsTable tbody");
  const rowCount = table.rows.length + 1;
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${rowCount}</td>
      <td><input type="text" class="form-control description" required></td>
      <td><input type="number" class="form-control price" value="0" min="0" required></td>
      <td><input type="number" class="form-control qty" value="1" min="1" required></td>
      <td><input type="text" class="form-control amount" value="0" readonly></td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button></td>`;
  table.appendChild(row);
  attachEvents();
}

function deleteRow(btn) {
  btn.closest("tr")?.remove();
  calculateTotals();
}

function attachEvents() {
  document.querySelectorAll(".price, .qty").forEach((input) => {
    input.removeEventListener("input", calculateTotals);
    input.addEventListener("input", calculateTotals);
  });
}

function calculateTotals() {
  let subTotal = 0;
  document.querySelectorAll("#itemsTable tbody tr").forEach((row) => {
    const price = parseFloat(row.querySelector(".price")?.value) || 0;
    const qty = parseFloat(row.querySelector(".qty")?.value) || 0;
    const amount = price * qty;
    const amountField = row.querySelector(".amount");
    if (amountField) amountField.value = amount.toFixed(2);
    subTotal += amount;
  });

  setField("subTotal", subTotal.toFixed(2));

  const vatPercent =
    parseFloat(document.getElementById("vatPercent")?.value) || 0;
  const vatAmount = (subTotal * vatPercent) / 100;
  setField("vatAmount", vatAmount.toFixed(2));
  setField("totalAmount", (subTotal + vatAmount).toFixed(2));
}

function setupVatListener() {
  const vatPercentInput = document.getElementById("vatPercent");
  vatPercentInput?.addEventListener("input", calculateTotals);
}

// Form validation with toast
const saveBtn = document.querySelector(".modal-footer .btn-success");
if (saveBtn) {
  saveBtn.addEventListener("click", function (e) {
    const fields = [
      "#clientName",
      "#contactNo",
      "#clientEmail",
      "#clientAddress",
      "#quotationDate",
      "#validTill",
      "#location",
    ];

    let valid = true;
    fields.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el && !el.value.trim()) {
        el.classList.add("is-invalid");
        valid = false;
      } else {
        el?.classList.remove("is-invalid");
      }
    });

    document.querySelectorAll("#itemsTable tbody tr").forEach((row) => {
      [".description", ".price", ".qty"].forEach((selector) => {
        const input = row.querySelector(selector);
        if (!input || !input.value.trim() || parseFloat(input.value) <= 0) {
          input?.classList.add("is-invalid");
          valid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      });
    });

    if (!valid) {
      e.preventDefault();
      showToast("Please fill in all required fields correctly.", "danger");
    } else {
      showToast("Quotation submitted successfully!", "success");
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

function downloadPDF() {
  const element = document.querySelector(".modal-body");
  const opt = {
    margin: 0.5,
    filename: document.getElementById("refNo").value + ".pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}
