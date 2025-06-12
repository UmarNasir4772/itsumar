document.addEventListener("DOMContentLoaded", function () {
  const typeSelect = document.getElementById("reportType");
  const reportTitle = document.getElementById("reportTitle");
  const container = document.getElementById("reportTableContainer");

  const tables = {
    quotations: `
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr><th>Status</th><th>Quotation No</th><th>Date</th><th>Amount</th><th>Name</th><th>Email</th><th>Mobile No</th><th>Prepared By</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="badge bg-success">Approved</span></td><td>QTN-1004</td><td>04-06-2024</td><td>AED 1,200.00</td><td>Athar Gul</td><td>agm@gmail.com</td><td>+971507648636</td><td>Nabeel</td></tr>
          </tbody>
        </table>`,
    expenses: `
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr><th>Status</th><th>Amount</th><th>Location</th><th>Date</th><th>Purpose</th><th>Mobile No</th><th>Approved By</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="badge bg-danger">Pending</span></td><td>AED 100.00</td><td>Dubai</td><td>03-06-2024</td><td>Fuel</td><td>+971507648636</td><td>Ali</td></tr>
          </tbody>
        </table>`,
    invoices: `
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr><th>Status</th><th>Invoice No</th><th>Date</th><th>Amount</th><th>Name</th><th>Email</th><th>Mobile No</th><th>Prepared By</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="badge bg-warning">In Process</span></td><td>INV-1001</td><td>02-06-2024</td><td>AED 2,500.00</td><td>Sarah Khan</td><td>sarah@example.com</td><td>+971501234567</td><td>Nabeel</td></tr>
          </tbody>
        </table>`,
    "tax-invoices": `
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr><th>Status</th><th>Invoice No</th><th>Date</th><th>Amount</th><th>Name</th><th>Email</th><th>Mobile No</th><th>Prepared By</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="badge bg-success">Paid</span></td><td>TINV-202</td><td>01-06-2024</td><td>AED 3,000.00</td><td>Mohammed Ali</td><td>ali@example.com</td><td>+971509876543</td><td>Nabeel</td></tr>
          </tbody>
        </table>`,
    vat: `
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr><th>Excluded</th><th>VAT 5%</th><th>Included</th><th>Location</th><th>Prepared By</th></tr>
          </thead>
          <tbody>
            <tr><td>AED 1,000.00</td><td>AED 50.00</td><td>AED 1,050.00</td><td>Dubai</td><td>Nabeel</td></tr>
          </tbody>
        </table>`,
  };

  function updateReport() {
    const type = typeSelect.value;
    reportTitle.textContent = `Report - ${type
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())}`;
    container.innerHTML = tables[type];
  }

  typeSelect.addEventListener("change", updateReport);
  updateReport();
});
