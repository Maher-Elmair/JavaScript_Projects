const sortableList = document.querySelector(".sortable-list");
const resetButton = document.querySelector(".reset-btn");

// Save the default order
const defaultOrder = [...sortableList.children].map(
  (item) => item.innerHTML
);

// Load the saved order from localStorage
const loadOrder = () => {
  const savedOrder = JSON.parse(localStorage.getItem("sortableOrder"));
  if (savedOrder) {
    sortableList.innerHTML = ""; // Clear the current list
    savedOrder.forEach((content) => {
      const newItem = createItem(content); // Create items using createItem
      sortableList.appendChild(newItem); // Append them to the list
    });
  }
  initDragEvents(); // Reinitialize drag events
};

// Save the current order to localStorage
const saveOrder = () => {
  const currentOrder = [...sortableList.children].map(
    (item) => item.innerHTML
  ); // Save the content
  localStorage.setItem("sortableOrder", JSON.stringify(currentOrder)); // Store it in localStorage
};

// Create a new HTML element using the DOM
const createItem = (content) => {
  const li = document.createElement("li"); // Create <li> element
  li.className = "item"; // Add CSS class
  li.draggable = true; // Make the item draggable
  li.innerHTML = content; // Add content to the element
  return li;
};

// Reset to the default order
const resetOrder = () => {
  sortableList.innerHTML = ""; // Clear the current list
  defaultOrder.forEach((content) => {
    const newItem = createItem(content); // Create default items
    sortableList.appendChild(newItem); // Append them to the list
  });
  localStorage.removeItem("sortableOrder"); // Remove saved order
  initDragEvents(); // Reinitialize drag events
};

// Initialize drag and drop
const initDragEvents = () => {
  sortableList.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("dragstart", () =>
      item.classList.add("dragging")
    ); // On drag start
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging"); // On drag end
      saveOrder(); // Save order after dragging
    });
  });

  // Update order while dragging
  sortableList.addEventListener("dragover", (e) => {
    e.preventDefault(); // Prevent default behavior
    const draggingItem = document.querySelector(".dragging"); // Currently dragged item
    const items = [
      ...sortableList.querySelectorAll(".item:not(.dragging)"),
    ]; // Other items
    const nextItem = items.find(
      (i) => e.clientY <= i.offsetTop + i.offsetHeight / 2
    ); // Determine the next item position
    sortableList.insertBefore(draggingItem, nextItem || null); // Reorder item
  });
};

// Initialize page on load
document.addEventListener("DOMContentLoaded", loadOrder);

// Reset order when clicking the "Reset Order" button
resetButton.addEventListener("click", resetOrder);
