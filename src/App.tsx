import React from "react";
import "./styles.css";
import { Click } from "./Click";

const App: React.FC = () => {
  return (
    <div>
      <h1>Wires</h1>
      {process.env.NODE_ENV}
      {process.env.name}
      <Click />
    </div>
  );
};

export default App;
