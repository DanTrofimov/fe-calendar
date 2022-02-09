import React from "react";
import style from "./App.module.css";

function App() {
  const sample = <p>hello</p>;

  return (
    <div className={style.App}>
      {sample}
      <img src="logo512.png" alt="logo" />
    </div>
  );
}

export default App;
