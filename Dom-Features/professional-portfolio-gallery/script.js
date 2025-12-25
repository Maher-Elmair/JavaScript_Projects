const switcherLis = document.querySelectorAll(".switcher li");
const galleryItems = document.querySelectorAll(".gallery-item");
const countElement = document.getElementById("itemCount");

switcherLis.forEach((li) => {
  li.addEventListener("click", function () {
    // Remove active class from all
    switcherLis.forEach((item) => item.classList.remove("active"));

    // Add active to current
    this.classList.add("active");

    // Get category
    const category = this.dataset.cat;
    let visibleCount = 0;

    // Filter items
    galleryItems.forEach((item) => {
      if (category === "all" || item.classList.contains(category)) {
        item.classList.add("show");
        visibleCount++;
      } else {
        item.classList.remove("show");
      }
    });

    // Update count
    countElement.textContent = visibleCount;
  });
});
