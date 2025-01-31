import React from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./Intro";
import Input from "./Input";
import KLAInput from "../../components/KLA/KLAInput";
import KLAResult from "../../components/KLA/KLAResult";
import Result from "./Result";
import KLAHistory from "../../components/KLA/KLAHistory";
import ProtectedRoute from "../../ProtectedRoute";
import History from "./History";

function App(props) {
  const { user } = props;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/input" element={<Input user={user} />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
