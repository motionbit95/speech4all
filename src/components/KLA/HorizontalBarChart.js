import React from "react";
import "./HorizontalBarChart.css";

const HorizontalBarChart = ({ position }) => {
  return (
    <div className="chart-container">
      <div className="line"></div>
      <div className="marker" style={{ left: `${position}%` }}></div>
      <div className="ticks">
        <span className="tick" style={{ left: "4%" }}></span>
        <span className="tick2" style={{ left: "15.5%" }}></span>
        <span className="tick" style={{ left: "27%" }}></span>
        <span className="tick2" style={{ left: "38.5%" }}></span>
        <span className="tick" style={{ left: "50%" }}></span>
        <span className="tick2" style={{ left: "61.5%" }}></span>
        <span className="tick" style={{ left: "73%" }}></span>
        <span className="tick2" style={{ left: "84.5%" }}></span>
        <span className="tick" style={{ left: "96%" }}></span>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
