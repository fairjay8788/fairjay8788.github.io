// UI
const nav = document.querySelector(".nav");
const leftPane = document.querySelector(".nav .left-pane");
const rightPane = document.querySelector(".nav .right-pane");
const hamburger = document.querySelector(".hamburger");

// Hamburger Status
let toggle = false;

// Event Listener
hamburger.addEventListener("click", function () {
  if (!toggle) {
    leftPane.style.left = "0";
    rightPane.style.right = "0";
    nav.style.setProperty("z-index", "9");
  } else {
    leftPane.style.left = "-100%";
    rightPane.style.right = "-100%";
    setTimeout(function () {
      nav.style.setProperty("z-index", "-1");
    }, 550);
  }
  toggle = !toggle;
});

nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    e.preventDefault();
    // Link change color
    nav.querySelector(".current").classList.remove("current");
    e.target.classList.add("current");
    // Close nav menu
    hamburger.click();
    // Page Sliding
    const sections = Array.from(document.querySelectorAll(".section"));
    const goToPage = document.querySelector(
      `${e.target.href.substr(e.target.href.indexOf("#"))}`
    );

    if (!goToPage.classList.contains("slideUp")) {
      // if goToPage is not slided up, then slide up this page and all the pages before it
      for (let i = 0; i < sections.indexOf(goToPage) + 1; i++) {
        sections[i].classList.add("slideUp");
      }
    } else {
      // if goToPage is slided up, then slide down all the pages after it
      for (let i = sections.indexOf(goToPage) + 1; i < sections.length; i++) {
        sections[i].classList.remove("slideUp");
        console.log(sections[i]);
      }
    }
  }
});
