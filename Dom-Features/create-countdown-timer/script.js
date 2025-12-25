// Target date: December 31, 2030 at 23:59:59
const targetDate = new Date("Dec 31, 2030 23:59:59");

const updateCountdown = () => {
    const now = new Date();
    const timeLeft = targetDate - now;

    // Create a Date object from the time difference
    const diffDate = new Date(timeLeft);

    // Extract days, hours, minutes, and seconds
    // const days = diffDate.getUTCDate() - 1; // Days (subtract 1 because getUTCDate() starts from 1)
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // Days
    const hours = diffDate.getUTCHours(); // Hours
    const minutes = diffDate.getUTCMinutes(); // Minutes
    const seconds = diffDate.getUTCSeconds(); // Seconds

    // Display the values on the page
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

    // Stop the countdown when it reaches zero
    if (timeLeft < 0) {
        clearInterval(interval);
        document.querySelector(".countdown").innerHTML = "<span>Time is up!</span>";
    }
};

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
