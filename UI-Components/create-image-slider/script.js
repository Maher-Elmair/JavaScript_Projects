// Get Slider Items | Array.from [ES6 Feature]
let sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);

// Get Number Of Slides
let slidesCount = sliderImages.length;

// Set Current Slide
let currentSlide = 1;

// Slide Number Element
let slideNumberElement = document.getElementById("slide-number");

// Previous and Next Buttons
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

// Handle Click on Previous and Next Buttons
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Create The Main UL Element
let paginationElement = document.createElement("ul");

// Set ID On Created Ul Element
paginationElement.setAttribute("id", "pagination-ul");

// Create List Items Based On Slides Count
for (let i = 1; i <= slidesCount; i++) {
  // Create The LI
  let paginationItem = document.createElement("li");

  // Set Custom Attribute
  paginationItem.setAttribute("data-index", i);

  // Set Item Content
  paginationItem.appendChild(document.createTextNode(i));

  // Append Items to The Main Ul List
  paginationElement.appendChild(paginationItem);
}

// Add The Created UL Element to The Page
document.getElementById("indicators").appendChild(paginationElement);

// Get The New Created UL
let paginationCreatedUl = document.getElementById("pagination-ul");

// Get Pagination Items | Array.from [ES6 Feature]
let paginationsBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

// Loop Through All Bullets Items and onclick edivent
for (let i = 0; i < paginationsBullets.length; i++) {
  paginationsBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
    restartAutoPlay(); // Restart the autoplay after drag stop
  };
}

// Trigger The Checker Function
theChecker();

// Next Slide Function
function nextSlide() {
  if (currentSlide < slidesCount) {
    currentSlide++;
  } else {
    // Loop back to the first slide
    currentSlide = 1;
  }
  theChecker();
  restartAutoPlay(); // Restart the autoplay after drag stop
}

// Previous Slide Function
function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
  } else {
    // Loop to the last slide
    currentSlide = slidesCount;
  }
  theChecker();
  restartAutoPlay(); // Restart the autoplay after drag stop
}

// Create The Checker Function
function theChecker() {
  // Set The Slide Number
  slideNumberElement.textContent =
    "Slide #" + currentSlide + " of " + slidesCount;

  // Remove All Active Classes
  removeAllActive();

  // Set Active Class On Current Slide
  sliderImages[currentSlide - 1].classList.add("active");

  // Set Active Class on Current Pagination Item
  paginationCreatedUl.children[currentSlide - 1].classList.add("active");
}

// Remove All Active Classes From Images and Pagination Bullets
function removeAllActive() {
  // Loop Through Images
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });

  // Loop Through Pagination Bullets
  paginationsBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}

// Smooth Drag functionality
let isDragging = false,
  startX,
  dragThreshold = 50;

const sliderContainer = document.querySelector(".slider-container");

const dragStart = (e) => {
  isDragging = true;
  sliderContainer.classList.add("dragging");
  startX = e.pageX || e.touches[0].pageX;
};

const dragging = (e) => {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const deltaX = x - startX;

  // Simulate slide change when drag exceeds threshold
  if (deltaX > dragThreshold) {
    prevSlide();
    dragStop();
  } else if (deltaX < -dragThreshold) {
    nextSlide();
    dragStop();
  }
};

const dragStop = () => {
  isDragging = false;
  sliderContainer.classList.remove("dragging");
  restartAutoPlay(); // Restart the autoplay after drag stop
};

// Use { passive: true } for scroll-blocking events
sliderContainer.addEventListener("mousedown", dragStart);
sliderContainer.addEventListener("mousemove", dragging);
sliderContainer.addEventListener("mouseup", dragStop);
sliderContainer.addEventListener("mouseleave", dragStop);

sliderContainer.addEventListener("touchstart", dragStart, { passive: true }); // Passive event
sliderContainer.addEventListener("touchmove", dragging, { passive: true }); // Passive event
sliderContainer.addEventListener("touchend", dragStop, { passive: true }); // Passive event

// Auto-play functionality
let autoPlayInterval;
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    nextSlide(); // Automatically go to the next slide
  }, 3000); // Change slide every 3 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function restartAutoPlay() {
  stopAutoPlay(); // Stop the current interval
  startAutoPlay(); // Start it again
}

// Start auto-play on page load
startAutoPlay();

// Allow users to navigate the slider using the left and right arrow keys.
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  else if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "Escape") restartAutoPlay();
});
