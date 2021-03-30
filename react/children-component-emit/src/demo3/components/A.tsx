import React from "react";
import { useStore } from "../store";
import { AChild } from "./AChild";

export function A() {
  const [state] = useStore();
  return (
    <div>
      <h3>A:{state.count}</h3>
      <AChild></AChild>
    </div>
  );
}
