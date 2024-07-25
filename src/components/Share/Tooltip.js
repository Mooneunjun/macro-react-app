import React from "react";
import "./Tooltip.css";

const Tooltip = ({ className, text }) => {
  return <div className={`tooltip ${className}`}>{text}</div>;
};

export default Tooltip;
