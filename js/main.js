// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Stats Counter Animation
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    let animated = false;

    // Animate stats when in viewport
    function animateStats() {
        if (isInViewport(statsSection) && !animated) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            animated = true;
        }
    }

    // Counter animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toString().includes('+') ? 
                    Math.floor(target) + '+' : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Responsive navigation menu
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = '#333';
            nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            nav.style.backgroundColor = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            
            if (!validateEmail(email.value)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!validatePhone(phone.value)) {
                alert('Please enter a valid phone number');
                return;
            }

            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Email validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Phone validation
    function validatePhone(phone) {
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    // Initialize animations
    window.addEventListener('scroll', animateStats);
});

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation
        if (username && password) {
            // Simulate login (replace with actual authentication)
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Please enter both username and password');
        }
    });
}

// Maintenance request handling
const maintenanceForm = document.getElementById('maintenanceForm');
if (maintenanceForm) {
    maintenanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const request = {
            unit: document.getElementById('unitNumber').value,
            description: document.getElementById('description').value,
            date: new Date().toISOString(),
            status: 'pending'
        };

        // Store maintenance request
        let requests = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
        requests.push(request);
        localStorage.setItem('maintenanceRequests', JSON.stringify(requests));

        alert('Maintenance request submitted successfully!');
        maintenanceForm.reset();
    });
}