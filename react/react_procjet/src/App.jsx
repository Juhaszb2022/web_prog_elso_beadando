import { useState } from "react";

export default function App() {
  const [menu, setMenu] = useState("calculator");

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">React Alkalmazás</h1>
      <div className="flex justify-around mb-4">
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => setMenu("calculator")}>
          Számológép
        </button>
        <button className="p-2 bg-green-500 text-white rounded" onClick={() => setMenu("rps")}>
          Kő-Papír-Olló
        </button>
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
      <h2 className="text-xl font-bold mb-2">Számológép</h2>
      <div className="border p-2 mb-2 bg-gray-200">{input || "0"}</div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((item) => (
          <button
            key={item}
            className="p-2 bg-gray-300 rounded"
            onClick={() => (item === "=" ? calculateResult() : handleClick(item))}
          >
            {item}
          </button>
        ))}
        <button className="p-2 col-span-2 bg-red-500 text-white rounded" onClick={() => setInput("")}>C</button>
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
      <h2 className="text-xl font-bold mb-2">Kő-Papír-Olló</h2>
      <div className="mb-2">
        <p>Te: {userChoice || "?"}</p>
        <p>Gép: {computerChoice || "?"}</p>
        <p className="font-bold">{result}</p>
      </div>
      <div className="flex justify-around">
        {choices.map((choice) => (
          <button key={choice} className="p-2 bg-blue-500 text-white rounded" onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
