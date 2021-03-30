import React from "react";
import { A } from "./components/A";
import { B } from "./components/B";
import { Store } from "./store";

export default function Demo3() {
  return (
    <Store>
      <div className="box">
        <h2>
          Demo3 通过useReducer与useContext封装简单的状态管理库实现组件通信
        </h2>
        <hr />
        <A></A>
        <B></B>
      </div>
    </Store>
  );
}
