import React, { useState } from "react";
import "./slider.css";

function SliderSwitch({ init, setSymbol, id }) {
  const setValue = (e) => {
    e.target.localName === "input" && setSymbol(e.target.checked, id);
  };
  return (
    <div>
      <label className="switch">
        <input
          onChange={(e) => setValue(e)}
          type="checkBox"
          checked={init}
        ></input>
        <span className="slider">
          <p className="symbols">O&nbsp;&nbsp;X</p>
        </span>
      </label>
    </div>
  );
}

export default SliderSwitch;
