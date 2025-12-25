// Card data
const cardsData = [
  {
    icon: "fa-rocket",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    title: "Digital Innovation",
    description:
      "Transform your business with cutting-edge digital solutions and innovative strategies that drive growth and competitive advantage.",
  },
  {
    icon: "fa-chart-line",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    title: "Growth Analytics",
    description:
      "Leverage powerful data insights and analytics to make informed decisions and accelerate your business performance.",
  },
  {
    icon: "fa-lightbulb",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    title: "Creative Solutions",
    description:
      "Unlock creativity and innovation with tailored solutions designed to solve complex challenges and deliver exceptional results.",
  },
  {
    icon: "fa-users",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    title: "Team Collaboration",
    description:
      "Build high-performing teams with advanced collaboration tools and methodologies that enhance productivity and success.",
  },
  {
    icon: "fa-shield-alt",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    title: "Security First",
    description:
      "Protect your assets with enterprise-grade security solutions and comprehensive risk management strategies.",
  },
  {
    icon: "fa-globe",
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    title: "Global Impact",
    description:
      "Expand your reach and create meaningful impact across borders with scalable global solutions and partnerships.",
  },
];

// Configuration
const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds
let currentIndex = 0;
let autoSlideTimer;
let cardsPerView = 1;
let isTransitioning = false;

// DOM Elements
const sliderTrack = document.getElementById("sliderTrack");
const dotsContainer = document.getElementById("dotsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Create a single card HTML
function createCard(cardData, index) {
  return `
                <div class="card">
                    <div class="card-content">
                        <div class="card-number">${index + 1}</div>
                        <div class="card-image" style="background: ${
                          cardData.gradient
                        };">
                            <i class="fas ${cardData.icon}"></i>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${cardData.title}</h3>
                            <p class="card-description">${
                              cardData.description
                            }</p>
                        </div>
                    </div>
                </div>
            `;
}

// Calculate cards per view based on screen size
function getCardsPerView() {
  const width = window.innerWidth;
  if (width >= 1024) return 3; // Desktop
  if (width >= 768) return 2; // Tablet
  return 1; // Mobile
}

// Initialize slider with cloned cards for infinite loop
function initializeSlider() {
  sliderTrack.innerHTML = "";

  // Clone cards at the beginning (last cards)
  for (let i = cardsData.length - cardsPerView; i < cardsData.length; i++) {
    sliderTrack.innerHTML += createCard(cardsData[i], i);
  }

  // Add original cards
  cardsData.forEach((cardData, index) => {
    sliderTrack.innerHTML += createCard(cardData, index);
  });

  // Clone cards at the end (first cards)
  for (let i = 0; i < cardsPerView; i++) {
    sliderTrack.innerHTML += createCard(cardsData[i], i);
  }

  // Set initial position (skip the cloned cards at the beginning)
  currentIndex = 0;
  updateSliderPosition(false);
}

// Update slider position
function updateSliderPosition(animate = true) {
  if (!animate) {
    sliderTrack.classList.add("no-transition");
  } else {
    sliderTrack.classList.remove("no-transition");
  }

  // Calculate offset including the prepended clones
  const offset = -(currentIndex + cardsPerView) * (100 / cardsPerView);
  sliderTrack.style.transform = `translateX(${offset}%)`;

  // Force reflow if no transition
  if (!animate) {
    sliderTrack.offsetHeight;
  }
}

// Create navigation dots (one per actual card)
function createDots() {
  dotsContainer.innerHTML = "";

  cardsData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to card ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// Update active dot
function updateDots() {
  const dots = document.querySelectorAll(".dot");
  const actualIndex =
    ((currentIndex % cardsData.length) + cardsData.length) % cardsData.length;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === actualIndex);
  });
}

// Go to specific slide
function goToSlide(index) {
  if (isTransitioning) return;

  currentIndex = index;
  updateSliderPosition(true);
  updateDots();
  resetAutoSlide();
}

// Next slide
function nextSlide() {
  if (isTransitioning) return;

  isTransitioning = true;
  currentIndex++;
  updateSliderPosition(true);
  updateDots();

  // Check if we need to reset to the beginning
  setTimeout(() => {
    if (currentIndex >= cardsData.length) {
      currentIndex = 0;
      updateSliderPosition(false);
    }
    isTransitioning = false;
  }, 600);

  resetAutoSlide();
}

// Previous slide
function prevSlide() {
  if (isTransitioning) return;

  isTransitioning = true;
  currentIndex--;
  updateSliderPosition(true);
  updateDots();

  // Check if we need to reset to the end
  setTimeout(() => {
    if (currentIndex < 0) {
      currentIndex = cardsData.length - 1;
      updateSliderPosition(false);
    }
    isTransitioning = false;
  }, 600);

  resetAutoSlide();
}

// Start auto-slide
function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
}

// Reset auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Handle window resize
function handleResize() {
  const newCardsPerView = getCardsPerView();

  // Reinitialize if cards per view changed
  if (newCardsPerView !== cardsPerView) {
    cardsPerView = newCardsPerView;
    const actualIndex =
      ((currentIndex % cardsData.length) + cardsData.length) % cardsData.length;
    initializeSlider();
    currentIndex = actualIndex;
    updateSliderPosition(false);
    updateDots();
  }
}

// Initialize everything
function init() {
  cardsPerView = getCardsPerView();
  initializeSlider();
  createDots();
  startAutoSlide();

  // Click event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Resize listener
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });

  // Pause on page hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(autoSlideTimer);
    } else {
      startAutoSlide();
    }
  });
}

// Start the slider
init();
