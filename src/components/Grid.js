import React, { useState, useEffect } from "react";
import Box from "./Box.js";

function Grid({ player1, player2, setGameStart }) {
  const [winner, setWinner] = useState("");
  const [msg, setMsg] = useState(`${player1.name}'s Turn`);
  const [gridValues, setGridValues] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState(() => player1.symbol);
  const changeTurn = () => {
    turn === "X" ? setTurn("O") : setTurn("X");
    setMsg(() =>
      turn === player1.symbol
        ? `${player1.name}'s Turn`
        : `${player2.name}'s Turn`
    );
  };
  useEffect(() => {
    console.log(player1, player2);
    checkWinner();
  }, [turn]);

  const checkWinner = () => {
    console.log(checkForDraw());
    let row = checkValues("row");
    let col = checkValues("col");
    let d1 = checkValues("d1");
    let d2 = checkValues("d2");
    if (row || col || d1 || d2) {
      setWinner(() => (turn === "X" ? "O" : "X"));
      return;
    }
    !winner && checkForDraw();
  };
  const checkForDraw = () => {
    for (let i = 0; i < gridValues.length; i++) {
      for (let j = 0; j < gridValues.length; j++) {
        if (!gridValues[i][j]) return false;
      }
    }
    setWinner("DRAW");
  };

  const checkValues = (type) => {
    let same = false;
    switch (type) {
      case "row":
        for (let i = 0; i < gridValues.length; i++) {
          let toCheck = gridValues[i][0];
          if (toCheck) {
            for (let j = 0; j < gridValues.length; j++) {
              same = gridValues[i][j] == toCheck;
              if (!same) break;
            }
            if (same) return true;
          } else {
            continue;
          }
        }
        break;
      case "col":
        for (let i = 0; i < gridValues.length; i++) {
          let toCheck = gridValues[0][i];
          if (toCheck) {
            for (let j = 0; j < gridValues.length; j++) {
              same = gridValues[j][i] == toCheck;
              if (!same) break;
            }
            if (same) return true;
          } else {
            continue;
          }
        }
        break;
      case "d1":
        if (gridValues[0][0]) {
          same =
            gridValues[0][0] === gridValues[1][1] &&
            gridValues[0][0] === gridValues[2][2];
          if (same) return same;
        }
        break;
      case "d2":
        if (gridValues[0][2]) {
          same =
            gridValues[0][2] === gridValues[1][1] &&
            gridValues[0][2] === gridValues[2][0];
          if (same) return same;
        }
        break;

      default:
        break;
    }
    return same;
  };

  const updateGrid = (cord) => {
    let temp = gridValues;
    temp[cord.x][cord.y] = turn;
    setGridValues(temp);
  };

  return (
    <div>
      <h1 className="heading">Lets Play!!!</h1>
      <div className="gridHolder">
        {gridValues.map((row, i) =>
          row.map((value, j) => (
            <Box
              cord={{ x: i, y: j }}
              changeTurn={changeTurn}
              value={value}
              updateGrid={updateGrid}
            />
          ))
        )}
        <div
          style={{
            fontSize: 2 + "rem",
            color: "darkBlue",
            width: 300 + "px",
            marginTop: 20,
          }}
        >
          {msg}
        </div>
      </div>
      {winner ? (
        winner === "DRAW" ? (
          <div className="winningScreen">
            Match Drawn!!!
            <button onClick={() => setGameStart(false)}>Restart</button>
          </div>
        ) : (
          <div className="winningScreen">
            {winner === player1.symbol
              ? `${player1.name} Wins!!!!`
              : `${player2.name} Wins!!!!`}
            <button onClick={() => setGameStart(false)}>Restart</button>
          </div>
        )
      ) : null}
    </div>
  );
}

export default Grid;
