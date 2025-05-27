document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements with null checks
  const signInForm = document.querySelector(".sign-in-form");
  const signInFormId = document.getElementById("signInForm");
  const signUpForm = document.querySelector(".sign-up-form");
  const showSignUpBtn = document.getElementById("showSignUp");
  const cancelSignUpBtn = document.getElementById("cancelSignUp");

  // Form Steps
  const steps = document.querySelectorAll(".step");
  const signupSteps = document.querySelectorAll(".signup-step");
  const progressBar = document.querySelector(".progress-bar");

  // Navigation Buttons
  const nextToCompanyInfoBtn = document.getElementById("nextToCompanyInfo");
  const backToAccountDetailsBtn = document.getElementById(
    "backToAccountDetails"
  );
  const nextToDocumentsBtn = document.getElementById("nextToDocuments");
  const backToCompanyInfoBtn = document.getElementById("backToCompanyInfo");

  // Forms
  const accountDetailsForm = document.getElementById("accountDetailsForm");
  const companyInfoForm = document.getElementById("companyInfoForm");
  const documentsForm = document.getElementById("documentsForm");

  // File Inputs
  const fileInputs = document.querySelectorAll('input[type="file"]');

  // Current step tracking
  let currentStep = 1;

  // Initialize application
  function init() {
    // Check if required elements exist
    if (!signInForm || !signUpForm || !progressBar || !signInFormId) {
      console.error("Critical elements not found in the DOM");
      return;
    }

    initFormValidation();
    setupEventListeners();
    if (typeof updateProgressBar === "function") {
      updateProgressBar();
    }
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Show Sign Up Form
    if (showSignUpBtn) {
      showSignUpBtn.addEventListener("click", function (e) {
        e.preventDefault();
        switchForms("signUp");
      });
    }

    // Cancel Sign Up
    if (cancelSignUpBtn) {
      cancelSignUpBtn.addEventListener("click", function (e) {
        e.preventDefault();
        switchForms("signIn");
        resetFormSteps();
      });
    }

    // Navigation between steps
    if (nextToCompanyInfoBtn) {
      nextToCompanyInfoBtn.addEventListener("click", function () {
        if (validateForm(accountDetailsForm)) {
          setActiveStep(2);
        }
      });
    }

    if (backToAccountDetailsBtn) {
      backToAccountDetailsBtn.addEventListener("click", function () {
        setActiveStep(1);
      });
    }

    if (nextToDocumentsBtn) {
      nextToDocumentsBtn.addEventListener("click", function () {
        if (validateForm(companyInfoForm)) {
          setActiveStep(3);
        }
      });
    }

    if (backToCompanyInfoBtn) {
      backToCompanyInfoBtn.addEventListener("click", function () {
        setActiveStep(2);
      });
    }

    // Form submissions
    if (signInFormId) {
      signInFormId.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validateForm(this)) {
          console.log("Sign In Form Submitted");
          alert("Sign In successful! (Demo)");
        }
      });
    }

    if (documentsForm) {
      documentsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validateForm(documentsForm) && validateFileUploads()) {
          console.log("Registration Form Submitted");
          alert("Registration successful! (Demo)");

          setTimeout(() => {
            switchForms("signIn");
            resetFormSteps();
            resetForms();
          }, 1500);
        }
      });
    }

    // File input changes
    fileInputs.forEach((input) => {
      input.addEventListener("change", handleFileInputChange);
    });
  }

  // Handle file input changes
  function handleFileInputChange() {
    const fileName = this.files[0] ? this.files[0].name : "Browse files";
    const label = this.parentElement.querySelector(".file-upload-label");

    if (label) {
      const browseText = label.querySelector(".browse-text");
      if (browseText) {
        browseText.textContent = fileName;
      }
    }

    // Validate file size
    if (this.files[0] && this.files[0].size > 5 * 1024 * 1024) {
      markInputInvalid(this, "File size exceeds 5MB limit");
    } else {
      clearInputValidation(this);
    }
  }

  // Mark input as invalid with message
  function markInputInvalid(input, message) {
    input.classList.add("is-invalid");
    const feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.textContent = message;
    input.parentElement.appendChild(feedback);
  }

  // Clear validation state from input
  function clearInputValidation(input) {
    input.classList.remove("is-invalid");
    const existingFeedback =
      input.parentElement.querySelector(".invalid-feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }
  }

  // Switch between sign-in and sign-up forms
  function switchForms(showForm) {
    if (showForm === "signUp") {
      signInForm.classList.remove("active");
      setTimeout(() => {
        signUpForm.classList.add("active");
        setActiveStep(1);
      }, 300);
    } else {
      signUpForm.classList.remove("active");
      setTimeout(() => {
        signInForm.classList.add("active");
      }, 300);
    }
  }

  // Set active step in the multi-step form
  function setActiveStep(stepNumber) {
    currentStep = stepNumber;

    // Update progress steps
    steps.forEach((step) => {
      const stepValue = parseInt(step.dataset.step);
      if (stepValue <= stepNumber) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    // Update progress bar if it exists
    if (progressBar) {
      const progressPercentage = ((stepNumber - 1) / (steps.length - 1)) * 100;
      progressBar.style.setProperty("--progress", `${progressPercentage}%`);
    }

    // Show corresponding form step
    signupSteps.forEach((step) => {
      const stepClass = step.classList[1]; // Get step-x class
      if (stepClass) {
        const stepValue = parseInt(stepClass.split("-")[1]);
        step.classList.toggle("active", stepValue === stepNumber);
      }
    });

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetFormSteps() {
    setActiveStep(1);
  }

  function resetForms() {
    // Reset all forms
    document.querySelectorAll("form").forEach((form) => {
      if (form) {
        form.reset();
        form.classList.remove("was-validated");
      }
    });

    // Reset file inputs
    fileInputs.forEach((input) => {
      clearInputValidation(input);
      const label = input.parentElement.querySelector(".file-upload-label");
      if (label) {
        const browseText = label.querySelector(".browse-text");
        if (browseText) {
          browseText.textContent = "Browse files";
        }
      }
    });

    // Reset terms checkbox
    const termsCheckbox = document.getElementById("acceptTerms");
    if (termsCheckbox) {
      termsCheckbox.checked = false;
      termsCheckbox.classList.remove("is-invalid");
    }
  }

  function validateForm(form) {
    // Add validation check
    if (!(form instanceof HTMLFormElement)) {
      console.error("Invalid form element provided");
      return false;
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return false;
    }
    return true;
  }

  function scrollToFirstInvalid(form) {
    const firstInvalid = form.querySelector(":invalid");
    if (firstInvalid) {
      firstInvalid.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstInvalid.focus();
    }
  }

  function validateFileUploads() {
    let isValid = true;

    fileInputs.forEach((input) => {
      if (!input.files || input.files.length === 0) {
        markInputInvalid(input, "Please upload this document");
        isValid = false;
      } else if (input.files[0].size > 5 * 1024 * 1024) {
        markInputInvalid(input, "File size exceeds 5MB limit");
        isValid = false;
      }
    });

    const termsCheckbox = document.getElementById("acceptTerms");
    if (termsCheckbox && !termsCheckbox.checked) {
      termsCheckbox.classList.add("is-invalid");
      isValid = false;
    }

    return isValid;
  }

  function initFormValidation() {
    // Custom validation for password match
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (password && confirmPassword) {
      confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
          confirmPassword.setCustomValidity("Passwords must match");
        } else {
          confirmPassword.setCustomValidity("");
        }
      });
    }

    // Initialize progress bar
    if (progressBar) {
      progressBar.style.setProperty("--progress", "0%");
    }
  }

  // Initialize the application
  init();
});
