import React, { useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional
import "./MyTooltip.css";
import "tippy.js/dist/border.css";

const SidebarButton = ({ toggleSidebar, className, isSidebarOpen }) => {
  const buttonRef = useRef(null);
  const tooltipText = isSidebarOpen ? "사이드바 닫기" : "사이드바 열기";

  useEffect(() => {
    const button = buttonRef.current;

    let instance;

    if (button) {
      instance = tippy(button, {
        content: tooltipText,
        placement: "bottom-start",
        theme: "black",
      });
    }

    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, [tooltipText]);

  return (
    <button ref={buttonRef} className={className} onClick={toggleSidebar}>
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
