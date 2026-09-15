const state = {
jobs: [
{
id: 1,
title: "Care Assistant",
country: "United Kingdom",
category: "Healthcare",
description: "Care assistant opportunities in the United Kingdom."
},
{
id: 2,
title: "Hotel Worker",
country: "Ireland",
category: "Hospitality",
description: "Hospitality and hotel work opportunities in Ireland."
},
{
id: 3,
title: "Warehouse Worker",
country: "Poland",
category: "Logistics",
description: "Warehouse and logistics opportunities in Poland."
},
{
id: 4,
title: "Construction Worker",
country: "Canada",
category: "Construction",
description: "Construction employment opportunities in Canada."
}
]
};

const $ = (selector) => document.querySelector(selector);

const modal = $("#modal");
const modalContent = $("#modalContent");
const closeModalButton = $("#closeModal");
const toast = $("#toast");

function notify(message) {
toast.textContent = message;
toast.style.display = "block";

setTimeout(() => {
toast.style.display = "none";
}, 3000);
}

function openModal(content) {
modalContent.innerHTML = content;
modal.classList.remove("hidden");
modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
modal.classList.add("hidden");
modal.setAttribute("aria-hidden", "true");
}

function showLogin() {
openModal("<h2>Login</h2> <form id="loginForm"> <input type="email" id="loginEmail" placeholder="Email address" required> <input type="password" id="loginPassword" placeholder="Password" required> <button type="submit">Login</button> </form>");

$("#loginForm").addEventListener("submit", (event) => {
event.preventDefault();
notify("Login system will be connected in the next step.");
closeModal();
});
}

function showRegister() {
openModal("<h2>Create Account</h2> <form id="registerForm"> <input type="text" id="registerName" placeholder="Full name" required> <input type="email" id="registerEmail" placeholder="Email address" required> <input type="password" id="registerPassword" placeholder="Password" required> <button type="submit">Create Account</button> </form>");

$("#registerForm").addEventListener("submit", (event) => {
event.preventDefault();
notify("Registration system will be connected in the next step.");
closeModal();
});
}

function populateFilters() {
const countryFilter = $("#countryFilter");
const categoryFilter = $("#categoryFilter");

const countries = [...new Set(state.jobs.map((job) => job.country))];
const categories = [...new Set(state.jobs.map((job) => job.category))];

countries.forEach((country) => {
const option = document.createElement("option");
option.value = country;
option.textContent = country;
countryFilter.appendChild(option);
});

categories.forEach((category) => {
const option = document.createElement("option");
option.value = category;
option.textContent = category;
categoryFilter.appendChild(option);
});
}

function renderJobs() {
const container = $("#jobsContainer");
const search = $("#searchInput").value.toLowerCase().trim();
const country = $("#countryFilter").value;
const category = $("#categoryFilter").value;

const filteredJobs = state.jobs.filter((job) => {
const matchesSearch =
!search ||
job.title.toLowerCase().includes(search) ||
job.country.toLowerCase().includes(search) ||
job.category.toLowerCase().includes(search);

const matchesCountry =
  !country || job.country === country;

const matchesCategory =
  !category || job.category === category;

return matchesSearch && matchesCountry && matchesCategory;

});

if (filteredJobs.length === 0) {
container.innerHTML = "<p>No jobs found.</p>";
return;
}

container.innerHTML = filteredJobs
.map(
(job) => "<article class="job-card"> <h3>${job.title}</h3> <p><strong>Country:</strong> ${job.country}</p> <p><strong>Category:</strong> ${job.category}</p> <p>${job.description}</p> <button onclick="applyForJob(${job.id})"> Apply </button> </article>"
)
.join("");
}

function applyForJob(jobId) {
const job = state.jobs.find((item) => item.id === jobId);

if (!job) {
notify("Job not found.");
return;
}

openModal("<h2>Apply for ${job.title}</h2> <p>Please create an account before applying.</p> <button id="applicationRegisterButton"> Create Account </button>");

$("#applicationRegisterButton").addEventListener(
"click",
showRegister
);
}

$("#loginBtn").addEventListener("click", showLogin);
$("#registerBtn").addEventListener("click", showRegister);
$("#heroRegister").addEventListener("click", showRegister);
closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
if (event.target === modal) {
closeModal();
}
});

$("#searchInput").addEventListener("input", renderJobs);
$("#countryFilter").addEventListener("change", renderJobs);
$("#categoryFilter").addEventListener("change", renderJobs);

populateFilters();
renderJobs();
