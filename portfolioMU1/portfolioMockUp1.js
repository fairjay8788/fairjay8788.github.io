class Mode {
  constructor() {
    if (localStorage.getItem("mode") === "dk") {
      this.status = "dk";
    } else {
      this.status = "lt";
    }
    this.saveMode();
    this.showMode();
  }
  saveMode() {
    localStorage.setItem("mode", this.status);
  }
  showMode() {
    if (this.status === "lt") {
      document.body.style.color = "black";
      document.body.style.background = "#eee";
      document.querySelectorAll(".dk-border").forEach(function (ele) {
        ele.classList.remove("dk-border");
        ele.classList.add("lt-border");
      });
      document.querySelectorAll(".dk-shadow").forEach(function (ele) {
        ele.classList.remove("dk-shadow");
        ele.classList.add("lt-shadow");
      });
      document.querySelectorAll(".dk-secondary-shadow").forEach(function (ele) {
        ele.classList.remove("dk-secondary-shadow");
        ele.classList.add("lt-secondary-shadow");
      });
      document.querySelectorAll(".dk-primary-bg").forEach(function (ele) {
        ele.classList.remove("dk-primary-bg");
        ele.classList.add("lt-primary-bg");
      });
      document.querySelectorAll(".dk-secondary-bg").forEach(function (ele) {
        ele.classList.remove("dk-secondary-bg");
        ele.classList.add("lt-secondary-bg");
      });
      document.querySelectorAll(".dk-color").forEach(function (ele) {
        ele.classList.remove("dk-color");
        ele.classList.add("lt-color");
      });
      document.querySelectorAll(".dk-btn").forEach(function (ele) {
        ele.classList.remove("dk-btn");
        ele.classList.add("lt-btn");
      });
    }
    if (this.status === "dk") {
      document.body.style.color = "white";
      document.body.style.background = "#111";
      document.querySelectorAll(".lt-border").forEach(function (ele) {
        ele.classList.remove("lt-border");
        ele.classList.add("dk-border");
      });
      document.querySelectorAll(".lt-shadow").forEach(function (ele) {
        ele.classList.remove("lt-shadow");
        ele.classList.add("dk-shadow");
      });
      document.querySelectorAll(".lt-secondary-shadow").forEach(function (ele) {
        ele.classList.remove("lt-secondary-shadow");
        ele.classList.add("dk-secondary-shadow");
      });
      document.querySelectorAll(".lt-primary-bg").forEach(function (ele) {
        ele.classList.remove("lt-primary-bg");
        ele.classList.add("dk-primary-bg");
      });
      document.querySelectorAll(".lt-secondary-bg").forEach(function (ele) {
        ele.classList.remove("lt-secondary-bg");
        ele.classList.add("dk-secondary-bg");
      });
      document.querySelectorAll(".lt-color").forEach(function (ele) {
        ele.classList.remove("lt-color");
        ele.classList.add("dk-color");
      });
      document.querySelectorAll(".lt-btn").forEach(function (ele) {
        ele.classList.remove("lt-btn");
        ele.classList.add("dk-btn");
      });
    }
  }
}

const mode = new Mode();

const ltBtn = document.querySelector(".light-mode");
const dkBtn = document.querySelector(".dark-mode");

ltBtn.addEventListener("click", switchMode);
dkBtn.addEventListener("click", switchMode);

function switchMode(e) {
  if (e.target === ltBtn) {
    if (mode.status === "dk") {
      mode.status = "lt";
      mode.saveMode();
      mode.showMode();
    }
  } else if (e.target === dkBtn) {
    if (mode.status === "lt") {
      mode.status = "dk";
      mode.saveMode();
      mode.showMode();
    }
  }
}
