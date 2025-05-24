const playField = () => {
  const container = document.querySelector(".container");

  const x = 6;
  const y = 5;

  for (let i = 0; i < x; i++) {
    for (let a = 0; a < y; a++) {
      const box = document.createElement("div");
      box.classList.add("box");
      container.appendChild(box);
    }
  }
};

playField();
