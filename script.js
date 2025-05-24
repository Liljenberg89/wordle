const getWordle = (event) => {
  let wordle = [];
  event.preventDefault();
  const input = document.querySelector(".input").value;
  wordle.push(input);
  const newWordle = wordle[0].split(" ");

  console.log(newWordle);

  playField(newWordle);
};

const playField = (newWordle) => {
  console.log(newWordle.length);
  const container = document.querySelector(".container");
  container.style.setProperty(
    "grid-template-columns",
    `repeat(${newWordle.length}, 60px)`
  );

  const x = 6;

  for (let i = 0; i < x; i++) {
    for (let a = 0; a < newWordle.length; a++) {
      const box = document.createElement("div");
      box.classList.add("box");
      container.appendChild(box);
    }
  }
};
