import React from "react";
import "./Tooltip.css";

const Tooltip = ({ className, text }) => {
  return <div className={`tooltip ${className}`}>{text}</div>;
  // div 태그에 className을 props로 받아와서 적용합니다.
};

export default Tooltip;
