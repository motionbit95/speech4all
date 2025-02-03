import React from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./Intro";

function App(props) {
  const { user } = props;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </div>
  );
}

export default App;
