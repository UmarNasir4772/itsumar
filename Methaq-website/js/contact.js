/**
 * Contact Page JavaScript - UAE Phone Formatting
 * Methaq Almajara Technical Service LLC - Dubai
 * Version: 2.0.1
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initContactForm();
    initServiceButtons();
    initPhoneNumberFormatting();
    initFileUpload();
    initMapFallback();
    initFAQAccordion();
    initFormValidation();
    initAccessibilityFeatures();
    initAnalyticsTracking();
});

// Global variables
let currentFiles = [];
let formSubmitted = false;

/**
 * Initialize Contact Form Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset messages
        hideMessages();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        setLoadingState(true, submitBtn, btnText, spinner);
        
        try {
            // Prepare form data
            const formData = new FormData(this);
            
            // Add files from currentFiles array
            currentFiles.forEach(file => {
                formData.append('attachments', file);
            });
            
            const formObject = Object.fromEntries(formData.entries());
            
            // Add timestamp and user agent
            formObject.timestamp = new Date().toISOString();
            formObject.userAgent = navigator.userAgent;
            formObject.pageUrl = window.location.href;
            formObject.fileCount = currentFiles.length;
            
            // Log form data (for debugging)
            console.log('Form submission:', formObject);
            
            // Simulate API call (replace with actual API endpoint)
            await simulateFormSubmission(formObject);
            
            // Show success message
            showSuccessMessage(successMessage);
            
            // Reset form
            this.reset();
            resetServiceButtons();
            clearFilePreviews();
            currentFiles = [];
            
            // Track successful submission
            trackFormSubmission('success', formObject.service_type);
            
            formSubmitted = true;
            
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage(errorMessage);
            trackFormSubmission('error', 'unknown');
        } finally {
            // Reset loading state
            setLoadingState(false, submitBtn, btnText, spinner);
            
            // Scroll to messages
            setTimeout(() => {
                const message = successMessage.classList.contains('d-none') ? errorMessage : successMessage;
                message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
}

/**
 * Simulate form submission (mock API call)
 */
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate network delay
            const successRate = 0.95; // 95% success rate for demo
            
            if (Math.random() < successRate) {
                resolve({
                    status: 200,
                    message: 'Form submitted successfully',
                    data: formData
                });
            } else {
                reject(new Error('Network error. Please try again.'));
            }
        }, 1500); // 1.5 second delay
    });
}

/**
 * Show success message
 */
function showSuccessMessage(element) {
    if (!element) return;
    element.classList.remove('d-none');
    
    // Announce to screen readers
    announceMessage('Form submitted successfully. We will contact you within 24 hours.');
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        element.classList.add('d-none');
    }, 10000);
}

/**
 * Show error message
 */
function showErrorMessage(element) {
    if (!element) return;
    element.classList.remove('d-none');
    
    // Announce to screen readers
    announceMessage('Error submitting form. Please try again or contact us directly.');
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        element.classList.add('d-none');
    }, 10000);
}

/**
 * Announce message to screen readers
 */
function announceMessage(message) {
    const announcementRegion = document.getElementById('announcement-region');
    if (announcementRegion) {
        announcementRegion.textContent = message;
        
        // Clear after 5 seconds
        setTimeout(() => {
            announcementRegion.textContent = '';
        }, 5000);
    }
}

/**
 * Announce error to screen readers
 */
function announceError(message) {
    const alertRegion = document.getElementById('alert-region');
    if (alertRegion) {
        alertRegion.textContent = 'Error: ' + message;
        
        // Clear after 5 seconds
        setTimeout(() => {
            alertRegion.textContent = '';
        }, 5000);
    }
}

/**
 * Announce service selection
 */
function announceServiceSelection(serviceType) {
    const services = {
        'emergency': 'Emergency Service selected',
        'general': 'General Inquiry selected',
        'quote': 'Request Quote selected',
        'maintenance': 'Scheduled Maintenance selected'
    };
    
    const message = services[serviceType] || 'Service type selected';
    announceMessage(message);
}

/**
 * Validate form before submission
 */
function validateForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    // Reset scroll flag
    window.scrolledToInvalid = false;
    
    // Clear previous validation states
    clearValidation();
    
    // Required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            markFieldInvalid(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            markFieldInvalid(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && !isValidUAEPhoneNumber(field.value)) {
            markFieldInvalid(field, 'Please enter a valid UAE phone number (e.g., +971 50 123 4567)');
            isValid = false;
        } else {
            markFieldValid(field);
        }
    });
    
    // Check terms agreement
    const termsCheckbox = document.getElementById('termsAgreement');
    if (!termsCheckbox.checked) {
        markFieldInvalid(termsCheckbox, 'You must agree to the terms');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Clear validation states
 */
function clearValidation() {
    const form = document.getElementById('contactForm');
    const invalidFields = form.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
        field.classList.remove('is-invalid');
        const feedback = field.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    });
}

/**
 * Mark field as invalid
 */
function markFieldInvalid(field, message) {
    field.classList.add('is-invalid');
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.style.display = 'block';
    }
    
    // Scroll to first invalid field
    if (!window.scrolledToInvalid) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.scrolledToInvalid = true;
    }
    
    // Announce error for screen readers
    announceError(message);
}

/**
 * Mark field as valid
 */
function markFieldValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    // Remove valid class after a while
    setTimeout(() => {
        field.classList.remove('is-valid');
    }, 3000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate UAE phone number format
 */
function isValidUAEPhoneNumber(phone) {
    // Accepts: +971 50 123 4567, +971501234567, 0501234567, 501234567
    const phoneRegex = /^(?:\+971\s?)?(?:0)?(?:5[0-9])\d{7}$/;
    const digits = phone.replace(/\D/g, '');
    
    // Check if it's a valid UAE mobile number
    if (digits.startsWith('971') && digits.length === 12) {
        const mobilePrefix = digits.substring(3, 5);
        return ['50', '52', '54', '55', '56', '58'].includes(mobilePrefix);
    } else if ((digits.startsWith('0') && digits.length === 10) || digits.length === 9) {
        const mobilePrefix = digits.length === 10 ? digits.substring(1, 3) : digits.substring(0, 2);
        return ['50', '52', '54', '55', '56', '58'].includes(mobilePrefix);
    }
    
    return false;
}

/**
 * Format UAE phone number as user types
 */
function formatUAEPhoneNumber(input) {
    // Get current cursor position
    const cursorPos = input.selectionStart;
    let value = input.value;
    
    // Remove all non-digit characters
    let digits = value.replace(/\D/g, '');
    
    // If empty, clear and return
    if (!digits) {
        input.value = '';
        return;
    }
    
    // Store original cursor position
    const wasAtEnd = cursorPos >= value.length;
    
    // Handle different input scenarios
    let formatted = '';
    
    // If starts with UAE country code (971)
    if (digits.startsWith('971')) {
        const mobilePart = digits.substring(3);
        
        if (mobilePart.length === 0) {
            formatted = '+971';
        } else if (mobilePart.length <= 2) {
            formatted = `+971 ${mobilePart}`;
        } else if (mobilePart.length <= 5) {
            formatted = `+971 ${mobilePart.substring(0, 2)} ${mobilePart.substring(2)}`;
        } else if (mobilePart.length <= 9) {
            formatted = `+971 ${mobilePart.substring(0, 2)} ${mobilePart.substring(2, 5)} ${mobilePart.substring(5, 9)}`;
        } else {
            formatted = `+971 ${mobilePart.substring(0, 2)} ${mobilePart.substring(2, 5)} ${mobilePart.substring(5, 9)} ${mobilePart.substring(9, 13)}`;
        }
    }
    // If starts with 0 (local UAE format)
    else if (digits.startsWith('0')) {
        const mobilePart = digits.substring(1);
        
        if (mobilePart.length <= 2) {
            formatted = `0${mobilePart}`;
        } else if (mobilePart.length <= 5) {
            formatted = `0${mobilePart.substring(0, 2)} ${mobilePart.substring(2)}`;
        } else if (mobilePart.length <= 9) {
            formatted = `0${mobilePart.substring(0, 2)} ${mobilePart.substring(2, 5)} ${mobilePart.substring(5, 9)}`;
        } else {
            formatted = `0${mobilePart.substring(0, 2)} ${mobilePart.substring(2, 5)} ${mobilePart.substring(5, 9)} ${mobilePart.substring(9, 13)}`;
        }
    }
    // If starts with mobile prefix (50, 55, etc.)
    else if (['50', '52', '54', '55', '56', '58'].includes(digits.substring(0, 2))) {
        if (digits.length <= 2) {
            formatted = digits;
        } else if (digits.length <= 5) {
            formatted = `${digits.substring(0, 2)} ${digits.substring(2)}`;
        } else if (digits.length <= 9) {
            formatted = `${digits.substring(0, 2)} ${digits.substring(2, 5)} ${digits.substring(5, 9)}`;
        } else {
            formatted = `${digits.substring(0, 2)} ${digits.substring(2, 5)} ${digits.substring(5, 9)} ${digits.substring(9, 13)}`;
        }
    }
    // Default case
    else {
        formatted = digits;
    }
    
    // Update input value
    input.value = formatted;
    
    // Calculate new cursor position
    let newCursorPos = cursorPos;
    
    // Adjust cursor position for added spaces
    const spacesAdded = formatted.split(' ').length - 1;
    const spacesOriginal = value.split(' ').length - 1;
    
    newCursorPos += (spacesAdded - spacesOriginal);
    
    // If cursor was at the end, keep it at the end
    if (wasAtEnd) {
        newCursorPos = formatted.length;
    }
    
    // Ensure cursor is not in the middle of a space
    if (formatted[newCursorPos] === ' ') {
        newCursorPos++;
    }
    
    // Keep cursor within bounds
    newCursorPos = Math.max(0, Math.min(newCursorPos, formatted.length));
    
    // Set cursor position
    input.setSelectionRange(newCursorPos, newCursorPos);
}

/**
 * Initialize Phone Number Formatting for UAE
 */
function initPhoneNumberFormatting() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;
    
    // Set initial placeholder
    phoneInput.placeholder = '+971 50 123 4567';
    
    // Format on input
    phoneInput.addEventListener('input', function(e) {
        formatUAEPhoneNumber(this);
    });
    
    // Final formatting on blur
    phoneInput.addEventListener('blur', function(e) {
        const value = this.value;
        const digits = value.replace(/\D/g, '');
        
        // If empty, return
        if (!digits) return;
        
        // Convert to standard UAE format
        if (digits.startsWith('0')) {
            // Convert 0501234567 to +971 50 123 4567
            const mobilePart = digits.substring(1);
            if (mobilePart.length >= 9) {
                this.value = `+971 ${mobilePart.substring(0, 2)} ${mobilePart.substring(2, 5)} ${mobilePart.substring(5, 9)}`;
            }
        } else if (!digits.startsWith('971') && digits.length >= 9) {
            // Convert 501234567 to +971 50 123 4567
            this.value = `+971 ${digits.substring(0, 2)} ${digits.substring(2, 5)} ${digits.substring(5, 9)}`;
        } else if (digits.startsWith('971') && digits.length >= 12) {
            // Ensure proper formatting for +971501234567
            const mobilePart = digits.substring(3);
            this.value = `+971 ${mobilePart.substring(0, 2)} ${mobilePart.substring(2, 5)} ${mobilePart.substring(5, 9)}`;
        }
        
        // Validate on blur
        if (this.value && !isValidUAEPhoneNumber(this.value)) {
            markFieldInvalid(this, 'Please enter a valid UAE mobile number (e.g., +971 50 123 4567)');
        }
    });
    
    // Handle paste event
    phoneInput.addEventListener('paste', function(e) {
        // Allow paste to complete
        setTimeout(() => {
            formatUAEPhoneNumber(this);
        }, 0);
    });
    
    // Handle focus event
    phoneInput.addEventListener('focus', function(e) {
        // If empty, set initial +971
        if (!this.value.trim()) {
            this.value = '+971 ';
            this.setSelectionRange(5, 5);
        }
    });
}

