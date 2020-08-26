// UI
const UINavMenu = document.getElementById("nav-menu");
const UIModeSwitch = document.getElementById("switch-wrap");
const UIMinorProjectsHeader = document.querySelector(".minor-projects-header");
const UIContactForm = document.getElementById("contact-form");

// Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]', { speed: 800 });

// NavMenu Module
const navMenu = (function () {
  const slider = document.getElementById("nav-slider");
  // UI section variables
  // const showcaseSec = document.getElementById("showcase");
  const aboutSec = document.getElementById("about");
  const workSec = document.getElementById("work");
  const contactSec = document.getElementById("contact");
  // Current position of slider
  let currentLiIndex = 0;
  // Current section in viewport
  let currentSectionIndex = 0;
  let scrollTimer;
  return {
    getCurrentSection: function () {
      // check which section is taking up most of viewport
      if (contactSec.getBoundingClientRect().top < window.innerHeight / 2) {
        return (currentSectionIndex = 3);
      } else if (workSec.getBoundingClientRect().top < window.innerHeight / 2) {
        return (currentSectionIndex = 2);
      } else if (
        aboutSec.getBoundingClientRect().top <
        window.innerHeight / 2
      ) {
        return (currentSectionIndex = 1);
      } else {
        return (currentSectionIndex = 0);
      }
    },
    moveSlider: function () {
      if (scrollTimer !== undefined) {
        // If scrollTimer is not undefined, it means the callback function in setTimeOut is waiting to be executed. While waiting, scroll event fired again, so page is not done scrolling, clear current timer and start a new timer. Callback will eventually fire after scroll event stops.
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        // update the currentSectionIndex
        navMenu.getCurrentSection();
        // move slider
        if (currentSectionIndex > currentLiIndex) {
          // Scrolled to a lower section
          slider.style.setProperty(
            "right",
            `${320 - (currentSectionIndex + 1) * 80}px`
          );
          setTimeout(() => {
            slider.style.setProperty("left", `${currentSectionIndex * 80}px`);
          }, 500);
          // update current index
          currentLiIndex = currentSectionIndex;
        } else if (currentSectionIndex < currentLiIndex) {
          // Scrolled to a upper section
          slider.style.setProperty("left", `${currentSectionIndex * 80}px`);
          setTimeout(() => {
            slider.style.setProperty(
              "right",
              `${320 - (currentSectionIndex + 1) * 80}px`
            );
          }, 500);
          // update current index
          currentLiIndex = currentSectionIndex;
        }
      }, 150);
    },
  };
})();

// // Minor Projects Expand Module

const minorProjects = (function () {
  let isExpanded = false;
  const minorProjectsContainer = document.querySelector(
    ".minor-projects-container"
  );
  const minorProjectsMain = document.querySelector(".minor-projects-main");
  const chevronUp = document.querySelector(
    ".minor-projects-header .fa-chevron-up"
  );
  return {
    expand: function () {
      // Get the most updated height everytime header is clicked
      const targetHeight = minorProjectsContainer.getBoundingClientRect()
        .height;
      if (!isExpanded) {
        // Expand to target height
        minorProjectsMain.style.setProperty("height", `${targetHeight}px`);
        minorProjectsContainer.style.setProperty("opacity", "1");
        chevronUp.style.setProperty("transform", "rotate(180deg)");
        isExpanded = true;
      } else {
        minorProjectsMain.style.setProperty("height", "0");
        minorProjectsContainer.style.setProperty("opacity", "0");
        chevronUp.style.setProperty("transform", "rotate(0)");
        isExpanded = false;
      }
    },
  };
})();

// // Contact Form Submission Module

const form = (function () {
  // Google Apps Script that writes form data into my spreadsheet
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzy8eHjvQl8L09r-D7jXnoSrITOQeJ50c1u0UBbeOocVPK4LLU/exec";
  const inputName = document.getElementById("name-field");
  const inputEmail = document.getElementById("email-field");
  const inputMsg = document.getElementById("message-field");
  const nameErrMsg = document.getElementById("name-error-msg");
  const emailErrMsg = document.getElementById("email-error-msg");
  const messageErrMsg = document.getElementById("message-error-msg");
  const submitBtn = document.getElementById("btn-form-submit");
  return {
    validation: function (e) {
      e.preventDefault();
      nameErrMsg.style.opacity = "0";
      emailErrMsg.style.opacity = "0";
      messageErrMsg.style.opacity = "0";
      if (inputName.value.trim() === "") {
        nameErrMsg.style.opacity = "1";
      } else if (inputEmail.value.trim() === "") {
        emailErrMsg.style.opacity = "1";
      } else if (inputMsg.value.trim() === "") {
        messageErrMsg.style.opacity = "1";
      } else {
        form.send();
      }
    },
    clearForm: function () {
      inputName.value = "";
      inputEmail.value = "";
      inputMsg.value = "";
    },
    send: function () {
      const data = new FormData(UIContactForm);
      fetch(scriptURL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) =>
          console.log(`Success! Form data written into row ${res.row}.`)
        )
        .catch(console.log);
      form.clearForm();
      submitBtn.value = "Thanks! I will get back to you.";
      setTimeout(() => {
        submitBtn.value = "Send";
      }, 3000);
    },
  };
})();

