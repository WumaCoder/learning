import React, { useContext, useReducer } from "react";
import { useStore } from "../store";
import { BChild } from "./BChild";

export function B() {
  const [state] = useStore();
  return (
    <div>
      <h3>B:{state.count}</h3>
      <BChild></BChild>
    </div>
  );
}
