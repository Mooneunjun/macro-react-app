import React from "react";
import "./SettingsPopup.css";
import MenuSelectButton from "../Share/MenuSelectButton";
import ThemeSelectOptions from "./ThemeSelectOptions"; // 새 컴포넌트 임포트

const SettingsPopup = ({ className, closeSettingsPopup }) => {
  return (
    <div className={`settings-popup ${className}`}>
      <div className="popup-header">
        <h3>설정</h3>
        <button className="close-button" onClick={closeSettingsPopup}>
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
              d="M5.636 5.636a1 1 0 0 1 1.414 0l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414L13.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l4.95-4.95-4.95-4.95a1 1 0 0 1 0-1.414"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="popup-content">
        <div className="content-row">
          <span>화면 모드</span>
          <ThemeSelectOptions />
        </div>

        <div className="content-row">
          <span>언어</span>
          <MenuSelectButton className="language-select-button">
            {`한국어`}
          </MenuSelectButton>
        </div>

        <div className="content-row">
          <span>모든 노트 삭제하기</span>
          <button className="delete-button">모두 삭제</button>
        </div>

        <div className="content-row">
          <span>모든 장치에서 로그아웃</span>
          <button className="logout-button">모두 로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
