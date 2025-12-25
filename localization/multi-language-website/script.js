let translations = {};

// Load the translation JSON file
fetch("./translations.json")
  .then((response) => response.json())
  .then((data) => {
    translations = data;
    initializeLanguage(); // Initialize language after loading translations
  })
  .catch((error) => console.error("Error loading translations:", error));

const languageSelecter = document.querySelector("select");

// Event listener for language dropdown change
languageSelecter.addEventListener("change", (event) => {
  setLanguage(event.target.value);
  localStorage.setItem("lang", event.target.value); // Persist selected language
});

const initializeLanguage = () => {
  const storedLanguage = localStorage.getItem("lang") || "en"; // Default to "en" if not set
  languageSelecter.value = storedLanguage; // Set dropdown value
  setLanguage(storedLanguage); // Update page text
};

// Function to update text content based on selected language
const setLanguage = (language) => {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-lang"); // Get key from data-lang attribute
    element.textContent = translations[language][translationKey]; // Set translated text
  });

  // IMPORTANT: Set text direction for RTL languages like Arabic
  document.dir = language === "ar" ? "rtl" : "ltr";
};
