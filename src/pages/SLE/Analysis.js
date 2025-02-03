import React from "react";
import { useLocation } from "react-router-dom";

function Analysis(props) {
  const location = useLocation();
  return <div>분석 : {location.state?.totalScore}</div>;
}

export default Analysis;
