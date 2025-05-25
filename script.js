import { data } from "./api.js";
const options = document.querySelectorAll("li");
const questionUI = document.querySelector("#question");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const mark = document.querySelector("mark");
const desc = document.querySelector(".desc");

next.disabled = true;

let count = 0;
let rightAns;

// Render the questions in UI
function handleShowQustionAns() {
  const currData = data[count];
  const { id, question, correct_answer, incorrect_answers, description } =
    currData;
  removeAllEvents();
  questionUI.innerHTML = `${id}. ${question}`;
  rightAns = correct_answer;
  incorrect_answers.push(correct_answer);
  incorrect_answers.sort();
  for (let i = 0; i < incorrect_answers.length; i++) {
    options[i].innerHTML = incorrect_answers[i];
  }
  mark.innerHTML = description;
  desc.style.display = "none";
  count++;
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
