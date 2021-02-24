import React, { useState, useEffect } from "react";
import Box from "./Box.js";

function Grid() {
  const [winner, setWinner] = useState("");
  const [gridValues, setGridValues] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState("X");
  const changeTurn = () => {
    turn === "X" ? setTurn("O") : setTurn("X");
  };
  useEffect(() => {
    checkWinner();
  }, [turn]);

  const checkWinner = () => {
    checkForDraw() && setWinner("DRAW");
    console.log(checkForDraw());
    let row = checkValues("row");
    let col = checkValues("col");
    let d1 = checkValues("d1");
    let d2 = checkValues("d2");
    (row || col || d1 || d2) && setWinner(() => (turn === "X" ? "O" : "X"));
  };
  const checkForDraw = () => {
    for (let i = 0; i < gridValues.length; i++) {
      for (let j = 0; j < gridValues.length; j++) {
        if (!gridValues[i][j]) return false;
      }
    }
    return true;
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

  const updateGrid = (cord, value) => {
    let temp = gridValues;
    temp[cord.x][cord.y] = turn;
    setGridValues(temp);
  };

  return (
    <div>
      <h1 className="heading">Grid</h1>
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
      </div>
      {winner ? (
        winner === "DRAW" ? (
          <div className="winningScreen">Match Drawn!!!</div>
        ) : (
          <div className="winningScreen">Player "{winner}" Wins!!!!! </div>
        )
      ) : null}
    </div>
  );
}

export default Grid;
