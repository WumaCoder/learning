import React from "react";
import { AChild } from "./AChild";

export function A(props: {
  value: number;
  onUpdateValue: (newValue: number) => any;
}) {
  return (
    <div>
      <h3>A:{props.value}</h3>
      <AChild {...props}></AChild>
    </div>
  );
}
