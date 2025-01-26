import React from "react";

// Styles
import "../css/loaders.css";

const DotsLoader = ({ className = "", color = "white" }) => {
  return (
    <span className={`${className} dots-wrapper`}>
      <span style={{ backgroundColor: color }} className="dot dot-0"></span>
      <span style={{ backgroundColor: color }} className="dot dot-1"></span>
      <span style={{ backgroundColor: color }} className="dot dot-2"></span>
    </span>
  );
};

export default DotsLoader;
