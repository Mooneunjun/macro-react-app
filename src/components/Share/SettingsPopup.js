import React, { useState, useEffect, useRef } from "react";
import "./SettingsPopup.css";
import MenuSelectButton from "./MenuSelectButton";

const SettingsPopup = ({ className, closeSettingsPopup }) => {
  const [isThemeSelectOptionOpen, setIsThemeSelectOptionOpen] = useState(false);
  const themeSelectRef = useRef(null);

  // 상태 토글 함수
  const toggleThemeSelectOption = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setIsThemeSelectOptionOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 클릭된 요소가 참조된 요소에 포함되지 않을 경우
      if (
        themeSelectRef.current &&
        !themeSelectRef.current.contains(event.target)
      ) {
        setIsThemeSelectOptionOpen(false); // 팝업 닫기
      }
    };

    // `mousedown` 대신 `click` 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <MenuSelectButton
            className="theme-select-button"
            menuName="시스템"
            onMouseDown={(e) => e.preventDefault()} // 기본 동작 중지
            onClick={toggleThemeSelectOption} // 클릭 시 토글
          />
          <div
            className={`them-select-option ${
              isThemeSelectOptionOpen ? "open" : "closed"
            }`}
            ref={themeSelectRef}
          >
            <div className="them-select-option-item" value="default">
              <span>시스템</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="them-select-option-item" value="dark">
              다크 모드
            </div>
            <div className="them-select-option-item" value="light">
              라이트 모드
            </div>
          </div>
        </div>

        <div className="content-row">
          <span>언어</span>
          <MenuSelectButton
            className="language-select-button"
            menuName="한국어"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="zh">중국어</option>
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
