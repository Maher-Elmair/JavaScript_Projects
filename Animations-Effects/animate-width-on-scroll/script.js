let section = document.querySelector(".three");
let spans = document.querySelectorAll(".progress span");

window.addEventListener("scroll", () => {
  if (window.scrollY >= section.offsetTop) {
    console.log("Reached Section Three");
    spans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
});
