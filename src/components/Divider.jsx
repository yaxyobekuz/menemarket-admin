import React from "react";

const Divider = ({ color = "#e5e5e5", className = "" }) => {
  return (
    <div
      style={{ background: color }}
      className={`w-full h-0.5 rounded-full ${className}`}
    ></div>
  );
};

export default Divider;
