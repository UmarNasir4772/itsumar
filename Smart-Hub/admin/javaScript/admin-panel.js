document.addEventListener("DOMContentLoaded", function () {
  // Sidebar toggle functionality
  const sidebar = document.getElementById("sidebar");
  const sidebarCollapse = document.getElementById("sidebarCollapse");
  const content = document.getElementById("content");
  const blackWall = document.getElementById("blackWall");

  sidebarCollapse.addEventListener("click", function () {
    sidebar.classList.add("active");
    blackWall.classList.remove("d-none");
    console.log("click");
  });

  blackWall.addEventListener("click", function () {
    sidebar.classList.remove("active");
    this.classList.add("d-none");
  });

  // Navigation functionality
  const navLinks = document.querySelectorAll("#sidebar a");
  const pageSections = document.querySelectorAll(".page-section");

  // Show dashboard by default
  document.getElementById("dashboard").classList.remove("d-none");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((navLink) => {
        navLink.parentElement.classList.remove("active");
      });

      // Add active class to clicked link
      this.parentElement.classList.add("active");

      // Hide all sections
      pageSections.forEach((section) => {
        section.classList.add("d-none");
      });

      // Hide Sidebar
      sidebar.classList.remove("active");

      // Hide Black Wall
      blackWall.classList.add("d-none");

      // Show the selected section
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId).classList.remove("d-none");
    });
  });

  // Generate random data for tables
  generateTableData();

  // Generate animation
  // animateCards();
});

