// Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]', { speed: 800 });

// Class
class NavMenu {
  constructor() {
    this.liCollection = Array.from(document.querySelectorAll("#nav-menu li"));
    this.slider = document.getElementById("nav-slider");
    this.currentLiIndex = 0;
  }
  moveSlider = (e) => {
    const clickedIndex = this.liCollection.indexOf(e.target.parentElement);
    if (clickedIndex > this.currentLiIndex) {
      // click some link on the right side
      this.slider.style.setProperty(
        "right",
        `${320 - (clickedIndex + 1) * 80}px`
      );
      setTimeout(() => {
        this.slider.style.setProperty("left", `${clickedIndex * 80}px`);
      }, 500);
      // update current index
      this.currentLiIndex = clickedIndex;
    } else if (clickedIndex < this.currentLiIndex) {
      // click some link on the left side
      this.slider.style.setProperty("left", `${clickedIndex * 80}px`);
      setTimeout(() => {
        this.slider.style.setProperty(
          "right",
          `${320 - (clickedIndex + 1) * 80}px`
        );
      }, 500);
      // update current index
      this.currentLiIndex = clickedIndex;
    }
  };
}

class Mode {
  constructor() {
    // false = light mode ; true = dark mode
    this.mode = JSON.parse(localStorage.getItem("portfolioMode"))
      ? true
      : false;
    this.switch = document.getElementById("switch-wrap");
    // querySelectorAll returns static(not live) NodeList
    this.prBgChangeNodeList = document.querySelectorAll(".lt-primary-bg");
    this.seBgChangeNodeList = document.querySelectorAll(".lt-secondary-bg");
    this.prColorChangeNodeList = document.querySelectorAll(".lt-primary-color");
  }

  changeMode = () => {
    this.mode = !this.mode;
    localStorage.setItem("portfolioMode", JSON.stringify(this.mode));
    this.paintMode(this.mode);
  };

  paintMode(m) {
    if (JSON.parse(localStorage.getItem("portfolioMode")) !== null) {
      this.flickSwitch(m);
      if (m) {
        // Dark Mode
        this.prBgChangeNodeList.forEach((e) => {
          e.classList.remove("lt-primary-bg");
          e.classList.add("dk-primary-bg");
        });
        this.seBgChangeNodeList.forEach((e) => {
          e.classList.remove("lt-secondary-bg");
          e.classList.add("dk-secondary-bg");
        });
        this.prColorChangeNodeList.forEach((e) => {
          e.classList.remove("lt-primary-color");
          e.classList.add("dk-primary-color");
        });
        // Take care of special styles
        document.getElementById("showcase").classList.remove("lt-showcase-bg");
        document.getElementById("showcase").classList.add("dk-showcase-bg");
      } else {
        // Light Mode
        this.prBgChangeNodeList.forEach((e) => {
          e.classList.remove("dk-primary-bg");
          e.classList.add("lt-primary-bg");
        });
        this.seBgChangeNodeList.forEach((e) => {
          e.classList.remove("dk-secondary-bg");
          e.classList.add("lt-secondary-bg");
        });
        this.prColorChangeNodeList.forEach((e) => {
          e.classList.remove("dk-primary-color");
          e.classList.add("lt-primary-color");
        });
        // Take care of special styles
        document.getElementById("showcase").classList.remove("dk-showcase-bg");
        document.getElementById("showcase").classList.add("lt-showcase-bg");
      }
    }
  }

  flickSwitch = (m) => {
    if (m) {
      // Dark Mode
      this.switch
        .querySelector(".wrapper")
        .style.setProperty("transform", "translateX(25px)");
      document.getElementById("mode-text").textContent = "Go To Light";
    } else {
      // Light Mode
      this.switch
        .querySelector(".wrapper")
        .style.setProperty("transform", "translateX(0)");
      document.getElementById("mode-text").textContent = "Go To Dark";
    }
  };
}
// Init class
const navMenu = new NavMenu();
const mode = new Mode();
// Apply mode saved in LocalStorage
mode.paintMode(mode.mode);

// UI
const UINavMenu = document.getElementById("nav-menu");
const UIModeSwitch = document.getElementById("switch-wrap");

// Listsener
UINavMenu.addEventListener("click", navMenu.moveSlider);
UIModeSwitch.addEventListener("click", mode.changeMode);
