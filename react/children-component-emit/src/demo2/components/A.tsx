import React, { useContext } from "react";
import { AChild } from "./AChild";
import { CounterCtx } from "../context";

export function A() {
  const { count } = useContext(CounterCtx);
  return (
    <div>
      <h3>A:{count}</h3>
      <AChild></AChild>
    </div>
  );
}
