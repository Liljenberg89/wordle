import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState<string>("start");
  const [wordle, setWordle] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [correct, setCorrect] = useState<any>({});
  const [semiCorrect, setSemiCorrect] = useState<any>({});
  const [guesses, setGuesses] = useState<any>({});
  const [num, setNum] = useState(0);
  const [ok, setOk] = useState(true);

  const getRandomWord = async () => {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1&diff=1&length=5",
    );

    if (!response.ok) {
      console.log("error");
    }
    const data = await response.json();

    setWordle(data[0].toUpperCase().split(""));
    console.log(data);
    setState("game");
  };

  const Field = () => {
    return (
      <div className="playfield-box">
        {[0, 1, 2, 3, 4].map((row) =>
          wordle.map((_, col: any) => (
            <div
              className={
                correct[row]?.includes(col)
                  ? "tile green"
                  : semiCorrect[row]?.includes(col)
                    ? "tile yellow"
                    : "tile"
              }
              data-col={col}
              data-row={row}
            >
              {guesses[row]
                ? guesses[row][col]
                : !guesses[row] && num === row
                  ? guess[col]
                  : ""}
            </div>
          )),
        )}
      </div>
    );
  };

  const Playfield = () => {
    return (
      <div className="playfield">
        <Field />
        <KeyBoard />
      </div>
    );
  };

  const GameOver = () => {
    return (
      <div className="playfield">
        <Field />

        <div>
          {ok ? (
            <h1>Grattis! Du listade ut ordet!</h1>
          ) : (
            <h1>Tyvärr! Du listade inte ut ordet... {wordle}</h1>
          )}
          <button>Restart</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    Playfield();
  }, [guess]);

  const gameLoop = () => {
    setGuesses((prev: any) => ({ ...prev, [num]: guess.split("") }));
    setNum((prev) => prev + 1);
    setGuess("");
    let curr: any = [];
    let semiCurr: any = [];

    for (let i = 0; i < wordle.length; i++) {
      if (guess[i] === wordle[i]) {
        curr.push(i);
        if (curr.length !== 5) continue;
      } else if (wordle.includes(guess[i])) {
        semiCurr.push(i);
      }
      if (curr.length !== 0) {
        setCorrect((prev: any) => ({ ...prev, [num]: curr }));
        if (curr.length === 5) {
          setState("gameOver");
          return;
        }
      }
      if (semiCurr.length !== 0) {
        setSemiCorrect((prev: any) => ({ ...prev, [num]: semiCurr }));
      }
    }
    if (num === 4) {
      setOk((prev) => !prev);
      setState("gameOver");
    }
  };

  const KeyBoard = () => {
    const keys1: any = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: any = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["DELETE", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];

    const addKey = (key: any) => {
      if (key === "ENTER" && guess.length === 5) {
        gameLoop();
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
        <div className="home-container">
          <div className="info-text">
            <h1>Välkommen till Filips wordle</h1>
            <p>
              Kan du knäcka ordet på fem försök? <br /> Klicka start för att
              spela.
            </p>

            <div className="button-box">
              <button className="start-btn" onClick={getRandomWord}>
                <h2>Start</h2>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  if (state === "start") return <Home />;
  if (state === "game") return <Playfield />;
  if (state === "gameOver") return <GameOver />;
}

export default App;
