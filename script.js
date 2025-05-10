function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    let topBtn = document.getElementById("topBtn");
    if (document.documentElement.scrollTop > 100) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    let formValid = true;

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