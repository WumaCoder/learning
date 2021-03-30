import React, { useState } from "react";
import { A } from "./components/A";
import { B } from "./components/B";
import { CounterCtx } from "./context";

export default function Demo2() {
  const [count, setCount] = useState(0);
  return (
    <CounterCtx.Provider value={{ count, setCount }}>
      <div className="box">
        <h2>Demo2 通过上下文实现组件通信</h2>
        <hr />
        <A></A>
        <B></B>
      </div>
    </CounterCtx.Provider>
  );
}
