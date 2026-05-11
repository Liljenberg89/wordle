import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState<string>("start");
  const [wordle, setWordle] = useState<string[]>([]);
  const [activeRow, setActiveRow] = useState<number[]>([0]);
  const [guess, setGuess] = useState<string>("");
  const [correct, setCorrect] = useState<any>([]);
  const [guesses, setGuesses] = useState<any>({});
  const [num, setNum] = useState(0);

  const getRandomWord = async () => {
    /* const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1&diff=2&length=5",
    );

    if (!response.ok) {
      console.log("error");
    }
    const data = await response.json();
    console.log(data);

    setWordle(data[0].split(""));
    */
    setWordle("HEJSA".split(""));

    setState("game");
  };

  const Playfield = () => {
    return (
      <div className="playfield">
        <div className="playfield-box">
          {[0, 1, 2, 3, 4].map((row) =>
            wordle.map((_, col: any) => (
              <div
                className={correct.includes(col) ? "tile green" : "tile"}
                data-col={col}
                data-row={row}
              >
                {guesses[row] ? guesses[row] : ""}
              </div>
            )),
          )}
        </div>
        <KeyBoard />
        <button onClick={() => console.log(guesses)}>hej</button>
      </div>
    );
  };

  useEffect(() => {
    console.log(guess);

    Playfield();
  }, [guess]);

  const checkWin = () => {
    setGuesses((prev: any) => ({ ...prev, [num]: guess }));
    setNum((prev) => prev + 1);
    setGuess("");
    for (let i = 0; i < wordle.length; i++) {
      console.log(i);
      if (guess[i] === wordle[i]) {
        setCorrect((prev: any) => [...prev, i]);
      }
    }
  };

  const KeyBoard = () => {
    const keys1: any = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: any = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["DELETE", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];

    const addKey = (key: any) => {
      if (key === "ENTER" && guess.length === 5) {
        checkWin();
        return;
      }
      if (key === "DELETE") {
        setGuess((prev) => prev.slice(0, -1));
        return;
      }
      if (guess.length <= 4 && key !== "ENTER") {
        setGuess((prev) => prev + key);
      }
    };

    return (
      <div>
        <div className="keyboard">
          <div className="keyboard-rows">
            {keys1.map((key: any, index: any) => (
              <div className="key" datatype={index} onClick={() => addKey(key)}>
                {key}
              </div>
            ))}
          </div>
          <div className="keyboard-rows">
            {keys2.map((key: any) => (
              <div className="key" onClick={() => addKey(key)}>
                {key}
              </div>
            ))}{" "}
          </div>
          <div className="keyboard-rows">
            {keys3.map((key: any) => (
              <div className="key" onClick={() => addKey(key)}>
                {key}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Home = () => {
    return (
      <>
        <div className="container">
          <h1>Ultimate WORDLE</h1>
          <p>Kan du knäcka ordet?</p>
          <p>Klicka start för att spela.</p>

          <div className="button-box">
            <button onClick={getRandomWord}>
              <h2>Start</h2>
            </button>
          </div>
        </div>
      </>
    );
  };
  if (state == "start") {
    return <Home />;
  } else {
    return (
      <div>
        <Playfield />;
      </div>
    );
  }
}

export default App;
