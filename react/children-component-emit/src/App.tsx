import React, {
  Suspense,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useReducer,
} from "react";

function App() {
  const [demo, setDemo] = useState("demo1");

  const Demo = React.lazy(() => import("./" + demo + "/index.tsx"));

  return (
    <div className="App">
      <span>
        <button onClick={(e) => setDemo("demo1")}>Demo1</button>
        <button onClick={(e) => setDemo("demo2")}>Demo2</button>
        <button onClick={(e) => setDemo("demo3")}>Demo3</button>
      </span>
      <Suspense fallback={<div>Loading...</div>}>
        <Demo></Demo>
      </Suspense>
    </div>
  );
}

export default App;
