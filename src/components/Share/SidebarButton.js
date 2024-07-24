import React from "react";

const SidebarButton = ({ toggleSidebar, className }) => {
  return (
    <button className={className} onClick={toggleSidebar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default SidebarButton;