/**
 * Initialize Service Type Buttons
 */
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceTypeInput = document.getElementById('serviceType');
    
    if (!serviceButtons.length || !serviceTypeInput) return;
    
    // Set initial active button
    const initialService = serviceTypeInput.value;
    setActiveServiceButton(initialService);
    
    // Add click handlers
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            serviceTypeInput.value = serviceType;
            setActiveServiceButton(serviceType);
            
            // Announce selection for screen readers
            announceServiceSelection(serviceType);
            
            // Track service type selection
            trackServiceSelection(serviceType);
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Set active service button
 */
function setActiveServiceButton(serviceType) {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        const buttonService = button.getAttribute('data-service');
        if (buttonService === serviceType) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
        } else {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Update form behavior based on service type
    updateFormForServiceType(serviceType);
}

/**
 * Reset service buttons to default
 */
function resetServiceButtons() {
    const serviceTypeInput = document.getElementById('serviceType');
    serviceTypeInput.value = 'general';
    setActiveServiceButton('general');
}

/**
 * Update form behavior based on service type
 */
function updateFormForServiceType(serviceType) {
    const messageField = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn .btn-text');
    
    if (!messageField || !submitBtn) return;
    
    const serviceConfigs = {
        emergency: {
            placeholder: 'Please describe the emergency in detail, including safety concerns, location access instructions, and immediate needs...',
            buttonText: 'Send Emergency Request',
            priority: 'high'
        },
        general: {
            placeholder: 'Please describe your inquiry or maintenance needs...',
            buttonText: 'Send Message',
            priority: 'normal'
        },
        quote: {
            placeholder: 'Please describe the work needed, preferred timeline, and any specific requirements...',
            buttonText: 'Request Quote',
            priority: 'normal'
        },
        maintenance: {
            placeholder: 'Please describe the maintenance needs, preferred schedule, and any specific concerns...',
            buttonText: 'Schedule Maintenance',
            priority: 'normal'
        }
    };
    
    const config = serviceConfigs[serviceType] || serviceConfigs.general;
    
    messageField.placeholder = config.placeholder;
    submitBtn.textContent = config.buttonText;
    
    // Add visual indicator for emergency
    if (serviceType === 'emergency') {
        messageField.parentElement.classList.add('emergency-field');
    } else {
        messageField.parentElement.classList.remove('emergency-field');
    }
}

