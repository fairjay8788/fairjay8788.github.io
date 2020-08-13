// UI
const UINavMenu = document.getElementById("nav-menu");
const UIModeSwitch = document.getElementById("switch-wrap");
const UIMinorProjectsHeader = document.querySelector(".minor-projects-header");
const UIContactForm = document.getElementById("contact-form");

// Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]', { speed: 800 });

// NavMenu Module
const navMenu = (function () {
  const liCollection = Array.from(document.querySelectorAll("#nav-menu li"));
  const slider = document.getElementById("nav-slider");
  let currentLiIndex = 0;
  return {
    moveSlider: function (e) {
      const clickedIndex = liCollection.indexOf(e.target.parentElement);
      if (clickedIndex > currentLiIndex) {
        // click some link on the right side
        slider.style.setProperty("right", `${320 - (clickedIndex + 1) * 80}px`);
        setTimeout(() => {
          slider.style.setProperty("left", `${clickedIndex * 80}px`);
        }, 500);
        // update current index
        currentLiIndex = clickedIndex;
      } else if (clickedIndex < currentLiIndex) {
        // click some link on the left side
        slider.style.setProperty("left", `${clickedIndex * 80}px`);
        setTimeout(() => {
          slider.style.setProperty(
            "right",
            `${320 - (clickedIndex + 1) * 80}px`
          );
        }, 500);
        // update current index
        currentLiIndex = clickedIndex;
      }
    },
  };
})();

// Minor Projects Expand Module

const minorProjects = (function () {
  let isExpanded = false;
  const minorProjectsMain = document.querySelector(".minor-projects-main");
  const chevronUp = document.querySelector(
    ".minor-projects-header .fa-chevron-up"
  );
  // Get the target height to expand to and then hide the block
  const targetHeight = minorProjectsMain.getBoundingClientRect().height;
  minorProjectsMain.style.setProperty("height", "0");
  minorProjectsMain.style.setProperty("opacity", "0");
  return {
    expand: function () {
      if (!isExpanded) {
        // Expand to target height
        minorProjectsMain.style.setProperty("height", `${targetHeight}px`);
        minorProjectsMain.style.setProperty("opacity", "1");
        chevronUp.style.setProperty("transform", "rotate(180deg)");
        isExpanded = true;
      } else {
        minorProjectsMain.style.setProperty("height", "0");
        minorProjectsMain.style.setProperty("opacity", "0");
        chevronUp.style.setProperty("transform", "rotate(0)");
        isExpanded = false;
      }
    },
  };
})();

// Contact Form Submission Module

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
  const successMsg = document.getElementById("success-msg");
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
      successMsg.style.opacity = "1";
      setTimeout(() => {
        successMsg.style.opacity = "0";
      }, 3000);
    },
  };
})();

// Mode State (implement state pattern / not best pattern in this case, just practice)

class lightMode {
  constructor(controller) {
    this.ctrl = controller;
  }
  paintMode() {
    this.ctrl.prBgChangeNodeList.forEach((ele) => {
      ele.classList.remove("dk-primary-bg");
      ele.classList.add("lt-primary-bg");
    });
    this.ctrl.seBgChangeNodeList.forEach((ele) => {
      ele.classList.remove("dk-secondary-bg");
      ele.classList.add("lt-secondary-bg");
    });
    this.ctrl.prColorChangeNodeList.forEach((ele) => {
      ele.classList.remove("dk-primary-color");
      ele.classList.add("lt-primary-color");
    });
    // Take care of special styles
    // Showcase Background
    document.getElementById("showcase").classList.remove("dk-showcase-bg");
    document.getElementById("showcase").classList.add("lt-showcase-bg");
    // Luminous Text
    this.ctrl.glowTextNodeList.forEach((ele) => {
      ele.classList.remove("glowing");
    });
    //  About Me Img
    document.querySelector("#about-details img").src = "./img/aboutme.jpg";
    // Flicker
    this.ctrl.flicker.style.setProperty("transform", "translateX(0)");
    document.getElementById("mode-text").textContent = "Go To Dark";
    // Form Submit Button
    document
      .getElementById("btn-form-submit")
      .style.setProperty("background", "black");
    document
      .getElementById("btn-form-submit")
      .style.setProperty("color", "white");
  }
  next() {
    this.ctrl.currentMode = new darkMode(this.ctrl);
    localStorage.setItem("portfolioMode", "dark");
  }
}

class darkMode {
  constructor(controller) {
    this.ctrl = controller;
  }
  paintMode() {
    this.ctrl.prBgChangeNodeList.forEach((ele) => {
      ele.classList.remove("lt-primary-bg");
      ele.classList.add("dk-primary-bg");
    });
    this.ctrl.seBgChangeNodeList.forEach((ele) => {
      ele.classList.remove("lt-secondary-bg");
      ele.classList.add("dk-secondary-bg");
    });
    this.ctrl.prColorChangeNodeList.forEach((ele) => {
      ele.classList.remove("lt-primary-color");
      ele.classList.add("dk-primary-color");
    });
    // Take care of special styles
    // Showcase Background
    document.getElementById("showcase").classList.remove("lt-showcase-bg");
    document.getElementById("showcase").classList.add("dk-showcase-bg");
    // Luminous Text
    this.ctrl.glowTextNodeList.forEach((ele) => {
      ele.classList.add("glowing");
    });
    // About Me Img
    document.querySelector("#about-details img").src = "./img/programmer.jpg";
    // Flicker
    this.ctrl.flicker.style.setProperty("transform", "translateX(25px)");
    document.getElementById("mode-text").textContent = "Go To Light";
    // Form Submit Button
    document
      .getElementById("btn-form-submit")
      .style.setProperty("background", "white");
    document
      .getElementById("btn-form-submit")
      .style.setProperty("color", "black");
  }
  next() {
    this.ctrl.currentMode = new lightMode(this.ctrl);
    localStorage.setItem("portfolioMode", "light");
  }
}

class modeCtrl {
  constructor() {
    this.currentMode =
      localStorage.getItem("portfolioMode") === "dark"
        ? new darkMode(this)
        : new lightMode(this);
    // querySelectorAll returns static(not live) NodeList
    this.prBgChangeNodeList = document.querySelectorAll(".lt-primary-bg");
    this.seBgChangeNodeList = document.querySelectorAll(".lt-secondary-bg");
    this.prColorChangeNodeList = document.querySelectorAll(".lt-primary-color");
    this.glowTextNodeList = document.querySelectorAll(".luminousText");
    this.flicker = document.querySelector("#switch-wrap .wrapper");
  }
  initMode = () => {
    this.currentMode.paintMode();
  };
  switchMode = () => {
    this.currentMode.next();
    this.currentMode.paintMode();
  };
}

// Init class
const mode = new modeCtrl();
mode.initMode();

// Listsener
UINavMenu.addEventListener("click", navMenu.moveSlider);
UIModeSwitch.addEventListener("click", mode.switchMode);
UIMinorProjectsHeader.addEventListener("click", minorProjects.expand);
UIContactForm.addEventListener("submit", form.validation);
