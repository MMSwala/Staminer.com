/**
 * Jazbati DD 69 - Optimized JavaScript
 * Mobile-first, performance-oriented, SEO-friendly
 * Version: 2.0 (Production Ready)
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jazbati DD 69 - Optimized Website Loaded');
    
    // Initialize all modules
    initializeModules();
    
    // Start performance monitoring
    monitorPerformance();
});

/**
 * Main Initialization Function
 */
function initializeModules() {
    try {
        // Core functionality
        initStickyHeader();
        initCountdownTimers();
        initSmoothScroll();
        initFormValidation();
        initFixedOrderBar();
        initImageLazyLoading();
        initButtonAnimations();
        initScrollAnimations();
        
        // Accessibility improvements
        initAccessibility();
        
        // Performance optimizations
        initPerformanceOptimizations();
        
        console.log('All modules initialized successfully');
    } catch (error) {
        console.error('Error initializing modules:', error);
        // Graceful degradation - ensure basic functionality works
        ensureBasicFunctionality();
    }
}

/**
 * Sticky Header with Intersection Observer
 */
function initStickyHeader() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    // Set initial padding to prevent content jump
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
        ([entry]) => {
            header.classList.toggle('sticky', !entry.isIntersecting);
        },
        {
            rootMargin: `-${headerHeight}px 0px 0px 0px`,
            threshold: 0
        }
    );
    
    // Observe a sentinel element at the top of the page
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    document.body.prepend(sentinel);
    observer.observe(sentinel);
}

/**
 * Countdown Timer (24-hour rolling)
 */
function initCountdownTimers() {
    const countdownElements = [
        { days: 'countdownDays', hours: 'countdownHours', minutes: 'countdownMinutes', seconds: 'countdownSeconds' },
        { timer: 'fixedTimer' }
    ];
    
    // Set countdown to 24 hours from now
    let countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 24);
    
    function updateTimers() {
        const now = new Date().getTime();
        let distance = countDownDate - now;
        
        // Reset if countdown is finished
        if (distance < 0) {
            countDownDate.setHours(countDownDate.getHours() + 24);
            distance = countDownDate - now;
        }
        
        // Calculate time units
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update main countdown
        const daysEl = document.getElementById('countdownDays');
        const hoursEl = document.getElementById('countdownHours');
        const minutesEl = document.getElementById('countdownMinutes');
        const secondsEl = document.getElementById('countdownSeconds');
        
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // Update fixed timer
        const fixedTimer = document.getElementById('fixedTimer');
        if (fixedTimer) {
            fixedTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    // Initial update
    updateTimers();
    
    // Update every second
    const timerInterval = setInterval(updateTimers, 1000);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => clearInterval(timerInterval));
}

/**
 * Smooth Scroll with RequestAnimationFrame
 */
function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;
        
        smoothScrollTo(targetElement);
    });
    
    function smoothScrollTo(element) {
        const headerHeight = document.querySelector('.main-header').offsetHeight || 76;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - headerHeight;
        const duration = 800;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Add focus for accessibility
                element.setAttribute('tabindex', '-1');
                element.focus({ preventScroll: true });
                
                // Highlight the target
                element.classList.add('scroll-highlight');
                setTimeout(() => element.classList.remove('scroll-highlight'), 2000);
            }
        }
        
        requestAnimationFrame(animation);
    }
}

/**
 * Form Validation with Progressive Enhancement
 */