/**
 * Initialize File Upload with Preview
 */
function initFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    if (!fileInput) return;
    
    const MAX_FILES = 5;
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    // Clear current files array
    currentFiles = [];
    
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(this.files);
        const errors = [];
        const validFiles = [];
        
        // Reset previous state
        clearFileErrors();
        
        // Check total file count
        const totalFiles = currentFiles.length + files.length;
        if (totalFiles > MAX_FILES) {
            errors.push(`Maximum ${MAX_FILES} files allowed. You have ${currentFiles.length} files already.`);
            this.value = '';
            return;
        }
        
        // Validate each file
        files.forEach((file, index) => {
            // Check file type
            if (!ALLOWED_TYPES.includes(file.type)) {
                errors.push(`${file.name}: Invalid file type. Allowed: JPG, PNG, GIF, PDF, DOC, DOCX`);
                return;
            }
            
            // Check file size
            if (file.size > MAX_SIZE) {
                errors.push(`${file.name}: File size exceeds 10MB`);
                return;
            }
            
            // Check for duplicates
            const isDuplicate = currentFiles.some(existingFile => 
                existingFile.name === file.name && existingFile.size === file.size
            );
            
            if (!isDuplicate) {
                validFiles.push(file);
            } else {
                errors.push(`${file.name}: File already added`);
            }
        });
        
        // Display errors
        if (errors.length > 0) {
            displayFileErrors(errors);
            this.value = '';
            return;
        }
        
        // Add valid files to currentFiles array
        validFiles.forEach(file => {
            currentFiles.push(file);
        });
        
        // Create previews
        if (validFiles.length > 0) {
            createFilePreviews(validFiles);
        }
        
        // Clear input value to allow selecting same file again
        this.value = '';
    });
    
    // Add drag and drop support
    const uploadArea = fileInput.parentElement;
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    });
}

/**
 * Clear file errors
 */
function clearFileErrors() {
    const errorContainer = document.querySelector('.file-errors');
    if (errorContainer) {
        errorContainer.remove();
    }
}

/**
 * Display file upload errors
 */
