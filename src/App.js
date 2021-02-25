import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import InitialForm from "./components/InitialForm";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [player1, setPlayer1] = useState({ name: "", symbol: "" });
  const [player2, setPlayer2] = useState({ name: "", symbol: "" });
  const setPlayers = (p1, p2) => {
    setPlayer1({ name: p1.name, symbol: p1.symbol ? "O" : "X" });
    setPlayer2({ name: p2.name, symbol: p2.symbol ? "O" : "X" });
    setGameStart(true);
  };
  return (
    <div className="App">
      {gameStart ? (
        <Grid player1={player1} player2={player2} setGameStart={setGameStart} />
      ) : (
        <InitialForm setPlayers={setPlayers} />
      )}
    </div>
  );
}

export default App;
