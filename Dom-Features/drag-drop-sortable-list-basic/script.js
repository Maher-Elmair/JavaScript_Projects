const sortableList = document.querySelector(".sortable-list");

// Handle dragging
sortableList.addEventListener("dragstart", (e) => {
  const item = e.target.closest(".item");
  if (item) {
    item.classList.add("dragging");
  }
});

sortableList.addEventListener("dragend", (e) => {
  const item = e.target.closest(".item");
  if (item) {
    item.classList.remove("dragging");
  }
});

// Handle dragover to sort items
sortableList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggingItem = sortableList.querySelector(".dragging");
  const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  let nextSibling = siblings.find(
    (sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
  );
  const placeholder = document.createElement("li");
  placeholder.classList.add("item", "placeholder");

  // Insert the placeholder in the correct position
  sortableList.insertBefore(placeholder, nextSibling);

  // After placeholder is inserted, move the dragging item to the right place
  sortableList.insertBefore(draggingItem, placeholder);
  placeholder.remove();
});

sortableList.addEventListener("dragenter", (e) => {
  e.preventDefault();
});
