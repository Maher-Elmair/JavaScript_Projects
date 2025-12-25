let translations = {};

const loadTranslations = async (language) => {
  try {
    // IMPORTANT: Fetch translation JSON and update elements
    translations = await (await fetch(`languages/${language}.json`)).json();
    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.textContent = translations[element.getAttribute("data-lang")];
    });

    // IMPORTANT & TRICKY: Set text direction for RTL languages like Arabic
    document.dir = language === "arabic" ? "rtl" : "ltr";
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};

document.querySelector("select").addEventListener("change", (event) => {
  const selectedLanguage = event.target.value;
  loadTranslations(selectedLanguage);
  localStorage.setItem("lang", selectedLanguage); // Persist language preference
});

document.addEventListener("DOMContentLoaded", () => {
  const storedLanguage = localStorage.getItem("lang") || "english";
  document.querySelector("select").value = storedLanguage;
  loadTranslations(storedLanguage);
});
