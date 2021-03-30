import React, { useContext, useReducer } from "react";
import { useStore } from "../store";

export function BChild() {
  const [state, dispatch] = useStore();
  return (
    <div>
      <h4>BChild: {state.count}</h4>
      <button onClick={(e) => dispatch({ type: "add" })}>ADD!</button>
    </div>
  );
}
