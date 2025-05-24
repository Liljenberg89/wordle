let wordle = [];

let trys = 0;

const getWordle = (event) => {
  event.preventDefault();
  const input = document.querySelector(".input");
  wordle.push(input.value.toLowerCase().split(""));

  console.log(wordle[0]);
  document.querySelector("#form").classList.add("hide");
  playField();
};

const playField = () => {
  console.log(wordle[0].length);
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
      container.appendChild(box);
    }
  }
  const userGuess = document.createElement("input");
  userGuess.classList.add("userGuess");
  const submitGuess = document.createElement("button");
  submitGuess.innerHTML = "Submit";

  submitGuess.addEventListener("click", () => {
    checkWordle(userGuess.value);
  });

  container.appendChild(userGuess);
  container.appendChild(submitGuess);
};

const checkWordle = (userGuess) => {
  console.log("guess: ", userGuess);
  let guess = [];
  guess.push(userGuess.toLowerCase().split(""));
  console.log(guess[0]);
  if (guess[0].length !== wordle[0].length) {
    console.log("fel");
  } else {
    console.log("rätt");
  }
};
