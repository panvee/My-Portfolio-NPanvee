// Grabbing all the elements I need to work with
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const topBtn = document.getElementById('topBtn');
const certificatesSection = document.getElementById('certificates');
const certificateCards = document.querySelectorAll('.certificate-card');
const contactForm = document.getElementById('contact-form');

// Toggle for the mobile menu - shows/hides when you tap the hamburger
if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close the menu when clicking a link - otherwise it stays open which is annoying
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll effect for the nav links - much nicer than the default jumpy behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for the fixed navbar at the top
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top when clicking the up arrow button
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Show/hide scroll button and change navbar style when scrolling
window.addEventListener('scroll', function() {
    // Show the button only after scrolling down a bit
    if (document.documentElement.scrollTop > 300) {
        topBtn.style.display = 'flex';
        topBtn.style.opacity = '1';
    } else {
        topBtn.style.opacity = '0';
        setTimeout(() => {
            if (document.documentElement.scrollTop <= 300) {
                topBtn.style.display = 'none';
            }
        }, 300);
    }
    
    // Add a shadow to the navbar when scrolling - helps it stand out more
    if (document.documentElement.scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Trigger animations for elements as they come into view
    animateOnScroll();
});

// Makes elements fade in as you scroll down - way more interesting than static content
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-content, .certificate-card, .project-card, .skills-list li');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Set up the certificate animations when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - checking certificates");
    
    if (!certificatesSection) {
        console.error("Certificates section not found");
        return;
    }
    
    console.log("Found certificate cards:", certificateCards.length);
    
    // Make sure cards are visible by default - had an issue where they were disappearing
    certificateCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Check if something is actually visible in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate the certificates with a slight delay between each - looks like they're cascading in
    window.addEventListener('scroll', function() {
        if (isInViewport(certificatesSection)) {
            certificateCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 150 * index);
            });
        }
    });
    
    // Kick off animations for elements already visible when page loads
    setTimeout(animateOnScroll, 300);
});

// Form validation - check fields before sending
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        let formValid = true;
        
        // Reset the error highlights from previous attempts
        document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
            field.classList.remove('error');
        });
        
        // Check each field - highlight any problems
        if (name === "") {
            document.getElementById("name").classList.add('error');
            formValid = false;
        }
        
        if (email === "") {
            document.getElementById("email").classList.add('error');
            formValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById("email").classList.add('error');
            formValid = false;
        }
        
        if (message === "") {
            document.getElementById("message").classList.add('error');
            formValid = false;
        }
        
        if (!formValid) {
            showNotification("Please fill all fields correctly", "error");
        } else {
            // Success! In a real site this would send to a server
            contactForm.reset();
            showNotification("Thank you! Your message has been sent successfully.", "success");
        }
    });
}

// Check if an email looks legit
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show a notification pop-up - much nicer than browser alerts
function showNotification(message, type) {
    // Remove any existing notifications first
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create a new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add it to the page
    document.body.appendChild(notification);
    
    // Fade it in with a slight delay - looks smoother
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Set up the close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-hide after 5 seconds - don't want it hanging around forever
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// This would display projects from a data source - not using right now but could be useful later
function displayProjects() {
    const projectContainer = document.getElementById("project-list");
    projects.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project");

        const title = document.createElement("h3");
        title.textContent = project.title;

        const desc = document.createElement("p");
        desc.textContent = project.description;

        const tech = document.createElement("p");
        tech.textContent = "Tech Stack: " + project.techStack.join(", ");

        const github = document.createElement("a");
        github.href = project.githubLink;
        github.textContent = "GitHub Repository";
        github.target = "_blank";

        projectItem.appendChild(title);
        projectItem.appendChild(desc);
        projectItem.appendChild(tech);
        projectItem.appendChild(github);

        projectContainer.appendChild(projectItem);
    });
}

document.addEventListener("DOMContentLoaded", displayProjects);