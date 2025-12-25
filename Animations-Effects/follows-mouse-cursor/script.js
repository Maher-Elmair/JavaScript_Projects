let myDiv = document.getElementById("my_div");
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
const move = (e) => {
  // try ,catch to avoid any errors for touch screens
  // (error thrown when user doesm't move his finger)
  try {
    // pageX and pageY return the position of client's cursor from top left of screen
    var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  } catch (e) {}
  // set left and top of div based on mouse position
  myDiv.style.left = x - 12 + "px";
  myDiv.style.top = y - 12 + "px";
};
// for mouse
document.addEventListener("mousemove", (e) => {
  move(e);
});
// for touch
document.addEventListener("touchmove", (e) => {
  move(e);
});
