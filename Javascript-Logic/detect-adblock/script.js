const detect = document.querySelector("#detect"),
  wrapper = document.querySelector(".wrapper"),
  button = wrapper.querySelector("button");

//these are some possible classes that adblocker avoid to render
let adClasses = [
  "ad",
  "ads",
  "adsbox",
  "ad-placement",
  "doubleclick",
  "ad-placeholder",
  "ad-badge",
];
for (let item of adClasses) {
  detect.classList.add(item); //adding all array item in detect element
}
//getting display property value of our detect element
let getProperty = window.getComputedStyle(detect).getPropertyValue("display");
console.log(getProperty);
button.addEventListener("click", () => {
  wrapper.classList.remove("show"); //hide popup on button click
});
//if wrapper doesn't contains show class the check adblocker is enabled or not
if (!wrapper.classList.contains("show")) {
  //if display property value is none then show the popup else hide it
  getProperty == "none"
    ? wrapper.classList.add("show")
    : wrapper.classList.remove("show");
}
