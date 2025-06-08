import { data } from "./api.js";
const options = document.querySelectorAll("li");
const questionUI = document.querySelector("#question");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const mark = document.querySelector("mark");
const desc = document.querySelector(".desc");
const container = document.querySelector(".container");

next.disabled = true;

let questionCount = 0;
let rightAns;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const shuffled = shuffleArray(data);
let idx = -1;

// Render the questions in UI
function handleShowQustionAns() {
  prev.disabled = false;
  idx++;
  questionCount++;
  const currData = shuffled[idx];
  const { id, question, correct_answer, incorrect_answers, description } =
    currData;
  if (idx === data.length) {
    container.innerHTML = `<h2 align="center">You are crazy🫡</h2>`;
    return;
  }
  removeAllEvents();

  questionUI.innerHTML = `${questionCount}. ${question}`;

  rightAns = correct_answer;
  if (incorrect_answers.length < 4) {
    incorrect_answers.push(correct_answer);
    incorrect_answers.sort();
  }
  for (let i = 0; i < incorrect_answers.length; i++) {
    options[i].innerHTML = incorrect_answers[i];
  }
  mark.innerHTML = description;
  desc.style.display = "none";
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

function showPrevQuestion() {
  idx--;
  if (idx === 0) {
    prev.disabled = true;
  }
  questionCount = questionCount - 1;
  const currData = shuffled[idx];
  const { id, question, correct_answer, incorrect_answers, description } =
    currData;

  removeAllEvents();
  questionUI.innerHTML = `${questionCount}. ${question}`;
  rightAns = correct_answer;
  for (let i = 0; i < incorrect_answers.length; i++) {
    options[i].innerHTML = incorrect_answers[i];
  }
  mark.innerHTML = description;
  desc.style.display = "none";
}

next.addEventListener("click", handleShowQustionAns);
prev.addEventListener("click", showPrevQuestion);

handleShowQustionAns();
prev.disabled = true;
