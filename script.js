let wordle = ["HEJ"];
let guess = [];
let correctCount = [];
let trys = 0;
/*
const getWordle = (event) => {
  event.preventDefault();
  const input = document.querySelector(".input");
  wordle.push(input.value.toUpperCase().split(""));

  document.querySelector("#form").classList.add("hide");
  playField();
};
*/

const playField = () => {
  const container = document.querySelector(".container");
  container.style.setProperty(
    "grid-template-columns",
    `repeat(${wordle[0].length}, 60px)`
  );

  const x = 6;

  for (let i = 0; i < x; i++) {
    for (let a = 0; a < wordle[0].length; a++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.setAttribute("row", i);
      box.setAttribute("col", a);

      container.appendChild(box);
    }
  }
  for (let i = 0; i < wordle[0].length; i++) {
    const userGuess = document.createElement("input");
    userGuess.classList.add("userGuess");
    userGuess.id = i;
    container.appendChild(userGuess);
  }

  const submitGuess = document.createElement("button");
  submitGuess.innerHTML = "Submit";
  container.appendChild(submitGuess);

  submitGuess.addEventListener("click", () => {
    for (let i = 0; i < wordle[0].length; i++) {
      const value = document.getElementById(i).value.toUpperCase();
      guess.push(value);
    }
    checkWordle(guess);
  });
};

const checkWordle = (guess) => {
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === wordle[0][i]) {
      correctCount.push(guess[i]);
      const correct = document.querySelector(`[col="${i}"][row="${trys}"]`);
      correct.style.backgroundColor = "green";
      const hide = document.getElementById(i);
      hide.style.visibility = "hidden";
    } else if (wordle[0].includes(guess[i])) {
      const almostCorrect = document.querySelector(
        `[col="${i}"][row="${trys}"]`
      );
      almostCorrect.style.backgroundColor = "orange";
    } else {
      console.log("fel");
    }
    const showGuess = document.querySelector(`[col="${i}"][row="${trys}"]`);
    showGuess.innerHTML = guess[i];
  }
  trys++;
  checkWin();
};

const checkWin = () => {
  console.log("guess: ", guess);
  console.log("wordle: ", wordle[0]);
  console.log("correct: ", correctCount);
  if (correctCount.length === wordle[0].length) {
    console.log("Du vann!");
  }
  correctCount.length = 0;
  guess.length = 0;
};
playField();
