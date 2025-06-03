let wordle = [];
let guess = [];
let trys = 0;

const getWordle = (event) => {
  event.preventDefault();
  const input = document.querySelector(".input");
  wordle.push(input.value.toUpperCase().split(""));

  document.querySelector("#form").classList.add("hide");
  playField();
};

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
  console.log("guess: ", guess);
  console.log("wordle: ", wordle[0]);

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === wordle[0][i]) {
      const correct = document.querySelector(`[col="${i}"]`);
      correct.style.backgroundColor = "green";
    } else {
      console.log("fel");
    }
    const showGuess = document.querySelector(`[col="${i}"]`);
    showGuess.innerHTML = guess[i];
  }
  /*
  let guess = [];
  guess.push(userGuess.toLowerCase().split(""));
  console.log(guess[0]);
  if (guess[0].length !== wordle[0].length) {
    console.log("fel");
  } else {
    console.log("rätt");
  }
    */
};
