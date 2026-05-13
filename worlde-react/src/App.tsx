import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState<string>("start");
  const [wordle, setWordle] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [correct, setCorrect] = useState<Record<any, any>>({});
  const [semiCorrect, setSemiCorrect] = useState<Record<any, any>>({});
  const [guesses, setGuesses] = useState<Record<string, any>>({});
  const [num, setNum] = useState<number>(0);
  const [ok, setOk] = useState<boolean>(true);

  const getRandomWord = async () => {
    /*const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1&diff=1&length=5",
    );
    if (!response.ok) {
      console.log("error");
    }
    const data = await response.json();
    setWordle(data[0].toUpperCase().split(""));
    */
    setWordle("FLASH".split(""));
    setState("game");
  };

  const Field = () => {
    return (
      <div className="playfield-box">
        {[0, 1, 2, 3, 4].map((row) =>
          wordle.map((_, col: number) => (
            <div
              className={
                num == row
                  ? "tile active-row"
                  : correct[row]?.includes(col)
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
    setNum(-1);
    const restart = () => {
      setState("start");
      setWordle([]);
      setGuess("");
      setNum(0);
      setCorrect({});
      setSemiCorrect({});
      setGuesses({});
      setOk(true);
    };

    return (
      <div className="playfield">
        <Field />

        <div>
          {ok ? (
            <h1>Grattis! Du listade ut ordet!</h1>
          ) : (
            <h1>Tyvärr! Du listade inte ut ordet... {wordle}</h1>
          )}
          <button onClick={restart}>Restart</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    Playfield();
  }, [guess]);

  const gameLoop = () => {
    setGuesses((prev: Record<any, any>) => ({
      ...prev,
      [num]: guess.split(""),
    }));
    setNum((prev: number) => prev + 1);
    setGuess("");
    let curr: number[] = [];
    let semiCurr: number[] = [];

    for (let i = 0; i < wordle.length; i++) {
      if (guess[i] === wordle[i]) {
        curr.push(i);
        if (curr.length !== 5) continue;
      } else if (wordle.includes(guess[i])) {
        semiCurr.push(i);
      }
      if (curr.length !== 0) {
        setCorrect((prev: Record<any, any>) => ({ ...prev, [num]: curr }));
        if (curr.length === 5) {
          setState("gameOver");
          return;
        }
      }
      if (semiCurr.length !== 0) {
        setSemiCorrect((prev: Record<any, any>) => ({
          ...prev,
          [num]: semiCurr,
        }));
      }
    }
    if (num === 4) {
      setOk((prev: boolean) => !prev);
      setState("gameOver");
    }
  };

  const KeyBoard = () => {
    const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3: string[] = [
      "DELETE",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "ENTER",
    ];

    const addKey = (key: string) => {
      if (key === "ENTER" && guess.length === 5) {
        gameLoop();
        return;
      }
      if (key === "DELETE") {
        setGuess((prev) => prev.slice(0, -1));
        return;
      }
      if (guess.length <= 4 && key !== "ENTER") {
        setGuess((prev: string) => prev + key);
      }
    };

    return (
      <div>
        <div className="keyboard">
          <div className="keyboard-rows">
            {keys1.map((key: string, index: any) => (
              <div className="key" datatype={index} onClick={() => addKey(key)}>
                {key}
              </div>
            ))}
          </div>
          <div className="keyboard-rows">
            {keys2.map((key: string) => (
              <div className="key" onClick={() => addKey(key)}>
                {key}
              </div>
            ))}{" "}
          </div>
          <div className="keyboard-rows">
            {keys3.map((key: string) => (
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
