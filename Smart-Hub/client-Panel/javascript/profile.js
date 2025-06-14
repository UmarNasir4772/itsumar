// Profile Section
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".profile-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".profile-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      const section = this.getAttribute("data-section");
      document
        .querySelectorAll(".profile-tab")
        .forEach((tab) => tab.classList.add("d-none"));
      document.getElementById(section).classList.remove("d-none");
    });
  });
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
