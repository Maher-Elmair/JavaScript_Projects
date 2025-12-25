let nums = document.querySelectorAll(".nums .num");
let start = document.querySelector(".three");
let started = false;

window.addEventListener("scroll", () => {
  // The range where we want to trigger the code
  if (window.scrollY >= start.offsetTop - 200) {
    if (!started) {
      nums.forEach((num) => startCount(num)); // Start the counters
      started = true;
    }
  } else {
    // If we leave the range, reset the counters and the started variable
    if (started) {
      nums.forEach((num) => {
        num.textContent = 0;
      }); // Reset counters to 0
      started = false;
    }
  }
});

function startCount(ele) {
  let goal = ele.dataset.goal;
  let count = setInterval(() => {
    // Increase the value only if it is less than the goal
    if (parseInt(ele.textContent) < goal) {
      ele.textContent++;
    } else {
      clearInterval(count); // Stop counting when the goal is reached
    }
  }, 2000 / goal);
}
