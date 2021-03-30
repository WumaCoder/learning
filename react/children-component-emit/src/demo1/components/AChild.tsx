import React from "react";

export function AChild({ value = 0, onUpdateValue = (v: number) => null }) {
  return (
    <div>
      <h4>AChild: {value}</h4>
      <button onClick={(e) => onUpdateValue(value + 1)}>Click!</button>
    </div>
  );
}
