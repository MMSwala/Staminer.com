 // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
                
                // Toggle icon
                const icon = question.querySelector('span:last-child');
                icon.textContent = item.classList.contains('active') ? '−' : '+';
            });
        });
        
        // Lead Form Submission
        const leadForm = document.getElementById('leadForm');
        const thankYouMessage = document.getElementById('thankYouMessage');
        
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const city = document.getElementById('city').value;
            const product = document.getElementById('product').value;
            
            // Create WhatsApp message
            const message = `नमस्ते, मैं ${name} हूं। मोबाइल: ${mobile}, शहर: ${city}। मुझे ${product} के बारे में जानकारी चाहिए।`;
            const encodedMessage = encodeURIComponent(message);
            
            // Hide form, show thank you message
            leadForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // Redirect to WhatsApp after 2 seconds
            setTimeout(() => {
                window.open(`https://wa.me/919718587814?text=${encodedMessage}`, '_blank');
            }, 2000);
        });
        
        // Scroll Animation
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Initial check for elements in view
        window.addEventListener('load', animateOnScroll);
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    mobileMenu.classList.remove('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Lazy loading simulation (for images if added later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Add WhatsApp click tracking
        const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');
        whatsappButtons.forEach(button => {
            button.addEventListener('click', () => {
                // You can add analytics tracking here
                console.log('WhatsApp button clicked');
            });
        });

        