function displayFileErrors(errors) {
    clearFileErrors();
    
    const uploadArea = document.querySelector('.file-upload-area');
    const errorContainer = document.createElement('div');
    errorContainer.className = 'file-errors alert alert-danger mt-2';
    errorContainer.setAttribute('role', 'alert');
    
    errors.forEach(error => {
        const errorElement = document.createElement('div');
        errorElement.className = 'small mb-1';
        errorElement.textContent = error;
        errorContainer.appendChild(errorElement);
    });
    
    uploadArea.appendChild(errorContainer);
    
    // Announce error for screen readers
    announceError('File upload errors: ' + errors.join(', '));
}

/**
 * Create file previews
 */
function createFilePreviews(files) {
    const previewContainer = document.querySelector('.file-previews') || createPreviewContainer();
    
    files.forEach(file => {
        const preview = createFilePreview(file);
        previewContainer.appendChild(preview);
    });
}

/**
 * Create preview container
 */
function createPreviewContainer() {
    const uploadArea = document.querySelector('.file-upload-area');
    const previewContainer = document.createElement('div');
    previewContainer.className = 'file-previews mt-3';
    uploadArea.appendChild(previewContainer);
    return previewContainer;
}

/**
 * Create individual file preview
 */
function createFilePreview(file) {
    const preview = document.createElement('div');
    preview.className = 'file-preview d-flex align-items-center mb-2 p-2 bg-light rounded';
    preview.setAttribute('data-file-name', file.name);
    preview.setAttribute('data-file-size', file.size);
    
    const icon = document.createElement('i');
    icon.className = getFileIcon(file.type);
    icon.style.fontSize = '1.5rem';
    icon.style.marginRight = '0.75rem';
    icon.style.color = '#6c757d';
    
    const info = document.createElement('div');
    info.className = 'file-info flex-grow-1';
    
    const name = document.createElement('div');
    name.className = 'file-name small fw-bold text-truncate';
    name.textContent = file.name;
    name.style.maxWidth = '200px';
    
    const size = document.createElement('div');
    size.className = 'file-size small text-muted';
    size.textContent = formatFileSize(file.size);
    
    info.appendChild(name);
    info.appendChild(size);
    
    const remove = document.createElement('button');
    remove.className = 'btn btn-sm btn-outline-danger ms-2';
    remove.innerHTML = '<i class="fas fa-times"></i>';
    remove.setAttribute('type', 'button');
    remove.setAttribute('aria-label', `Remove ${file.name}`);
    remove.addEventListener('click', function() {
        // Remove file from currentFiles array
        const fileName = preview.getAttribute('data-file-name');
        const fileSize = parseInt(preview.getAttribute('data-file-size'));
        
        currentFiles = currentFiles.filter(f => !(f.name === fileName && f.size === fileSize));
        
        // Remove preview
        preview.remove();
        
        // Announce removal
        announceMessage(`${fileName} removed`);
        
        // Update file count display if exists
        updateFileCount();
    });
    
    preview.appendChild(icon);
    preview.appendChild(info);
    preview.appendChild(remove);
    
    return preview;
}

/**
 * Clear all file previews
 */
function clearFilePreviews() {
    const previewContainer = document.querySelector('.file-previews');
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    currentFiles = [];
    updateFileCount();
}

/**
 * Update file count display
 */
function updateFileCount() {
    const fileCount = currentFiles.length;
    const hint = document.querySelector('.upload-hint span');
    if (hint) {
        hint.textContent = `You have ${fileCount} file${fileCount !== 1 ? 's' : ''} selected. Max 5 files, 10MB each.`;
    }
}

/**
 * Get icon class based on file type
 */
function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) {
        return 'fas fa-file-image';
    } else if (fileType === 'application/pdf') {
        return 'fas fa-file-pdf';
    } else if (fileType.includes('word')) {
        return 'fas fa-file-word';
    } else {
        return 'fas fa-file';
    }
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Initialize Map Fallback
 */
