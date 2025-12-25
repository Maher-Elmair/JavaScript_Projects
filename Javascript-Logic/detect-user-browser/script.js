const userAgent = navigator.userAgent.toLowerCase();
const alertBox = document.querySelector(".alert");
let browser;

if (
  userAgent.includes("chrome") &&
  !userAgent.includes("edg") &&
  !userAgent.includes("opr") &&
  !userAgent.includes("brave")
) {
  browser = "chrome";
} else if (userAgent.includes("firefox")) {
  browser = "firefox";
} else if (userAgent.includes("edg")) {
  browser = "edge";
} else if (userAgent.includes("opr") || userAgent.includes("opera")) {
  browser = "opera";
} else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
  browser = "safari";
} else if (userAgent.includes("brave")) {
  browser = "brave";
} else {
  alertBox.classList.add("show");
  browser = "unknown";
}

console.log(browser);

const logo = document.querySelector(`.logos .${browser}`);
if (logo) {
  logo.style.opacity = "1";
}
