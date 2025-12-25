let mouseX = 0;
let mouseY = 0;
let flashlight = document.getElementById("flashlight");
// Delete touch device
function isTouchDevice() {
  try {
    // we try to create TouchEvent. It would fail for desktop and throw Error
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
function getMousePosition(e) {
  mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
  mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  flashlight.style.setProperty("--Xpos", mouseX + "px");
  flashlight.style.setProperty("--Ypos", mouseY + "px");
}
document.addEventListener("mousemove", getMousePosition);
document.addEventListener("touchmove", getMousePosition);
