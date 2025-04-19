// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Animate milestone numbers
function animateNumbers() {
    const milestones = document.querySelectorAll('.number');
    const speed = 200;
    
    milestones.forEach(milestone => {
        const target = +milestone.getAttribute('data-count');
        const count = +milestone.innerText;
        const increment = target / speed;
        
        if (count < target) {
            milestone.innerText = Math.ceil(count + increment);
            setTimeout(animateNumbers, 1);
        } else {
            milestone.innerText = target.toLocaleString();
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger number animation for milestones section
                if (entry.target.classList.contains('milestones')) {
                    animateNumbers();
                }
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });
    
    // Mobile menu toggle (same as main page)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});