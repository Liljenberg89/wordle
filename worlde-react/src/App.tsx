import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState<string>("start");
  const [trys, setTrys] = useState<string[]>(["", "", "", "", ""]);
  const [wordle, setWordle] = useState<string[]>([]);

  const getRandomWord = async () => {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1&diff=2&length=5",
    );

    if (!response.ok) {
      console.log("error");
    }
    const data = await response.json();
    console.log(data);

    setWordle(data[0].split(""));
    setState("game");
  };

  const Playfield = () => {
    return (
      <div className="playfield">
        <div className="playfield-box">
          {trys.map(() =>
            wordle.map(() => <input className="tile" maxLength={1} />),
          )}
        </div>
        <KeyBoard />
      </div>
    );
  };

  const KeyBoard = () => {
    const keys1: any = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: any = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["DELETE", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];

    return (
      <div>
        <div className="keyboard">
          <div className="keyboard-rows">
            {keys1.map((key: any) => (
              <div className="key">{key}</div>
            ))}
          </div>
          <div className="keyboard-rows">
            {keys2.map((key: any) => (
              <div className="key">{key}</div>
            ))}{" "}
          </div>
          <div className="keyboard-rows">
            {keys3.map((key: any) => (
              <div className="key">{key}</div>
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
    return <Playfield />;
  }
}

export default App;
