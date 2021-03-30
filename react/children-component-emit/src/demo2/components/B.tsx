import React, { useContext } from "react";
import { BChild } from "./BChild";
import { CounterCtx } from "../context";

export function B() {
  const { count } = useContext(CounterCtx);
  return (
    <div>
      <h3>B:{count}</h3>
      <BChild></BChild>
    </div>
  );
}
