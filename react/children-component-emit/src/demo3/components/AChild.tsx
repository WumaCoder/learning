import React, { useContext, useReducer } from "react";
import { useStore } from "../store";

export function AChild() {
  const [state, dispatch] = useStore();

  return (
    <div>
      <h4>AChild: {state.count}</h4>
      <button onClick={(e) => dispatch({ type: "dec" })}>DEC!</button>
    </div>
  );
}
