const themeSwitch = document.getElementById("theme-switch");

const toggleTheme = () => {
  // Get the current theme from the body element using the data-theme attribute
  const newTheme =
    document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
  // Set the new theme on the body element using the data-theme attribute
  document.body.setAttribute("data-theme", newTheme);
  // Save the new theme in localStorage to remember the preference on page reload
  localStorage.setItem("theme", newTheme);
};

// Apply the saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);
themeSwitch.addEventListener("click", toggleTheme);

// Listen for changes in localStorage from other tabs
window.addEventListener("storage", (event) => {
  if (event.key === "theme")
    document.body.setAttribute("data-theme", event.newValue);
});
