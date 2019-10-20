import React from "react";
import ErrorBoundary from "./ErrorBoundary";

import Dropdown from "../Dropdown";

import { getName, getNames } from "./data";

const LIST = [...getNames().keys()].map((x, i) => {
  const name = getName(i);
  return { key: i, value: `${i} ${name}` };
});

const equals = (a, b) => a.toLowerCase().includes(b.toLowerCase());

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Dropdown list={LIST} equals={equals} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
