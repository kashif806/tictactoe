import React, { useState } from "react";

function Box({ value, changeTurn, cord, updateGrid }) {
  const [marked, setMarked] = useState(false);
  const marker = () => {
    updateGrid(cord, value);
    changeTurn();
    setMarked(true);
  };
  return (
    <div className="box" onClick={!marked ? marker : undefined}>
      {value}
    </div>
  );
}

export default Box;
