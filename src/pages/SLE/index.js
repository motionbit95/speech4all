import React from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./Intro";
import Input from "./Input";
import Analysis from "./Analysis";

function App(props) {
  const { user } = props;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/input" element={<Input user={user} />} />
        <Route path="/analysis" element={<Analysis user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
