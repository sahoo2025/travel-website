// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
if (totalTestimonials > 0) {
    showTestimonial(0);
    setInterval(nextTestimonial, 5000);
}

// Destination Filter Function
function filterDestinations() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        const cardPrice = card.getAttribute('data-price');
        
        let matchesSearch = cardText.includes(searchInput);
        let matchesCategory = !categoryFilter || cardCategory === categoryFilter;
        let matchesPrice = !priceFilter || cardPrice === priceFilter;
        
        if (matchesSearch && matchesCategory && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Real-time search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', filterDestinations);
}

// Form Validation
function validateForm(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate Name
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Subject
    const subject = document.getElementById('subject').value;
    if (!subject) {
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    }
    
    // Validate Message
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Log form data (in real application, this would be sent to server)
        console.log('Form submitted successfully:', {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            destination: document.getElementById('destination').value,
            travelDate: document.getElementById('travel-date').value,
            message: message
        });
    }
    
    return false;
}

// Close Success Message
function closeSuccessMessage() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Package Booking Function
function bookPackage(packageName) {
    // In a real application, this would redirect to a booking page or open a modal
    const message = `Thank you for your interest in "${packageName}"! Our team will contact you shortly to complete your booking.`;
    
    // Create a simple alert (in real app, this would be a modal)
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        max-width: 400px;
    `;
    
    modal.innerHTML = `
        <h3 style="color: #28a745; margin-bottom: 1rem;">🎉 Booking Initiated!</h3>
        <p>${message}</p>
        <button class="cta-button" onclick="this.parentElement.remove(); document.getElementById('overlay').remove();" style="margin-top: 1rem;">OK</button>
    `;
    
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
    `;
    overlay.onclick = function() {
        modal.remove();
        overlay.remove();
    };
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    console.log(`Package booking initiated: ${packageName}`);
}

// Scroll to Top Button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #007bff;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        z-index: 999;
        display: none;
        transition: all 0.3s;
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
createScrollToTopButton();

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Image Gallery Enhancement (for future use)
function createImageGallery(images) {
    // This function can be used to create an image gallery
    // Implementation would depend on specific requirements
    console.log('Image gallery function ready for implementation');
}

// Newsletter Subscription (placeholder)
function subscribeNewsletter(email) {
    // This function would handle newsletter subscription
    console.log('Newsletter subscription:', email);
}

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
});

// Loading Animation (for future use)
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="border: 5px solid #f3f3f3; border-top: 5px solid #007bff; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <p style="margin-top: 1rem; color: #333;">Loading...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    return loader;
}

// Add CSS animation for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Responsive Navigation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.getElementById('menuToggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when a link is clicked
            if (window.innerWidth <= 768) {
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !document.getElementById('navLinks').contains(event.target)) {
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// Form Input Enhancements
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#007bff';
            this.style.boxShadow = '0 0 0 2px rgba(0,123,255,0.25)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
        
        // Remove error message on input
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
});

// Performance Optimization: Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

console.log('Wanderlust Travels JavaScript loaded successfully!');
