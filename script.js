import { data } from "./api.js";
const options = document.querySelectorAll("li");
const questionUI = document.querySelector("#question");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const mark = document.querySelector("mark");
const desc = document.querySelector(".desc");
const container = document.querySelector(".container");
const wrongSound = new Audio("Assets/wrong.mp3");

next.disabled = true;

let questionCount = 1;
let rightAns;
const trackQuestion = [];

function getRandomIdxBetween0And200() {
  return Math.floor(Math.random() * 201); //201
}

// Render the questions in UI
function handleShowQustionAns() {
  const currData = data[getRandomIdxBetween0And200()];
  const { id, question, correct_answer, incorrect_answers, description } =
    currData;
  if (trackQuestion.length === data.length) {
    container.innerHTML = `<h2 align="center">You are done🫡</h2>`;
    return;
  }
  if (trackQuestion.includes(id)) {
    handleShowQustionAns();
  } else {
    trackQuestion.push(id);
    removeAllEvents();
    questionUI.innerHTML = `${questionCount}. ${question}`;
    questionCount++;
    rightAns = correct_answer;
    incorrect_answers.push(correct_answer);
    incorrect_answers.sort();
    for (let i = 0; i < incorrect_answers.length; i++) {
      options[i].innerHTML = incorrect_answers[i];
    }
    mark.innerHTML = description;
    desc.style.display = "none";
  }
}

function removeAllEvents() {
  next.disabled = true;
  options.forEach((ele) => {
    ele.style.pointerEvents = "all";
    ele.style.backgroundColor = "rgb(19, 18, 18)";
  });
}

// Check the right and wrong answer
options.forEach((lists) => {
  lists.addEventListener("click", (e) => {
    if (e.target.innerHTML === rightAns) {
      e.target.style.backgroundColor = "green";
      desc.style.display = "block";
      disabledAllOptions();
      next.disabled = false;
    } else {
      e.target.style.backgroundColor = "red";
      if (navigator.vibrate) {
        // Vibration API is supported
        navigator.vibrate(500);
      } else {
        // Vibration API is not supported
        console.log("Vibration API is not supported on this device.");
      }
      options.forEach((list) => {
        if (list.innerHTML === rightAns) {
          list.style.backgroundColor = "green";
          desc.style.display = "block";
          disabledAllOptions();
          next.disabled = false;
        } else {
          disabledAllOptions();
          next.disabled = false;
        }
      });
    }
  });
});

// Disabled all lists
function disabledAllOptions() {
  options.forEach((ele) => {
    ele.style.pointerEvents = "none";
  });
}

next.addEventListener("click", handleShowQustionAns);
// prev.addEventListener("click", showPrevQuestion);

handleShowQustionAns();
