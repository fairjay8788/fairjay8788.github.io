// UI variables

const figure1 = document.getElementById("fig1");
const figure2 = document.getElementById("fig2");
const figure3 = document.getElementById("fig3");
const figure4 = document.getElementById("fig4");

const form = document.getElementById("num-input");
const submit = document.getElementById("confirm");
const restart = document.getElementById("restart");
const hint = document.getElementById("hint");

const introSlides = document.getElementById("intro-wrap");
const left = document.getElementById("left");
const right = document.getElementById("right");

// Event Listeners
figure1.addEventListener("keyup", handleInput);
figure2.addEventListener("keyup", handleInput);
figure3.addEventListener("keyup", handleInput);
figure4.addEventListener("keyup", handleInput);
form.addEventListener("submit", formSubmit);
form.addEventListener("reset", restartGame);
hint.addEventListener("click", showHint);
right.addEventListener("click", slideToRight);

// Variables
const allowedString = "0123456789";
let answer = generateRandom();
console.log("The answer is " + answer);
let chances = 10;

// Functions
function generateRandom() {
  let ans = Math.floor(Math.random() * 9900 + 100).toString();
  if (ans.length === 3) {
    ans = "0" + ans;
  }
  for (let i = 0; i < 4; i++) {
    if (ans.indexOf(ans[i]) !== ans.lastIndexOf(ans[i])) {
      return generateRandom();
    }
  }
  return ans;
}

function handleInput(e) {
  const val = e.target.value.trim();
  if (allowedString.includes(val) && val.length < 2) {
    if (val === "") {
      e.target.value = val;
    } else {
      if (e.target === figure4) {
        figure1.focus();
      } else {
        e.target.nextElementSibling.focus();
      }
    }
  } else {
    alert("Please enter one digit!");
    e.target.value = "";
  }
}

function formSubmit(e) {
  e.preventDefault();
  const guess = figure1.value + figure2.value + figure3.value + figure4.value;
  if (guess.length !== 4) {
    alert("Please check your input!");
  } else {
    for (let i = 0; i < 4; i++) {
      if (guess.indexOf(guess[i]) !== guess.lastIndexOf(guess[i])) {
        alert("Please eliminate duplicate digits!");
        return;
      }
    }
    figure1.value = figure1.getAttribute("disabled") ? figure1.value : "";
    figure2.value = figure2.getAttribute("disabled") ? figure2.value : "";
    figure3.value = figure3.getAttribute("disabled") ? figure3.value : "";
    figure4.value = figure4.getAttribute("disabled") ? figure4.value : "";
    document.querySelectorAll(".figure:enabled")[0].focus();

    compare(guess);
  }
}

function compare(guess) {
  let a = 0;
  let b = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (guess[j] === answer[i]) {
        if (j === i) {
          a++;
        } else {
          b++;
        }
      }
    }
  }
  let li = document.createElement("LI");
  li.textContent = `${guess} - ${a}A${b}B`;
  document.getElementById("history").appendChild(li);
  if (a === 4) {
    document.querySelector(".message").classList.add("message-g");
    document.querySelector(".message").textContent =
      "Congratulations! You guessed it!!!";
    document.querySelectorAll(".figure").forEach(function (inputEL, key) {
      inputEL.value = answer[key];
      inputEL.setAttribute("disabled", "disabled");
    });
    submit.setAttribute("disabled", "disabled");
    hint.setAttribute("disabled", "disabled");
    hint.removeEventListener("click", showHint);
    form.removeEventListener("submit", formSubmit);
    return;
  } else if (a + b === 4 || a === 3) {
    li.innerHTML += "<br>Almost there...";
  }
  chances--;
  if (chances === 0) {
    document.querySelector(".message").classList.add("message-r");
    document.querySelector(".message").textContent =
      "Too bad!! You failed. Let's try again!";
    document.querySelectorAll(".figure").forEach(function (inputEL, key) {
      inputEL.value = answer[key];
      inputEL.setAttribute("disabled", "disabled");
    });
    submit.setAttribute("disabled", "disabled");
    hint.setAttribute("disabled", "disabled");
    hint.removeEventListener("click", showHint);
    form.removeEventListener("submit", formSubmit);
    return;
  } else if (chances === 1) {
    document.querySelector(".message").textContent = "LAST CHANCE!!";
  } else {
    document.querySelector(".message").textContent = `${chances} Chances Left!`;
  }
}

function showHint(e) {
  const i = Math.floor(Math.random() * 4 + 1);
  document.querySelector(`input.figure:nth-child(${i})`).value = answer[i - 1];
  document
    .querySelector(`input.figure:nth-child(${i})`)
    .setAttribute("disabled", "disabled");
  document.querySelectorAll(".figure:enabled")[0].focus();
  e.target.setAttribute("disabled", "disabled");
  e.target.removeEventListener("click", showHint);
}

function restartGame(e) {
  e.preventDefault();
  if (confirm("Are you sure to start a new game?")) {
    answer = generateRandom();
    console.log("The answer is " + answer);
    document.getElementById("history").innerHTML = "";
    document.querySelectorAll(".figure").forEach(function (inputEL) {
      inputEL.value = "";
      inputEL.removeAttribute("disabled");
    });
    hint.removeAttribute("disabled");
    submit.removeAttribute("disabled");
    hint.addEventListener("click", showHint);
    form.addEventListener("submit", formSubmit);
    document.querySelector(".message").className = "message";
    document.querySelector(".message").textContent = "You Have 10 Chances.";
    chances = 10;
  }
}

function slideToRight() {
  let currentSlide = document.querySelector("#intro-wrap .current");
  let slides = Array.from(
    document.querySelectorAll("#intro-wrap .intro-piece")
  );
  let i = slides.indexOf(currentSlide);
  introSlides.style.setProperty("left", `calc(-${i + 1}00% - ${i + 1}rem)`);
  currentSlide.classList.remove("current");
  currentSlide.nextElementSibling.classList.add("current");
  if (currentSlide.nextElementSibling === slides[slides.length - 1]) {
    right.className = "end";
    right.removeEventListener("click", slideToRight);
  }
  if (currentSlide === slides[0]) {
    left.className = "";
    left.addEventListener("click", slideToLeft);
  }
}

function slideToLeft() {
  let currentSlide = document.querySelector("#intro-wrap .current");
  let slides = Array.from(
    document.querySelectorAll("#intro-wrap .intro-piece")
  );
  let i = slides.indexOf(currentSlide);
  introSlides.style.setProperty("left", `calc(-${i - 1}00% - ${i - 1}rem)`);
  currentSlide.classList.remove("current");
  currentSlide.previousElementSibling.classList.add("current");
  if (currentSlide.previousElementSibling === slides[0]) {
    left.className = "end";
    left.removeEventListener("click", slideToLeft);
  }
  if (currentSlide === slides[slides.length - 1]) {
    right.className = "";
    right.addEventListener("click", slideToRight);
  }
}