function initMapFallback() {
    const mapIframe = document.querySelector('.map-embed iframe');
    const mapFallback = document.querySelector('.map-fallback');
    
    if (!mapIframe || !mapFallback) return;
    
    // Check if map loads successfully
    mapIframe.addEventListener('load', function() {
        console.log('Map loaded successfully');
        mapFallback.style.display = 'none';
    });
    
    mapIframe.addEventListener('error', function() {
        console.log('Map failed to load, showing fallback');
        mapFallback.style.display = 'flex';
    });
    
    // Fallback for slow connections
    const mapLoadTimeout = setTimeout(() => {
        if (mapIframe.contentDocument === null || mapIframe.contentDocument.readyState !== 'complete') {
            mapFallback.style.display = 'flex';
        }
    }, 8000);
    
    // Clear timeout if map loads
    mapIframe.addEventListener('load', () => clearTimeout(mapLoadTimeout));
}

/**
 * Initialize FAQ Accordion Enhancements
 */
function initFAQAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        // Set initial ARIA state
        const isExpanded = button.classList.contains('collapsed') ? 'false' : 'true';
        button.setAttribute('aria-expanded', isExpanded);
        
        // Add keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateFAQ(e.key === 'ArrowDown' ? 1 : -1, this);
            }
        });
        
        // Add ARIA expanded state management
        button.addEventListener('click', function() {
            const wasExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !wasExpanded);
            
            // Track FAQ interaction
            const question = this.textContent.trim();
            trackFAQInteraction(question, !wasExpanded);
        });
    });
}

/**
 * Navigate FAQ with keyboard
 */
function navigateFAQ(direction, currentButton) {
    const buttons = Array.from(document.querySelectorAll('.accordion-button'));
    const currentIndex = buttons.indexOf(currentButton);
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < buttons.length) {
        buttons[nextIndex].focus();
        
        // Optionally expand the focused item
        if (buttons[nextIndex].getAttribute('aria-expanded') === 'false') {
            buttons[nextIndex].click();
        }
    }
}

/**
 * Initialize Form Validation Enhancement
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation errors as user types
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const feedback = this.parentElement.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.style.display = 'none';
                }
            }
        });
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    if (!field.hasAttribute('required')) return true;
    
    const value = field.value.trim();
    
    if (!value) {
        markFieldInvalid(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        markFieldInvalid(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && !isValidUAEPhoneNumber(value)) {
        markFieldInvalid(field, 'Please enter a valid UAE phone number (e.g., +971 50 123 4567)');
        return false;
    }
    
    markFieldValid(field);
    return true;
}

/**
 * Initialize Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add skip to form link
    addSkipToFormLink();
    
    // Enhance form labels
    enhanceFormLabels();
    
    // Add live regions for announcements
    addLiveRegions();
    
    // Improve focus management
    improveFocusManagement();
    
    // Add print styles
    addPrintStyles();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

/**
 * Add skip to form link
 */
function addSkipToFormLink() {
    // Check if link already exists
    if (document.querySelector('.skip-to-form')) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#contactForm';
    skipLink.className = 'skip-to-form sr-only';
    skipLink.textContent = 'Skip to contact form';
    
    skipLink.addEventListener('click', function(e) {
        const form = document.getElementById('contactForm');
        if (form) {
            e.preventDefault();
            form.setAttribute('tabindex', '-1');
            form.focus();
            setTimeout(() => {
                form.removeAttribute('tabindex');
            }, 1000);
        }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Enhance form labels for better accessibility
 */
function enhanceFormLabels() {
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        const inputId = label.getAttribute('for');
        if (inputId) {
            const input = document.getElementById(inputId);
            if (input && !input.getAttribute('aria-labelledby')) {
                label.id = label.id || `label-${inputId}`;
                input.setAttribute('aria-labelledby', label.id);
            }
        }
    });
}

/**
 * Add live regions for announcements
 */
function addLiveRegions() {
    // Add main announcement region if not exists
    if (!document.getElementById('announcement-region')) {
        const region = document.createElement('div');
        region.id = 'announcement-region';
        region.className = 'sr-only';
        region.setAttribute('aria-live', 'polite');
        region.setAttribute('aria-atomic', 'true');
        document.body.appendChild(region);
    }
    
    // Add alert region if not exists
    if (!document.getElementById('alert-region')) {
        const alertRegion = document.createElement('div');
        alertRegion.id = 'alert-region';
        alertRegion.className = 'sr-only';
        alertRegion.setAttribute('aria-live', 'assertive');
        alertRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(alertRegion);
    }
}

/**
 * Improve focus management
 */
function improveFocusManagement() {
    // Add focus styles
    addFocusStyles();
    
    // Handle focus trapping for modals (if added later)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            handleTabNavigation(e);
        }
    });
}

