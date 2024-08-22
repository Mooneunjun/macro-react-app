import React from "react";
import "./MenuSelectButton.css";

const MenuSelectButton = ({ className, onClick, children }) => {
  return (
    <button className={`menu-select-button ${className}`} onClick={onClick}>
      <span>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="icon-md text-token-text-tertiary"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5.293 9.293a1 1 0 0 1 1.414 0L12 14.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default MenuSelectButton;
