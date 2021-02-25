import React, { useState } from "react";
import SliderSwitch from "./SliderSwitch";

function InitialForm({ setPlayers }) {
  const [init1, setInit1] = useState(true);
  const [init2, setInit2] = useState(false);
  const [error, setError] = useState("");

  const setSymbol = (val, id) => {
    if (id === "slider1") {
      setInit1(val);
      setInit2(!val);
    } else {
      setInit2(val);
      setInit1(!val);
    }
  };

  const submitPlayers = (e) => {
    e.preventDefault();
    e.target[0].value.trim() && e.target[1].value.trim()
      ? setPlayers(
          { name: e.target[0].value.trim(), symbol: init1 },
          { name: e.target[1].value.trim(), symbol: init2 }
        )
      : setError("Enter Names");
  };

  return (
    <form className="formContainer" onSubmit={submitPlayers}>
      <h2 className="center">Game Settings</h2>
      <div className="form">
        <div>
          <div className="center">Enter Names</div>
          <div>
            <label htmlFor="player1">
              Player 1 :<input name="player1" type="text"></input>
            </label>
          </div>
          <div style={{ marginTop: 50 }}>
            <label htmlFor="player2">
              Player 2 :<input name="player2" type="text"></input>
            </label>
          </div>
        </div>
        <div style={{ marginLeft: 10 }}>
          <div className="center">Pick Symbol</div>
          <div>
            <SliderSwitch init={init1} setSymbol={setSymbol} id={"slider1"} />
          </div>
          <div style={{ marginTop: 35 }}>
            <SliderSwitch init={init2} setSymbol={setSymbol} id={"slider2"} />
          </div>
        </div>
      </div>
      <div className="center" style={{ marginTop: 35 }}>
        <button type="submit">Start Game</button>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </form>
  );
}

export default InitialForm;