function generateTableData() {
  // New Clients Table
  const newClientsTable = document.getElementById("new-clients-table");
  const clientsTable = document.getElementById("clients-table");
  const accountsTable = document.getElementById("accounts-table");
  const staffTable = document.getElementById("staff-table");
  const productTable = document.getElementById("Product-table");

  // Sample data for new clients
  const newClientsData = [
    {
      id: 1001,
      date: "01-01-2025",
      name: "John Smith",
      company: "Tech Solutions",
      phone: "(555) 123-4567",
      email: "john@tech.com",
      status: 1,
    },
    {
      id: 1002,
      date: "01-01-2025",
      name: "Sarah Johnson",
      company: "Digital Creations",
      phone: "(555) 234-5678",
      email: "sarah@digital.com",
      status: 2,
    },
    {
      id: 1003,
      date: "01-01-2025",
      name: "Michael Brown",
      company: "Web Innovators",
      phone: "(555) 345-6789",
      email: "michael@web.com",
      status: 3,
    },
    {
      id: 1004,
      date: "01-01-2025",
      name: "Emily Davis",
      company: "Data Systems",
      phone: "(555) 456-7890",
      email: "emily@data.com",
      status: 1,
    },
    {
      id: 1005,
      date: "01-01-2025",
      name: "Robert Wilson",
      company: "Cloud Services",
      phone: "(555) 567-8901",
      email: "robert@cloud.com",
      status: 2,
    },
  ];

  // Sample data for clients
  const clientsData = [
    {
      id: 2001,
      date: "01-01-2025",
      name: "Jennifer Lee",
      company: "Software Plus",
      phone: "(555) 678-9012",
      email: "jennifer@software.com",
      status: 1,
      assignedTo: "Accountant 1",
    },
    {
      id: 2002,
      date: "01-01-2025",
      name: "David Miller",
      company: "App Developers",
      phone: "(555) 789-0123",
      email: "david@app.com",
      status: 1,
      assignedTo: "Accountant 2",
    },
    {
      id: 2003,
      date: "01-01-2025",
      name: "Lisa Taylor",
      company: "Code Masters",
      phone: "(555) 890-1234",
      email: "lisa@code.com",
      status: 1,
      assignedTo: "Manager 1",
    },
    {
      id: 2004,
      date: "01-01-2025",
      name: "James Anderson",
      company: "Pixel Perfect",
      phone: "(555) 901-2345",
      email: "james@pixel.com",
      status: 1,
      assignedTo: "Manager 2",
    },
    {
      id: 2005,
      date: "01-01-2025",
      name: "Patricia Thomas",
      company: "UI Experts",
      phone: "(555) 012-3456",
      email: "patricia@ui.com",
      status: 1,
      assignedTo: "Support One",
    },
  ];

  // Sample data for products

  const productData = [
    {
      id: 4001,
      productType: "Basic",
      cost: "1200",
    },
    {
      id: 4002,
      productType: "Standerd",
      cost: "1500",
    },
    {
      id: 4003,
      productType: "Premium",
      cost: "2000",
    },
  ];

  // Sample data for accounts
  const accountsData = [
    {
      id: "PAY-3001",
      date: "01-01-2025",
      name: "Jennifer Lee",
      amount: "$1,200.00",
      method: "Cash",
      status: "Received",
      PayDate: "01-01-2025",
    },
    {
      id: "PAY-3002",
      date: "01-01-2025",
      name: "David Miller",
      amount: "$850.00",
      method: "Cash",
      status: "Pending",
      PayDate: " ",
    },
    {
      id: "PAY-3003",
      date: "01-01-2025",
      name: "Lisa Taylor",
      amount: "$2,500.00",
      method: "Cash",
      status: "Received",
      PayDate: "01-01-2025",
    },
    {
      id: "PAY-3004",
      date: "01-01-2025",
      name: "James Anderson",
      amount: "$1,750.00",
      method: "Cash",
      status: "Received",
      PayDate: "01-01-2025",
    },
    {
      id: "PAY-3005",
      date: "01-01-2025",
      name: "Patricia Thomas",
      amount: "$3,000.00",
      method: "Cash",
      status: "Pending",
      PayDate: " ",
    },
  ];

  // Sample data for staff
  const staffData = [
    { id: 4001, name: "Admin User", role: "Administrator", clients: 15 },
    { id: 4002, name: "Manager One", role: "Manager", clients: 8 },
    { id: 4003, name: "Manager Two", role: "Manager", clients: 6 },
    { id: 4004, name: "Support One", role: "Support", clients: 12 },
    { id: 4005, name: "Support Two", role: "Support", clients: 10 },
  ];

  // Populate new clients table
  newClientsData.forEach((client) => {
    const row = document.createElement("tr");
    row.className = "slide-in";
    row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.date}</td>
            <td>${client.name}</td>
            <td>${client.company}</td>
            <td>${client.phone}</td>
            <td>${client.email}</td>
            <td>
              <div class="dropdown assignTo">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Assign To
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Staff 1</a></li>
                  <li><a class="dropdown-item" href="#">Staff 1</a></li>
                </ul>
              </div>
            </td>
            <td><span class="tdBadge badge ${(() => {
              switch (client.status) {
                case 1:
                  return "text-success";
                case 2:
                  return "text-danger";
                default:
                  return "text-warning";
              }
            })()}">${(() => {
      switch (client.status) {
        case 1:
          return "Active";
        case 2:
          return "InActive";
        case "Inactive":
        default:
          return "Document Require";
      }
    })()}</span></td>
        `;
    newClientsTable.appendChild(row);
  });

  // Populate clients table
  clientsData.forEach((client) => {
    const row = document.createElement("tr");
    row.className = "slide-in";
    row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.date}</td>
            <td>${client.name}</td>
            <td>${client.company}</td>
            <td>${client.phone}</td>
            <td>${client.email}</td>
            <td>
                <button id="ClientView" data-Cid="${
                  client.id
                }" class="tableBtn btn btn-sm btn-info me-1">View</button>
            </td>
            <td><span class="tdBadge badge text-success">${(() => {
              switch (client.status) {
                case 1:
                  return "Active";
                case 2:
                  return "InActive";
                case "Inactive":
                default:
                  return "Document Require";
              }
            })()}</span></td>
            <td><span> ${client.assignedTo}</span></td>
        `;
    clientsTable.appendChild(row);
  });

  // Populate accounts table
  accountsData.forEach((account) => {
    const row = document.createElement("tr");
    row.className = "slide-in";
    const statusClass =
      account.status === "Received" ? "bg-success" : "bg-warning";
    const isPending = account.status !== "Received";
    row.innerHTML = `
           <td>${account.id}</td>
    <td>${account.date}</td>
    <td>${account.name}</td>
    <td>${account.amount}</td>
    <td>${account.method}</td>
    <td>
      <span class="tdBadge badge ${statusClass} ${
      isPending ? "clickable-status" : ""
    }" 
            data-payment-id="${account.id}"
            data-client-name="${account.name}"
            data-amount="${account.amount}">
        ${account.status}
      </span>
    </td>
    <td>${account.PayDate}</td>
    <td><a target="_blank" href="#">View</a></td>
  `;
    accountsTable.appendChild(row);
  });

  // Add event listeners for pending payment statuses
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("clickable-status")) {
      const paymentId = e.target.getAttribute("data-payment-id");
      const clientName = e.target.getAttribute("data-client-name");
      const amount = e.target.getAttribute("data-amount");

      // Show the payment details modal
      showPaymentDetailsModal(paymentId, clientName, amount);
    }
  });

  // Function to show payment details modal
  function showPaymentDetailsModal(paymentId, clientName, amount) {
    // Get modal elements (replace with your actual modal IDs)
    const PaymentModal = document.getElementById("addPayment");
    const clientNameEl = document.getElementById("PayClentName");
    const clientIDEl = document.getElementById("ClentPayId");
    const amountEl = document.getElementById("PayClentAmount");
    const modalTitle = document.getElementById("paymentModalTitle");
    const bgBlack = document.getElementById("blackWall");

    // Populate modal with data
    modalTitle.innerText = `Payment of ${clientName}`;
    clientNameEl.setAttribute("value", clientName);
    amountEl.setAttribute("value", amount);
    clientIDEl.setAttribute("value", paymentId);

    PaymentModal.classList.remove("d-none");
    bgBlack.classList.remove("d-none");
  }

  // Populate staff table
  staffData.forEach((staff) => {
    const row = document.createElement("tr");
    row.className = "slide-in";
    row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.clients}</td>
            <td>
                <button id="StaffView" data-Cid="${staff.id}" class="veBtn btn btn-sm btn-info me-1">View</button>
                <button id="StaffEdit" data-Cid="${staff.id}" class="veBtn btn btn-sm btn-warning">Edit</button>
            </td>
        `;
    staffTable.appendChild(row);
  });

  // Populate Products table
  productData.forEach((product) => {
    const row = document.createElement("tr");
    row.className = "slide-in";
    row.innerHTML = `
              <td>${product.id}</td>
              <td>${product.productType}</td>
              <td>${product.cost}</td>
              <td>
                  <button id="ProductView" data-Cid="${product.id}" class="veBtn btn btn-sm btn-info me-1">View</button>
                  <button id="ProductEdit" data-Cid="${product.id}" class="veBtn btn btn-sm btn-warning">Edit</button>
              </td>
          `;
    productTable.appendChild(row);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".btn-success").forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const statusBadge = row.querySelector(".badge");
      statusBadge.textContent = "Approved";
      statusBadge.classList.remove("bg-danger");
      statusBadge.classList.add("bg-success");
      this.textContent = "Approved";
      this.classList.remove("btn-success");
      this.classList.add("btn-secondary");
      this.disabled = true;
    });
  });
}

function animateCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add("fade-in");
  });
}
