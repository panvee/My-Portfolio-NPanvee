// Scroll to top button functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the scroll to top button when user scrolls down
window.onscroll = function() {
    let topBtn = document.getElementById("topBtn");
    if (document.documentElement.scrollTop > 100) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

// Contact form validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    let formValid = true;

    // Simple validation to check if fields are filled
    if (name === "") {
        document.getElementById("name").style.borderColor = "red";
        formValid = false;
    } else {
        document.getElementById("name").style.borderColor = "";
    }
    
    if (email === "") {
        document.getElementById("email").style.borderColor = "red";
        formValid = false;
    } else {
        document.getElementById("email").style.borderColor = "";
    }

    if (message === "") {
        document.getElementById("message").style.borderColor = "red";
        formValid = false;
    } else {
        document.getElementById("message").style.borderColor = "";
    }

    if (!formValid) {
        alert("Please fill all the fields before submitting.");
    } else {
        alert("Thank you! Your message has been sent successfully.");
        document.getElementById("contact-form").reset();
    }
});