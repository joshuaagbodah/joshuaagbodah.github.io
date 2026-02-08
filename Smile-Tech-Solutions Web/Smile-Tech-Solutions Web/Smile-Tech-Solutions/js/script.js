// ===================================
// SMILE TECH SOLUTIONS - JavaScript
// ===================================

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ===== Active Navigation Highlighting =====
function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '/' && currentPath.endsWith('/') ||
            link.getAttribute('href').includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

// ===== Intersection Observer for Fade-In Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all service cards, about sections, and content blocks
    document.querySelectorAll('.service-card, .about-content, .blog-card, .testimonial').forEach(element => {
        element.classList.add('fade-in-pending');
        observer.observe(element);
    });
}

// ===== Service Card Expansion =====
function initServiceCardInteraction() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add data attribute for tracking
        card.setAttribute('data-expanded', 'false');
        
        // Prevent default behavior and handle expansion
        card.addEventListener('mouseenter', function() {
            this.classList.add('expanded');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('expanded');
        });
        
        // Mobile: Toggle on click
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isExpanded = this.getAttribute('data-expanded') === 'true';
                
                if (isExpanded) {
                    this.classList.remove('expanded');
                    this.setAttribute('data-expanded', 'false');
                } else {
                    // Close other expanded cards
                    serviceCards.forEach(c => {
                        c.classList.remove('expanded');
                        c.setAttribute('data-expanded', 'false');
                    });
                    
                    this.classList.add('expanded');
                    this.setAttribute('data-expanded', 'true');
                }
            }
        });
    });
}

// ===== Form Validation =====
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Reset messages
            clearFormMessages();
            
            // Validation
            let isValid = true;
            const errors = [];
            
            if (!name) {
                errors.push('Name is required');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Valid email is required');
                isValid = false;
            }
            
            if (message.length < 10) {
                errors.push('Message must be at least 10 characters');
                isValid = false;
            }
            
            if (!isValid) {
                showFormError(errors.join(', '));
                return;
            }
            
            // If valid, show success message
            showFormSuccess('Thank you! Your message has been sent successfully. We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Send data to server (replace with your endpoint)
            // sendFormData({ name, email, phone, message });
        });
    }
}

// ===== Helper: Email Validation =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Helper: Show Form Error =====
function showFormError(message) {
    const messageDiv = document.getElementById('form-message') || createFormMessage();
    messageDiv.className = 'form-message error';
    messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    messageDiv.style.display = 'block';
}

// ===== Helper: Show Form Success =====
function showFormSuccess(message) {
    const messageDiv = document.getElementById('form-message') || createFormMessage();
    messageDiv.className = 'form-message success';
    messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
    messageDiv.style.display = 'block';
}

// ===== Helper: Clear Form Messages =====
function clearFormMessages() {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
}

// ===== Helper: Create Form Message Container =====
function createFormMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.id = 'form-message';
    messageDiv.style.display = 'none';
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
    }
    
    return messageDiv;
}

// ===== Smooth Scroll for Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (!scrollTopBtn) {
        const btn = document.createElement('button');
        btn.id = 'scroll-top-btn';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btn.className = 'scroll-top-btn';
        document.body.appendChild(btn);
    }
    
    const btn = document.getElementById('scroll-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Blog Filter (if applicable) =====
function initBlogFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            blogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('fade-in'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Initialize All Features on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    updateActiveNav();
    initScrollAnimations();
    initServiceCardInteraction();
    initFormValidation();
    initSmoothScroll();
    initScrollToTop();
    initBlogFilter();
    
    // Log to console for debugging
    console.log('Smile Tech Solutions - All features initialized!');
});

// ===== Update Active Nav on Page Change (SPA) =====
window.addEventListener('load', function() {
    updateActiveNav();
});