const mode = (function () {
  // true === dark mode ; false === light mode
  let currentMode = JSON.parse(localStorage.getItem("portfolioMode"))
    ? true
    : false;
  // querySelectorAll returns static(not live) NodeList
  const prBgChangeNodeList = document.querySelectorAll(".lt-primary-bg");
  const seBgChangeNodeList = document.querySelectorAll(".lt-secondary-bg");
  const prColorChangeNodeList = document.querySelectorAll(".lt-primary-color");
  const glowTextNodeList = document.querySelectorAll(".luminousText");
  const flicker = document.querySelector("#switch-wrap .wrapper");
  return {
    initMode: function () {
      if (!currentMode) {
        // Light Mode
        prBgChangeNodeList.forEach((ele) => {
          ele.classList.remove("dk-primary-bg");
          ele.classList.add("lt-primary-bg");
        });
        seBgChangeNodeList.forEach((ele) => {
          ele.classList.remove("dk-secondary-bg");
          ele.classList.add("lt-secondary-bg");
        });
        prColorChangeNodeList.forEach((ele) => {
          ele.classList.remove("dk-primary-color");
          ele.classList.add("lt-primary-color");
        });
        // Take care of special styles
        // Showcase Background
        document.getElementById("showcase").classList.remove("dk-showcase-bg");
        document.getElementById("showcase").classList.add("lt-showcase-bg");
        // Luminous Text
        glowTextNodeList.forEach((ele) => {
          ele.classList.remove("glowing");
        });
        //  About Me Img
        document.querySelector("#about-details img").src = "./img/aboutme.jpg";
        // Flicker
        flicker.style.setProperty("transform", "translateX(0)");
        document.getElementById("mode-text").textContent = "Go To Dark";
        // Form Submit Button
        document
          .getElementById("btn-form-submit")
          .style.setProperty("background", "black");
        document
          .getElementById("btn-form-submit")
          .style.setProperty("color", "white");
      } else {
        // Dark Mode
        prBgChangeNodeList.forEach((ele) => {
          ele.classList.remove("lt-primary-bg");
          ele.classList.add("dk-primary-bg");
        });
        seBgChangeNodeList.forEach((ele) => {
          ele.classList.remove("lt-secondary-bg");
          ele.classList.add("dk-secondary-bg");
        });
        prColorChangeNodeList.forEach((ele) => {
          ele.classList.remove("lt-primary-color");
          ele.classList.add("dk-primary-color");
        });
        // Take care of special styles
        // Showcase Background
        document.getElementById("showcase").classList.remove("lt-showcase-bg");
        document.getElementById("showcase").classList.add("dk-showcase-bg");
        // Luminous Text
        glowTextNodeList.forEach((ele) => {
          ele.classList.add("glowing");
        });
        // About Me Img
        document.querySelector("#about-details img").src =
          "./img/programmer.jpg";
        // Flicker
        flicker.style.setProperty("transform", "translateX(25px)");
        document.getElementById("mode-text").textContent = "Go To Light";
        // Form Submit Button
        document
          .getElementById("btn-form-submit")
          .style.setProperty("background", "white");
        document
          .getElementById("btn-form-submit")
          .style.setProperty("color", "black");
      }
    },
    switchMode: function () {
      currentMode = !currentMode;
      localStorage.setItem("portfolioMode", JSON.stringify(currentMode));
    },
  };
})();

mode.initMode();

// // Listsener
document.addEventListener("scroll", navMenu.moveSlider);
UIModeSwitch.addEventListener("click", () => {
  mode.switchMode();
  mode.initMode();
});
UIMinorProjectsHeader.addEventListener("click", minorProjects.expand);
UIContactForm.addEventListener("submit", form.validation);
