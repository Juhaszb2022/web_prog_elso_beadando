import { useState } from "react";
import "./App.css";

export default function App() {
  const [menu, setMenu] = useState("calculator");

  return (
    <div className="container">
      <h1 className="title">React Alkalmazás</h1>
      <div className="menu">
        <button className="button" onClick={() => setMenu("calculator")}>Számológép</button>
        <button className="button" onClick={() => setMenu("rps")}>Kő-Papír-Olló</button>
      </div>
      {menu === "calculator" ? <Calculator /> : <RockPaperScissors />}
    </div>
  );
}

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Hiba");
    }
  };

  return (
    <div>
      <h2 className="subtitle">Számológép</h2>
      <div className="display">{input || "0"}</div>
      <div className="grid">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((item) => (
          <button
            key={item}
            className="grid-button"
            onClick={() => (item === "=" ? calculateResult() : handleClick(item))}
          >
            {item}
          </button>
        ))}
        <button className="clear-button" onClick={() => setInput("")}>C</button>
      </div>
    </div>
  );
}

function RockPaperScissors() {
  const choices = ["Kő", "Papír", "Olló"];
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);
    if (choice === randomChoice) {
      setResult("Döntetlen!");
    } else if (
      (choice === "Kő" && randomChoice === "Olló") ||
      (choice === "Papír" && randomChoice === "Kő") ||
      (choice === "Olló" && randomChoice === "Papír")
    ) {
      setResult("Nyertél!");
    } else {
      setResult("Vesztettél!");
    }
  };

  return (
    <div>
      <h2 className="subtitle">Kő-Papír-Olló</h2>
      <div className="game-status">
        <p>Te: {userChoice || "?"}</p>
        <p>Gép: {computerChoice || "?"}</p>
        <p className="result">{result}</p>
      </div>
      <div className="choice-buttons">
        {choices.map((choice) => (
          <button key={choice} className="button" onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
