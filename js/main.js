const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggleBtn.textContent = savedTheme === "light" ? "🌞" : "🌙";
}
toggleBtn.addEventListener("click", () => {
  let currentTheme = root.getAttribute("data-theme");
  let newTheme = currentTheme === "light" ? "dark" : "light";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleBtn.textContent = newTheme === "light" ? "🌞" : "🌙";
});
document.getElementById("hamburger").addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("show");
});
const projects = [
  {
    title: "Portfolio Website",
    description: "A responsive portfolio built with HTML, CSS, and JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript"],
    imageUrl: "images/portfolio.png"
  },
  {
    title: "Weather App",
    description: "A weather app that fetches real-time data from an API.",
    technologies: ["JavaScript", "API", "CSS"],
    imageUrl: "images/weather.png"
  },
  {
    title: "Task Manager",
    description: "A to-do list app with local storage support.",
    technologies: ["HTML", "CSS", "JavaScript"],
    imageUrl: "images/tasks.png"
  }
];
const projectsContainer = document.querySelector(".projects-grid");
function renderProjects() {
  let projectHTML = "";
  projects.forEach(project => {
    projectHTML += `
      <div class="project-card">
        <img src="${project.imageUrl}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="tech">${project.technologies.join(", ")}</span>
      </div>
    `;
  });
  projectsContainer.innerHTML = projectHTML;
}
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});
const form = document.getElementById("contact-form");
const statusDiv = document.getElementById("form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" }
    });
    if (response.ok) {
      window.location.href = "thankyou.html";
      form.reset();
    } else {
      statusDiv.textContent = "Oops! There was a problem.";
    }
  } catch (error) {
    statusDiv.textContent = "Network error. Please try again.";
  }
});
