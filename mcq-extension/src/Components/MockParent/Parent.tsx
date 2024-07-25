//parentrenders children
//children initialstate background is red
//when one of the children gets clicked then that child gets clicked
//when another child gets clicked, the new child will become blue and the old child will become red again

//parent should name their own children
//

import React, { useState } from "react";

import Child from "./Child";

const ParentalFigure = () => {
  const [selected, setSelected] = useState("");

  const changeSelected = (s: string) => {
    setSelected(s);
  };

  return (
    <>
      <Child
        name="Bartholomew"
        selectStatus={selected === "Bartholomew"}
        changeSelected={changeSelected}
      />
      <Child
        name="Sam"
        selectStatus={selected === "Sam"}
        changeSelected={changeSelected}
      />
    </>
  );
};
