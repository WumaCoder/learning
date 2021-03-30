import React, { useContext } from "react";
import { CounterCtx } from "../context";

export function BChild() {
  const { count, setCount } = useContext(CounterCtx);
  return (
    <div>
      <h4>BChild: {count}</h4>
      <button onClick={(e) => setCount(count + 1)}>Click!</button>
    </div>
  );
}
