// === ADMIN VEHICLE MANAGEMENT JAVASCRIPT ===

window.addEventListener("DOMContentLoaded", () => {
  setupVehicleHandlers();
  setupVehicleValidation();
});

function setupVehicleHandlers() {
  document
    .querySelectorAll(".btn-vehicle-add")
    .forEach((btn) =>
      btn.addEventListener("click", () => openVehicleModal("add"))
    );

  document
    .querySelectorAll(".btn-vehicle-edit")
    .forEach((btn) =>
      btn.addEventListener("click", () => openVehicleModal("edit"))
    );

  document
    .querySelectorAll(".btn-vehicle-view")
    .forEach((btn) =>
      btn.addEventListener("click", () => openVehicleModal("view"))
    );

  document.querySelectorAll(".btn-vehicle-delete").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.getElementById("deleteVehicleNo").textContent = "Vehicle 36852"; // dynamic if needed
      document.getElementById("confirmDeleteVehicleBtn").onclick = () => {
        showVehicleToast("Vehicle deleted successfully!", "success");
        bootstrap.Modal.getInstance(
          document.getElementById("vehicleDeleteModal")
        ).hide();
      };
    })
  );
}

function openVehicleModal(mode) {
  const form = document.getElementById("vehicleForm");
  form.reset();
  clearVehicleValidation();

  const isView = mode === "view";
  const modalTitle = document.getElementById("vehicleModalLabel");

  form
    .querySelectorAll("input, select, textarea")
    .forEach((el) => (el.disabled = isView));

  // Control footer buttons
  document
    .getElementById("addVehicleBtn")
    .classList.toggle("d-none", mode !== "add");
  document
    .getElementById("updateVehicleBtn")
    .classList.toggle("d-none", mode !== "edit");
  document
    .querySelector(".modal-footer .btn-secondary")
    .classList.toggle("d-none", isView);

  modalTitle.textContent =
    mode === "add"
      ? "Add Vehicle"
      : mode === "edit"
      ? "Edit Vehicle"
      : "View Vehicle";

  // Dummy data for view/edit
  if (mode !== "add") {
    document.getElementById("vehicleNo").value = "36852";
    document.getElementById("vehicleCode").value = "DXB";
    document.getElementById("plateSource").value = "C";
    document.getElementById("vehicleMake").value = "Honda";
    document.getElementById("vehicleExpiry").value = "2025-08-30";
    document.getElementById("assignedTo").value = "Athar Gul";
    document.getElementById("vehicleStatusToggle").checked = true;
  }

  // Ownership card handling
  const fileInput = document.getElementById("ownershipCard");
  if (isView) {
    fileInput.classList.add("d-none");
    showUploadedPreview("ownershipCardPreview", "uploaded_card.jpg"); // Static for example
  } else {
    fileInput.classList.remove("d-none");
    document.getElementById("ownershipCardPreview")?.remove();
  }
}

function showUploadedPreview(containerId, fileUrl) {
  let preview = document.createElement("div");
  preview.id = containerId;
  preview.className = "mt-2";

  if (fileUrl.endsWith(".pdf")) {
    preview.innerHTML = `<a href="${fileUrl}" target="_blank" class="btn btn-outline-dark btn-sm">View Ownership Card (PDF)</a>`;
  } else {
    preview.innerHTML = `<img src="${fileUrl}" alt="Ownership Card" class="img-fluid rounded border" style="max-height: 200px;">`;
  }

  document.getElementById("ownershipCard").parentElement.appendChild(preview);
}

function clearVehicleValidation() {
  document
    .querySelectorAll("#vehicleForm .is-invalid")
    .forEach((el) => el.classList.remove("is-invalid"));
}

function setupVehicleValidation() {
  const saveBtn = document.getElementById("addVehicleBtn");
  const updateBtn = document.getElementById("updateVehicleBtn");

  [saveBtn, updateBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const required = [
        "vehicleNo",
        "vehicleCode",
        "plateSource",
        "vehicleMake",
        "vehicleExpiry",
        "assignedTo",
      ];
      let isValid = true;

      required.forEach((id) => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
          el.classList.add("is-invalid");
          isValid = false;
        } else {
          el.classList.remove("is-invalid");
        }
      });

      if (!isValid) {
        e.preventDefault();
        showVehicleToast("Please fix validation errors.", "danger");
      } else {
        showVehicleToast("Vehicle saved successfully!", "success");
      }
    });
  });
}

function showVehicleToast(message, type = "success") {
  const toast = document.getElementById("toastMessage");
  const body = toast?.querySelector(".toast-body");
  if (!toast || !body) return;

  body.textContent = message;
  toast.classList.remove("bg-success", "bg-danger", "bg-warning");
  toast.classList.add(`bg-${type}`);
  new bootstrap.Toast(toast).show();
}
