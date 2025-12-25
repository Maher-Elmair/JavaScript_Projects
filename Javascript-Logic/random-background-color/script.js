let hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let colorParts = [];

for (let i = 0; i < 6; i++) {
  colorParts.push(hexArray[Math.floor(Math.random() * hexArray.length)]);
}

let finalColor = `#${colorParts.join("")}`;

localStorage.setItem("color", finalColor);

const savedColor = localStorage.getItem("color");

document.body.style.backgroundColor = savedColor;

// Display the saved color
const colorDisplay = document.createElement("h1");
colorDisplay.textContent = savedColor;
document.body.append(colorDisplay);

// Listen for changes in localStorage from other tabs
window.addEventListener("storage", (event) => {
  if (event.key === "color") {
    // const newColor = event.newValue;
    // Update the background color and displayed color
    document.body.style.backgroundColor = event.newValue;
    colorDisplay.textContent = event.newValue;
  }
});
