import React, { useState } from "react";

function Box({ value, changeTurn, cord, updateGrid }) {
  const marker = () => {
    updateGrid(cord, value);
    changeTurn();
  };
  return (
    <div className="box" onClick={marker}>
      {value}
    </div>
  );
}

export default Box;
