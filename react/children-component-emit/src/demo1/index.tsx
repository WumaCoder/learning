import React, { useEffect, useState } from "react";

import { A } from "./components/A";
import { B } from "./components/B";

export default function Demo1() {
  const [count, setCount] = useState(0);
  const [test, setTest] = useState(100);

  useEffect(() => {
    console.log("Demo1:", count);
  }, [count]);

  useEffect(() => {
    console.log("Test", test);
  });

  return (
    <div className="box">
      <h2>Demo1 通过公共父组件的状态实现组件通信</h2>
      <hr />
      <A value={count} onUpdateValue={(v) => setCount(v)}></A>
      <B value={count} onUpdateValue={(v) => setCount(v)}></B>
    </div>
  );
}
