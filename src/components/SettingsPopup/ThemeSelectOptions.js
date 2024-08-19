import React, { useState, useEffect, useRef, useCallback } from "react";
import MenuSelectButton from "../Share/MenuSelectButton";
import { useTranslation } from "react-i18next";

const ThemeSelectOptions = () => {
  const { t } = useTranslation();
  // 로컬 스토리지에서 초기 테마를 가져오는 함수
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "system";
  };

  const [theme, setTheme] = useState(getInitialTheme()); // 초기 테마 설정
  const [isOpen, setIsOpen] = useState(false); // 옵션 창 열림 상태 관리
  const themeSelectRef = useRef(null);

  // 테마 변경 함수
  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // 선택한 테마를 로컬 저장소에 저장
    const themeToApply = newTheme === "system" ? getSystemTheme() : newTheme;
    document.documentElement.setAttribute("data-theme", themeToApply);
    setIsOpen(false); // 테마 변경 후 팝업 닫기
  }, []);

  // 시스템 기본 테마를 가져오는 함수
  const getSystemTheme = () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  };

  // 초기 테마 설정
  useEffect(() => {
    changeTheme(theme);
  }, [theme, changeTheme]);

  // 외부 클릭 시 옵션 창을 닫음
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        themeSelectRef.current &&
        !themeSelectRef.current.contains(event.target)
      ) {
        setIsOpen(false); // 팝업 닫기
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // 클릭 이벤트를 통해 옵션 창을 열거나 닫음
  const toggleOptions = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <MenuSelectButton
        className="theme-select-button"
        onMouseDown={(e) => e.preventDefault()} // 기본 동작 중지
        onClick={toggleOptions} // 클릭 시 토글
      >
        {theme === "system"
          ? // 시스템 테마일 경우 다국어 텍스트
            t("settinsPopup.theme.system")
          : theme === "dark"
          ? // 다크 테마일 경우 다국어 텍스트
            t("settinsPopup.theme.dark")
          : // 라이트 테마일 경우 다국어 텍스트
            t("settinsPopup.theme.light")}
      </MenuSelectButton>
      <div
        className={`select-option ${isOpen ? "open" : "closed"}`}
        ref={themeSelectRef}
      >
        <div
          className={`select-option-item ${
            theme === "system" ? "selected" : ""
          }`}
          value="system"
          onClick={() => changeTheme("system")}
        >
          <span>
            {
              // 다국어 "시스템" 텍스트
              t("settinsPopup.theme.system")
            }
          </span>
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
        <div
          className={`select-option-item ${theme === "dark" ? "selected" : ""}`}
          value="dark"
          onClick={() => changeTheme("dark")}
        >
          <span>
            {
              // 다국어 "다크 모드" 텍스트
              t("settinsPopup.theme.dark")
            }
          </span>
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
        <div
          className={`select-option-item ${
            theme === "light" ? "selected" : ""
          }`}
          value="light"
          onClick={() => changeTheme("light")}
        >
          <span>
            {
              // 다국어 "라이트 모드" 텍스트
              t("settinsPopup.theme.light")
            }
          </span>
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
      </div>
      {isOpen && (
        <div
          className={`select-option-overlay ${isOpen ? "open" : "closed"}`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ThemeSelectOptions;
