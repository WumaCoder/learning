import { createContext } from "react"

export const CounterCtx = createContext({
  count: 0,
  setCount: (v:number)=>any
})