function initFormValidation() {
    const orderForm = document.getElementById('orderFormElement');
    if (!orderForm) return;
    
    // Validation patterns
    const patterns = {
        name: /^[A-Za-z\u0900-\u097F\s]{2,100}$/,
        mobile: /^[0-9]{10}$/,
        address: /^[\s\S]{10,500}$/,
        pincode: /^[0-9]{6}$/
    };
    
    // Error messages
    const messages = {
        name: 'कृपया वैध नाम दर्ज करें (2-100 वर्ण, केवल अक्षर और रिक्त स्थान)',
        mobile: 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें',
        address: 'कृपया वैध पता दर्ज करें (10-500 वर्ण)',
        pincode: 'कृपया वैध 6-अंकीय पिनकोड दर्ज करें'
    };
    
    // Validate individual field
    function validateField(field, pattern, message) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        
        if (!value) {
            showError(field, 'यह फ़ील्ड आवश्यक है', errorElement);
            return false;
        }
        
        if (!pattern.test(value)) {
            showError(field, message, errorElement);
            return false;
        }
        
        clearError(field, errorElement);
        return true;
    }
    
    // Show error
    function showError(field, message, errorElement) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    // Clear error
    function clearError(field, errorElement) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    // Real-time validation
    orderForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            const fieldName = this.name;
            if (patterns[fieldName]) {
                validateField(this, patterns[fieldName], messages[fieldName]);
            }
        });
        
        field.addEventListener('input', function() {
            const fieldName = this.name;
            const errorElement = document.getElementById(this.id + 'Error');
            clearError(this, errorElement);
        });
    });
    
    // // Form submission
    // orderForm.addEventListener('submit', async function(e) {
    //     e.preventDefault();
        
    //     // Validate all fields
    //     let isValid = true;
    //     const formData = new FormData(orderForm);
        
    //     for (const [name, value] of formData.entries()) {
    //         if (name === '_token') continue;
            
    //         const field = orderForm.querySelector(`[name="${name}"]`);
    //         if (field && patterns[name]) {
    //             if (!validateField(field, patterns[name], messages[name])) {
    //                 isValid = false;
    //             }
    //         }
    //     }
        
    //     if (!isValid) {
    //         showFormResponse('कृपया फॉर्म में त्रुटियाँ ठीक करें', 'error');
    //         return;
    //     }
        
    //     // Submit form
    //     const submitButton = document.getElementById('submitOrder');
    //     const originalText = submitButton.innerHTML;
        
    //     // Show loading state
    //     submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> प्रोसेसिंग...';
    //     submitButton.disabled = true;
        
    //     try {
    //         // Simulate API call (replace with actual API)
    //         const response = await submitForm(formData);
            
    //         // Show success message
    //         showFormResponse('🎉 ऑर्डर सफलतापूर्वक प्लेस किया गया! हमारा विशेषज्ञ आपसे शीघ्र संपर्क करेगा।', 'success');
            
    //         // Reset form
    //         orderForm.reset();
            
    //         // Track conversion
    //         trackConversion();
            
    //     } catch (error) {
    //         // Show error message
    //         showFormResponse(`❌ त्रुटि: ${error.message}. कृपया पुनः प्रयास करें या सीधे कॉल करें।`, 'error');
    //     } finally {
    //         // Reset button
    //         submitButton.innerHTML = originalText;
    //         submitButton.disabled = false;
    //     }
    // });
    
    // // Simulate form submission
    // async function submitForm(formData) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             // Simulate 95% success rate
    //             if (Math.random() < 0.95) {
    //                 resolve({
    //                     success: true,
    //                     message: 'Order submitted successfully'
    //                 });
    //             } else {
    //                 reject(new Error('Network error. Please try again.'));
    //             }
    //         }, 1500);
    //     });
    // }
    

    // Mustang Order Form - Google Apps Script Integration
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const CONFIG = {
        // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
        GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbx9nrQaxpr7JAiPK31bzHv9V7JGP1cYQMHmQv-QZksDyxKP3w9sQScNb2RPCoTm69W_/exec',
        SUBMIT_TIMEOUT: 30000, // 30 seconds
        COUNTDOWN_DURATION: 5 * 60 * 60 * 1000 // 5 hours in milliseconds
    };

    // DOM Elements
    const orderForm = document.getElementById('orderFormElement');
    const formResponse = document.getElementById('formResponse');
    const submitButton = document.getElementById('submitOrder');
    const originalButtonText = submitButton.innerHTML;
    
    // Countdown Elements
    const countdownDays = document.getElementById('countdownDays');
    const countdownHours = document.getElementById('countdownHours');
    const countdownMinutes = document.getElementById('countdownMinutes');
    const countdownSeconds = document.getElementById('countdownSeconds');
    const fixedTimer = document.getElementById('fixedTimer');

    // Initialize the application
    function init() {
        setupCountdownTimer();
        setupFormValidation();
        setupSmoothScrolling();
        setupFixedOrderBar();
    }

    // Countdown Timer
    function setupCountdownTimer() {
        let endTime = localStorage.getItem('mustangCountdownEnd');
        
        if (!endTime) {
            endTime = Date.now() + CONFIG.COUNTDOWN_DURATION;
            localStorage.setItem('mustangCountdownEnd', endTime);
        } else {
            endTime = parseInt(endTime);
        }

        function updateCountdown() {
            const now = Date.now();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                resetCountdown();
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Update main countdown
            if (countdownDays) countdownDays.textContent = days.toString().padStart(2, '0');
            if (countdownHours) countdownHours.textContent = hours.toString().padStart(2, '0');
            if (countdownMinutes) countdownMinutes.textContent = minutes.toString().padStart(2, '0');
            if (countdownSeconds) countdownSeconds.textContent = seconds.toString().padStart(2, '0');

            // Update fixed timer
            if (fixedTimer) {
                fixedTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }

        function resetCountdown() {
            endTime = Date.now() + CONFIG.COUNTDOWN_DURATION;
            localStorage.setItem('mustangCountdownEnd', endTime);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Form Validation
    function setupFormValidation() {
        if (!orderForm) return;

        // Real-time validation
        const nameInput = document.getElementById('customerName');
        const phoneInput = document.getElementById('customerPhone');
        const addressInput = document.getElementById('customerAddress');
        const pincodeInput = document.getElementById('customerPincode');

        if (nameInput) {
            nameInput.addEventListener('blur', validateName);
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                this.value = this.value.replace(/\D/g, '').slice(0, 10);
                validatePhone();
            });
        }

        if (pincodeInput) {
            pincodeInput.addEventListener('input', function(e) {
                this.value = this.value.replace(/\D/g, '').slice(0, 6);
                validatePincode();
            });
        }

        if (addressInput) {
            addressInput.addEventListener('blur', validateAddress);
        }

        // Form submission
        orderForm.addEventListener('submit', handleFormSubmit);
    }

    // Validation Functions
    function validateName() {
        const nameInput = document.getElementById('customerName');
        const errorElement = document.getElementById('nameError');
        const name = nameInput.value.trim();
        
        if (name.length < 2) {
            showError(nameInput, errorElement, 'Please enter a valid name (minimum 2 characters)');
            return false;
        }
        
        clearError(nameInput, errorElement);
        return true;
    }

    function validatePhone() {
        const phoneInput = document.getElementById('customerPhone');
        const errorElement = document.getElementById('phoneError');
        const phone = phoneInput.value.trim();
        const phoneRegex = /^[0-9]{10}$/;
        
        if (!phoneRegex.test(phone)) {
            showError(phoneInput, errorElement, 'Please enter a valid 10-digit mobile number');
            return false;
        }
        
        clearError(phoneInput, errorElement);
        return true;
    }

    function validateAddress() {
        const addressInput = document.getElementById('customerAddress');
        const errorElement = document.getElementById('addressError');
        const address = addressInput.value.trim();
        
        if (address.length < 10) {
            showError(addressInput, errorElement, 'Please enter a complete address (minimum 10 characters)');
            return false;
        }
        
        clearError(addressInput, errorElement);
        return true;
    }

    function validatePincode() {
        const pincodeInput = document.getElementById('customerPincode');
        const errorElement = document.getElementById('pincodeError');
        const pincode = pincodeInput.value.trim();
        const pincodeRegex = /^[0-9]{6}$/;
        
        if (!pincodeRegex.test(pincode)) {
            showError(pincodeInput, errorElement, 'Please enter a valid 6-digit pincode');
            return false;
        }
        
        clearError(pincodeInput, errorElement);
        return true;
    }

    // Error Handling
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('is-invalid');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(inputElement, errorElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Form Submission Handler
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isAddressValid = validateAddress();
        const isPincodeValid = validatePincode();
        
        if (!isNameValid || !isPhoneValid || !isAddressValid || !isPincodeValid) {
            showResponse('error', 'Please correct the errors in the form.');
            return;
        }
        
        // Prepare form data
        const formData = {
            name: document.getElementById('customerName').value.trim(),
            mobile: document.getElementById('customerPhone').value.trim(),
            address: document.getElementById('customerAddress').value.trim(),
            pincode: document.getElementById('customerPincode').value.trim(),
            timestamp: new Date().toISOString(),
            source: 'Mustang Website'
        };
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Processing...';
        
        try {
            // Send to Google Apps Script
            const response = await submitToGoogleScript(formData);
            
            if (response.success) {
                showResponse('success', 'Thank you! Your order has been submitted successfully. Our team will contact you shortly.');
                orderForm.reset();
                
                // Reset validation styles
                const inputs = orderForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                
                // Track submission
                trackSubmission(formData);
            } else {
                throw new Error(response.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showResponse('error', 'Sorry, there was an error submitting your order. Please try again or contact support.');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }

    // // Submit to Google Apps Script
    // async function submitToGoogleScript(data) {
    //     const controller = new AbortController();
    //     const timeoutId = setTimeout(() => controller.abort(), CONFIG.SUBMIT_TIMEOUT);
        
    //     try {
    //         const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    //             method: 'POST',
    //             mode: 'no-cors', // Important for Google Apps Script
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //             signal: controller.signal
    //         });
            
    //         clearTimeout(timeoutId);
            
    //         // Note: With 'no-cors' mode, we can't read the response
    //         // Google Apps Script will handle the submission
    //         return { success: true, message: 'Submission sent successfully' };
            
    //     } catch (error) {
    //         clearTimeout(timeoutId);
            
    //         if (error.name === 'AbortError') {
    //             throw new Error('Request timed out. Please check your connection and try again.');
    //         }
            
    //         throw error;
    //     }
    // }

    // Response Display
    // function showResponse(type, message) {
    //     if (!formResponse) return;
        
    //     formResponse.className = `form-response alert alert-${type === 'success' ? 'success' : 'danger'}`;
    //     formResponse.innerHTML = `
    //         <div class="d-flex align-items-center">
    //             <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-3 fs-4"></i>
    //             <div>${message}</div>
    //         </div>
    //     `;
    //     formResponse.style.display = 'block';
        
    //     // Auto-hide after 10 seconds for success messages
    //     if (type === 'success') {
    //         setTimeout(() => {
    //             formResponse.style.display = 'none';
    //         }, 10000);
    //     }
        
    //     // Scroll to response
    //     formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // }

    // // Track Submission (optional analytics)
    // function trackSubmission(data) {
    //     // You can add analytics tracking here if needed
    //     console.log('Order submitted:', {
    //         name: data.name,
    //         phone: data.mobile,
    //         time: new Date().toLocaleString('hi-IN')
    //     });
        
    //     // Example: Send to Google Analytics (if you have it)
    //     if (typeof gtag !== 'undefined') {
    //         gtag('event', 'order_submitted', {
    //             'event_category': 'Mustang Orders',
    //             'event_label': 'Website Form'
    //         });
    //     }
    // }

    // Smooth Scrolling for Order Buttons
    function setupSmoothScrolling() {
        document.querySelectorAll('[data-scroll="orderForm"]').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById('orderForm');
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Focus on first input for better UX
                    setTimeout(() => {
                        const firstInput = document.getElementById('customerName');
                        if (firstInput) firstInput.focus();
                    }, 500);
                }
            });
        });
    }

    // Fixed Order Bar
    function setupFixedOrderBar() {
        const fixedBar = document.getElementById('fixedOrderBar');
        if (!fixedBar) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                fixedBar.classList.add('visible');
            } else {
                fixedBar.classList.remove('visible');
            }
        });
        
        // Add CSS for fixed bar
        const style = document.createElement('style');
        style.textContent = `
            .fixed-order-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                transform: translateY(100%);
                transition: transform 0.3s ease;
                z-index: 9999;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            }
            .fixed-order-bar.visible {
                transform: translateY(0);
            }
            .fixed-bottom-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9998;
                display: none;
            }
            @media (max-width: 768px) {
                .fixed-bottom-button {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize the application
    init();
});
    // Show form response
    function showFormResponse(message, type) {
        const responseElement = document.getElementById('formResponse');
        if (!responseElement) return;
        
        responseElement.textContent = message;
        responseElement.className = `form-response ${type}`;
        responseElement.setAttribute('role', 'alert');
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            responseElement.className = 'form-response';
            responseElement.textContent = '';
        }, 10000);
    }
    
    // Track conversion (analytics)
    function trackConversion() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXX/YYYY',
                'value': 2450.00,
                'currency': 'INR'
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Purchase', { value: 2450.00, currency: 'INR' });
        }
    }
}

/**
 * Fixed Order Bar with Throttling
 */
function initFixedOrderBar() {
    const fixedBar = document.getElementById('fixedOrderBar');
    const fixedBottomButton = document.querySelector('.fixed-bottom-button');
    
    if (!fixedBar) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateFixedBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show/hide based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            fixedBar.classList.remove('visible');
        } else if (scrollTop < lastScrollTop) {
            fixedBar.classList.add('visible');
        }
        
        lastScrollTop = scrollTop;
        
        // Update fixed button visibility near bottom
        if (fixedBottomButton) {
            const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
            if (distanceFromBottom < 100) {
                fixedBottomButton.style.opacity = '0.3';
                fixedBottomButton.style.pointerEvents = 'none';
            } else {
                fixedBottomButton.style.opacity = '1';
                fixedBottomButton.style.pointerEvents = 'auto';
            }
        }
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateFixedBar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Show bar after 1 second
    setTimeout(() => fixedBar.classList.add('visible'), 1000);
}

/**
 * Image Lazy Loading with Intersection Observer
 */
function initImageLazyLoading() {
    // Skip if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
        loadAllImages();
        return;
    }
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    function loadImage(img) {
        // Check if image is already loaded
        if (img.complete) {
            img.classList.add('loaded');
            return;
        }
        
        // Load image with error handling
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            this.classList.add('loaded');
        });
    }
    
    function loadAllImages() {
        lazyImages.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            } else {
                img.classList.add('loaded');
            }
        });
    }
}

/**
 * Button Animations with Ripple Effect
 */
function initButtonAnimations() {
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.cta-button, .order-button, .discount-button, .submit-button');
        if (!button) return;
        
        createRippleEffect(e, button);
    });
    
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple animation CSS if not already present
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    // Skip if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('animate-fade-in');
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Animate child elements with delay
                const cards = entry.target.querySelectorAll('.benefit-card, .masculinity-card, .ingredient-card, .pleasure-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-fade-in');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Accessibility Improvements
 */
function initAccessibility() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const label = targetElement.getAttribute('aria-label') || targetElement.textContent.trim().slice(0, 50);
            link.setAttribute('aria-label', `Go to ${label}`);
        }
    });
    
    // Improve form accessibility
    const form = document.querySelector('form');
    if (form) {
        form.querySelectorAll('input, textarea, select').forEach((field, index) => {
            if (!field.id) {
                field.id = `field-${index}-${Date.now()}`;
            }
            
            const label = form.querySelector(`label[for="${field.id}"]`);
            if (!label && !field.getAttribute('aria-label')) {
                field.setAttribute('aria-label', field.getAttribute('placeholder') || 'Form field');
            }
        });
    }
    
    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Close modals on Escape
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
        
        // Improve tab navigation
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-navigation');
    });
}

/**
 * Performance Optimizations
 */
function initPerformanceOptimizations() {
    // Defer non-critical images
    const nonCriticalImages = document.querySelectorAll('img[data-defer]');
    nonCriticalImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Prevent layout shifts
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            img.setAttribute('width', '800');
            img.setAttribute('height', '600');
        }
    });
    
    // Optimize animations for performance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.classList.add('reduced-motion');
    }
}

/**
 * Performance Monitoring
 */
function monitorPerformance() {
    // Log performance metrics
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const timing = performance.getEntriesByType('navigation')[0];
                if (timing) {
                    const loadTime = timing.loadEventEnd - timing.fetchStart;
                    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
                    
                    // Send to analytics if available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'timing_complete', {
                            'name': 'page_load',
                            'value': Math.round(loadTime),
                            'event_category': 'Performance'
                        });
                    }
                }
            }, 0);
        });
    }
    
    // Monitor memory usage
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
                console.warn('High memory usage detected');
            }
        }, 30000);
    }
}

/**
 * Ensure Basic Functionality (Fallback)
 */
function ensureBasicFunctionality() {
    // Ensure form submission works
    const form = document.getElementById('orderFormElement');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Order submitted! We will contact you shortly.');
            this.reset();
        });
    }
    
    // Ensure smooth scroll works
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    
    // Send to error tracking service (example)
    // if (typeof errorTracking !== 'undefined') {
    //     errorTracking.track(e.error);
    // }
    
    // Prevent breaking the page
    return true;
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

/**
 * Offline Support
 */
window.addEventListener('online', function() {
    showToast('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showToast('You are offline. Some features may not work.', 'warning');
});

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        background: type === 'success' ? '#4CAF50' : 
                   type === 'warning' ? '#FF9800' : 
                   type === 'error' ? '#F44336' : '#2196F3',
        color: 'white',
        borderRadius: '4px',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease, fadeOut 0.3s ease 2.7s',
        animationFillMode: 'forwards'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Add toast animation styles
if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for debugging (optional)
if (process.env.NODE_ENV === 'development') {
    window.JazbatiApp = {
        initializeModules,
        initFormValidation,
        initCountdownTimers,
        showToast
    };
}

console.log('Jazbati DD 69 JavaScript initialized successfully');