/**
 * Handle tab navigation for accessibility
 */
function handleTabNavigation(e) {
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
    }
}

/**
 * Add focus styles
 */
function addFocusStyles() {
    // Check if styles already added
    if (document.querySelector('#focus-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'focus-styles';
    style.textContent = `
        :focus-visible {
            outline: 3px solid var(--secondary-color) !important;
            outline-offset: 2px !important;
        }
        
        .service-btn:focus-visible,
        .submit-btn:focus-visible,
        .emergency-btn:focus-visible {
            position: relative;
            z-index: 1000;
        }
        
        /* Fallback for browsers without :focus-visible */
        .js-focus-visible :focus:not(.focus-visible) {
            outline: none;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Add keyboard shortcuts
 */
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + / to focus search (if exists) or form
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.querySelector('input, textarea, select')?.focus();
            }
        }
        
        // Escape to close any open modals or clear form
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                const closeBtn = activeModal.querySelector('[data-bs-dismiss="modal"]');
                closeBtn?.click();
            }
        }
    });
}

/**
 * Add print styles
 */
function addPrintStyles() {
    // Check if styles already added
    if (document.querySelector('#print-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.media = 'print';
    style.textContent = `
        .contact-hero,
        .hero-shapes,
        .emergency-alert,
        .image-overlay,
        .cta-background,
        .pattern-dots,
        .map-embed iframe,
        .btn,
        .service-btn,
        .whatsapp-btn {
            display: none !important;
        }
        
        .hero-title,
        .section-title,
        .form-title,
        .map-title,
        .areas-title,
        .promise-title,
        .cta-title {
            color: #000 !important;
        }
        
        .option-card,
        .form-container,
        .map-wrapper,
        .service-areas,
        .promise-card {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid;
        }
        
        a[href^="tel:"],
        a[href^="mailto:"],
        a[href^="https://"] {
            text-decoration: underline;
            color: #000 !important;
        }
        
        a[href^="tel:"]::after,
        a[href^="mailto:"]::after {
            content: " (" attr(href) ")";
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .file-previews {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Analytics Tracking
 */
function initAnalyticsTracking() {
    // Track page view
    trackPageView();
    
    // Track emergency button clicks
    trackEmergencyClicks();
    
    // Track contact option interactions
    trackContactOptions();
    
    // Track form interactions
    trackFormInteractions();
    
    // Track external link clicks
    trackExternalLinks();
}

/**
 * Track page view
 */
function trackPageView() {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Contact Us - Methaq Almajara Technical Service',
            page_location: window.location.href,
            page_path: '/contact.html'
        });
    }
    
    // Log to console for debugging
    console.log('Contact page loaded:', {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    });
}

/**
 * Track emergency button clicks
 */
function trackEmergencyClicks() {
    const emergencyButtons = document.querySelectorAll('.emergency-btn, a[href*="tel:+971501234567"]');
    
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Implement your analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'emergency_call', {
                    event_category: 'Contact',
                    event_label: 'Emergency Call Button',
                    value: 1
                });
            }
            
            console.log('Emergency call initiated:', {
                buttonText: this.textContent.trim(),
                href: this.href,
                timestamp: new Date().toISOString()
            });
        });
    });
}

/**
 * Track contact option interactions
 */
function trackContactOptions() {
    const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href^="https://wa.me/"], a[href^="https://wa.me/"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const type = this.href.startsWith('tel:') ? 'phone' : 
                        this.href.startsWith('mailto:') ? 'email' : 'whatsapp';
            
            // Implement your analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_option_click', {
                    event_category: 'Contact',
                    event_label: type.toUpperCase(),
                    method: type,
                    value: 1
                });
            }
            
            console.log(`Contact ${type} clicked:`, {
                href: this.href,
                type: type,
                timestamp: new Date().toISOString()
            });
        });
    });
}

/**
 * Track form interactions
 */
