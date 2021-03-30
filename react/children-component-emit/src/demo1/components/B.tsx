import React from "react";
import { BChild } from "./BChild";

export function B(props: {
  value: number;
  onUpdateValue: (newValue: number) => any;
}) {
  return (
    <div>
      <h3>B:{props.value}</h3>
      <BChild {...props}></BChild>
    </div>
  );
}
