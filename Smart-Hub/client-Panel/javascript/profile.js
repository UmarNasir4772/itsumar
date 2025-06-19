// Profile Section
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".profile-link").forEach((link) => {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
//       document
//         .querySelectorAll(".profile-link")
//         .forEach((l) => l.classList.remove("active"));
//       this.classList.add("active");
//       const section = this.getAttribute("data-section");
//       document
//         .querySelectorAll(".profile-tab")
//         .forEach((tab) => tab.classList.add("d-none"));
//       document.getElementById(section).classList.remove("d-none");
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const sectionSelect = document.querySelectorAll("#display-section");
  sectionSelect.forEach((select) => { 
    select.addEventListener("change", function () {
      const selectedSection = this.value;

      // Hide all profile sections
      document.querySelectorAll(".profile-tab").forEach((tab) => {
        tab.classList.add("d-none");
      });

      // Show selected section
      const target = document.getElementById(selectedSection);
      if (target) {
        target.classList.remove("d-none");
      }
    });
  });
  
});

document.getElementById("zoomImage").addEventListener("wheel", function (e) {
  e.preventDefault();
  const img = e.currentTarget;
  let scale = img.dataset.scale ? parseFloat(img.dataset.scale) : 1;
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 3); // limit zoom
  img.style.transform = `scale(${scale})`;
  img.dataset.scale = scale;
});

function enableEdit(sectionId) {
  const section = document.getElementById(sectionId);
  const inputs = section.querySelectorAll("input, textarea, select");
  
  
  if (sectionId == "company-section" || sectionId == "contractor-section") {
    inputs.forEach((i) => i.classList.remove("d-none"));
    inputs.forEach((i) => i.removeAttribute("readonly"));
    const btn = section.querySelectorAll(".viewbtn");
    btn.forEach((i) => i.classList.add("d-none"));
  }

  if (sectionId == "package-section") {
    inputs[0].removeAttribute("readonly");
  }


  section
    .querySelector(`#${sectionId.replace("-section", "")}-save`)
    .classList.remove("d-none");
  if (section.querySelector("select"))
    section.querySelector("select").removeAttribute("disabled");
}
