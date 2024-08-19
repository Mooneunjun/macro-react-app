import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "./MyTooltip.css";
import "tippy.js/dist/border.css";
import { useTranslation } from "react-i18next";

const SidebarButton = ({ toggleSidebar, className, isSidebarOpen }) => {
  const { t } = useTranslation();

  // 다국어 "사이드바 열기" 또는 "사이드바 닫기" 텍스트
  const tooltipText = isSidebarOpen
    ? t("sidebarTippy.close")
    : t("sidebarTippy.open");

  return (
    <Tippy content={tooltipText} placement="bottom-start" theme="black">
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
    </Tippy>
  );
};

export default SidebarButton;
