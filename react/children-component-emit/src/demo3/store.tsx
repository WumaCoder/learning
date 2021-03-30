import React, { createContext, useContext, useReducer } from "react";

export const initState = {
  count: 0,
};

export function reducer(state: any, { type = "add" }) {
  if (type === "add") {
    return { count: state.count + 1 };
  } else {
    return { count: state.count - 1 };
  }
}

export const StoreCtx = createContext([
  { count: 0 },
  (obj: { type: string }): any => null,
] as any);

export function Store(props: any) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <StoreCtx.Provider value={[state, dispatch]}>
      {props.children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  return useContext(StoreCtx);
}