function trackFormInteractions() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Track form focus
    const formInputs = form.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            trackFormFieldFocus(this.name, this.type);
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                trackFormFieldCompletion(this.name, this.type);
            }
        });
    });
    
    // Track form abandonment warning
    let formStarted = false;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!formStarted) {
                formStarted = true;
                window.addEventListener('beforeunload', warnOnFormAbandonment);
                trackFormStart();
            }
        });
    });
    
    // Clean up beforeunload listener on submit
    form.addEventListener('submit', function() {
        window.removeEventListener('beforeunload', warnOnFormAbandonment);
    });
}

/**
 * Track external link clicks
 */
function trackExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Implement your analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    event_category: 'Outbound',
                    event_label: this.href,
                    transport_type: 'beacon'
                });
            }
            
            console.log('External link clicked:', {
                href: this.href,
                text: this.textContent.trim(),
                timestamp: new Date().toISOString()
            });
        });
    });
}

/**
 * Track form field focus
 */
function trackFormFieldFocus(fieldName, fieldType) {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_field_focus', {
            event_category: 'Form',
            event_label: fieldName,
            field_type: fieldType
        });
    }
}

/**
 * Track form field completion
 */
function trackFormFieldCompletion(fieldName, fieldType) {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_field_completion', {
            event_category: 'Form',
            event_label: fieldName,
            field_type: fieldType
        });
    }
}

/**
 * Track form start
 */
function trackFormStart() {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_start', {
            event_category: 'Form',
            event_label: 'Contact Form'
        });
    }
    
    console.log('Form interaction started');
}

/**
 * Track service selection
 */
function trackServiceSelection(serviceType) {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'service_selection', {
            event_category: 'Form',
            event_label: serviceType,
            value: 1
        });
    }
    
    console.log('Service selected:', {
        service: serviceType,
        timestamp: new Date().toISOString()
    });
}

/**
 * Track form submission
 */
function trackFormSubmission(status, serviceType) {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            event_category: 'Form',
            event_label: status,
            service_type: serviceType,
            value: status === 'success' ? 1 : 0
        });
    }
    
    console.log('Form submission tracked:', {
        status: status,
        serviceType: serviceType,
        timestamp: new Date().toISOString()
    });
}

/**
 * Track FAQ interaction
 */
function trackFAQInteraction(question, isExpanded) {
    // Implement your analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_interaction', {
            event_category: 'FAQ',
            event_label: question.substring(0, 100), // Limit length
            action: isExpanded ? 'expand' : 'collapse',
            value: isExpanded ? 1 : 0
        });
    }
    
    console.log('FAQ interaction:', {
        question: question.substring(0, 100),
        action: isExpanded ? 'expanded' : 'collapsed',
        timestamp: new Date().toISOString()
    });
}

/**
 * Warn user if they try to leave with unsaved form
 */
function warnOnFormAbandonment(e) {
    // Standard for most browsers
    e.preventDefault();
    e.returnValue = 'You have unsaved changes in the contact form. Are you sure you want to leave?';
    
    // For older browsers
    return e.returnValue;
}

/**
 * Utility Functions
 */

function setLoadingState(isLoading, button, buttonText, spinner) {
    if (isLoading) {
        button.disabled = true;
        buttonText.classList.add('d-none');
        spinner.classList.remove('d-none');
        button.setAttribute('aria-busy', 'true');
        
        // Update button text for screen readers
        button.setAttribute('aria-label', 'Submitting form, please wait...');
    } else {
        button.disabled = false;
        buttonText.classList.remove('d-none');
        spinner.classList.add('d-none');
        button.setAttribute('aria-busy', 'false');
        
        // Reset button text for screen readers
        button.setAttribute('aria-label', 'Submit form');
    }
}

function hideMessages() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (successMessage) {
        successMessage.classList.add('d-none');
    }
    
    if (errorMessage) {
        errorMessage.classList.add('d-none');
    }
}

/**
 * Initialize page on load
 */
function initPage() {
    // Set current year in footer if exists
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add loading class to body for initial animation
    document.body.classList.add('page-loaded');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('page-loaded');
            document.body.classList.add('page-ready');
        }, 500);
    });
}

// Initialize page
initPage();

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidUAEPhoneNumber,
        formatUAEPhoneNumber,
        formatFileSize,
        validateForm
    };
}