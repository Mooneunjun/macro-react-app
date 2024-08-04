import React from "react";
import "./SettingsPopup.css";

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
          <select>
            <option value="default">사스템</option>
            <option value="dark">다크 모드</option>
            <option value="light">라이트 모드</option>
          </select>
        </div>

        <div className="content-row">
          <span>언어</span>
          <select>
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="zh">중국어</option>
          </select>
        </div>

        <div className="content-row">
          <span>모든 노트 삭제하기</span>
          <button className="delete-button">모두 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
