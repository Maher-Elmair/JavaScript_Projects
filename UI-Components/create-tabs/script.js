document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.querySelector(".tabs");
  const tabs = document.querySelectorAll(".tabs li");
  const contentDivs = document.querySelectorAll(".content > div");

  // Load the active tab from localStorage if it exists
  const activeTabId = localStorage.getItem("activeTab");
  if (activeTabId) {
    const savedTab = document.querySelector(`[data-cont="${activeTabId}"]`);
    if (savedTab) {
      activateTab(savedTab); // Activate saved tab
    }
  } else if (tabs.length > 0) {
    // Default to the first tab if no saved tab exists
    activateTab(tabs[0]);
  }

  // Event listener to activate tab on click
  tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("li");
    if (!clickedTab || !Array.from(tabs).includes(clickedTab)) return;
    activateTab(clickedTab);
  });

  // Function to activate a tab and show corresponding content
  function activateTab(tab) {
    // IMPORTANT: Remove 'active' class from all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));
    // Add 'active' class to the clicked tab
    tab.classList.add("active");

    // Hide all content divs
    contentDivs.forEach((div) => (div.style.display = "none"));

    // Show the content div corresponding to the clicked tab
    const targetDivId = tab.dataset.cont;
    const targetDiv = document.querySelector(targetDivId);
    if (targetDiv) {
      targetDiv.style.display = "block";
    }

    // IMPORTANT: Save the active tab in localStorage to persist on reload
    localStorage.setItem("activeTab", targetDivId);
  }
});
