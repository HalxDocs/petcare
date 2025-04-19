// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.background = 'var(--white)';
    }
});

// Smooth Scrolling for Anchor Links
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

// // Mobile Menu Toggle
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');
// const navButtons = document.querySelector('.nav-buttons');

// hamburger.addEventListener('click', function() {
//     // Toggle mobile menu visibility
//     navLinks.classList.toggle('active');
//     navButtons.classList.toggle('active');
    
//     // Toggle hamburger icon between bars and X
//     this.querySelector('i').classList.toggle('fa-times');
//     this.querySelector('i').classList.toggle('fa-bars');
// });

// // Close mobile menu when clicking a link
// document.querySelectorAll('.nav-links a').forEach(link => {
//     link.addEventListener('click', function() {
//         if (window.innerWidth <= 768) {
//             navLinks.classList.remove('active');
//             navButtons.classList.remove('active');
//             hamburger.querySelector('i').classList.add('fa-bars');
//             hamburger.querySelector('i').classList.remove('fa-times');
//         }
//     });
// });

// Mobile Menu Toggle with X icon
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', function() {
    // Toggle mobile menu visibility
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
    
    // Toggle hamburger icon between bars and X
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        icon.style.transform = 'rotate(0)';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navButtons.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            icon.style.transform = 'rotate(0)';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger') &&
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        icon.style.transform = 'rotate(0)';
    }
});

// Product Card Animation on Scroll
const productCards = document.querySelectorAll('.product-card');

const animateOnScroll = function() {
    productCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
// Animate product cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    // Stagger animation for product cards
    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        
        // Create intersection observer for each card
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });

    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.querySelector('.search-input');
    
    function filterProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        productCards.forEach(card => {
            const matchesCategory = category === 'all' || card.dataset.category === category;
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const matchesSearch = searchTerm === '' || 
                                title.includes(searchTerm) || 
                                description.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    categoryFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);

    // Pagination simulation
    const pageButtons = document.querySelectorAll('.page-button');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, you would load the appropriate page here
            console.log(`Loading page ${this.textContent.trim()}`);
        });
    });
});
// Animate elements on scroll
// function animateOnScroll() {
//     const elements = document.querySelectorAll('.animate-on-scroll');
    
//     elements.forEach(element => {
//         const elementPosition = element.getBoundingClientRect().top;
//         const screenPosition = window.innerHeight / 1.3;
        
//         if (elementPosition < screenPosition) {
//             element.classList.add('visible');
//         }
//     });
// }

// // Animate milestone numbers
// function animateNumbers() {
//     const milestones = document.querySelectorAll('.number');
//     const speed = 200;
    
//     milestones.forEach(milestone => {
//         const target = +milestone.getAttribute('data-count');
//         const count = +milestone.innerText;
//         const increment = target / speed;
        
//         if (count < target) {
//             milestone.innerText = Math.ceil(count + increment);
//             setTimeout(animateNumbers, 1);
//         } else {
//             milestone.innerText = target.toLocaleString();
//         }
//     });
// }

// // Initialize animations
// document.addEventListener('DOMContentLoaded', function() {
//     // Set up intersection observer for scroll animations
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('visible');
                
//                 // Trigger number animation for milestones section
//                 if (entry.target.classList.contains('milestones')) {
//                     animateNumbers();
//                 }
//             }
//         });
//     }, { threshold: 0.1 });
    
//     document.querySelectorAll('.animate-on-scroll').forEach(section => {
//         observer.observe(section);
//     });
    
//     // Mobile menu toggle (same as main page)
//     const hamburger = document.querySelector('.hamburger');
//     const navLinks = document.querySelector('.nav-links');
    
//     hamburger.addEventListener('click', function() {
//         navLinks.classList.toggle('active');
//         this.querySelector('i').classList.toggle('fa-times');
//         this.querySelector('i').classList.toggle('fa-bars');
//     });
// });

// // Smooth scrolling for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
        
//         const targetId = this.getAttribute('href');
//         const targetElement = document.querySelector(targetId);
        
//         if (targetElement) {
//             window.scrollTo({
//                 top: targetElement.offsetTop - 80,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });
// Learn More Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.querySelector('.cta-button.secondary'); // Your "Learn More" button
    const modal = document.getElementById('learnMoreModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (learnMoreBtn && modal) {
        // Open modal
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Close modal
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});