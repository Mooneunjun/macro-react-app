import React, { useState, useEffect, useRef, useCallback } from "react";
import MenuSelectButton from "../Share/MenuSelectButton";

const LanguageSelectionOptions = () => {
  // 로컬 스토리지에서 초기 언어를 가져오는 함수
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage ? savedLanguage : "system";
  };

  const [language, setLanguage] = useState(getInitialLanguage()); // 초기 테마 설정
  const [isOpen, setIsOpen] = useState(false); // 옵션 창 열림 상태 관리
  const languageSelectRef = useRef(null);

  // 언어 변경 함수
  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // 선택한 테마를 로컬 저장소에 저장
    const languageToApply =
      newLanguage === "system" ? getSystemLanguage() : newLanguage;
    document.documentElement.setAttribute("data-Language", languageToApply);
    setIsOpen(false); // 테마 변경 후 팝업 닫기
  }, []);

  // 시스템 기본 언어를 가져오는 함수
  const getSystemLanguage = () => {
    const language = navigator.language || navigator.userLanguage;
    return language ? language : "en"; // 기본값을 영어로 설정
  };

  // 초기 테마 설정
  useEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  // 외부 클릭 시 옵션 창을 닫음
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        languageSelectRef.current &&
        !languageSelectRef.current.contains(event.target)
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
        className="language-select-button"
        onMouseDown={(e) => e.preventDefault()} // 기본 동작 중지
        onClick={toggleOptions} // 클릭 시 토글
      >
        {language === "system"
          ? "자동탐지"
          : language === "en"
          ? "영어"
          : language === "ko"
          ? "한국어"
          : language === "zh-CN"
          ? "중국어"
          : "자동탐지"}
      </MenuSelectButton>
      <div
        className={`select-option ${isOpen ? "open" : "closed"}`}
        ref={languageSelectRef}
      >
        <div
          className={`select-option-item ${
            language === "system" ? "selected" : ""
          }`}
          value="system"
          onClick={() => changeLanguage("system")}
        >
          <span>자동탐지</span>
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
            language === "en" ? "selected" : ""
          }`}
          value="en"
          onClick={() => changeLanguage("en")}
        >
          <span>영어</span>
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
            language === "ko" ? "selected" : ""
          }`}
          value="ko"
          onClick={() => changeLanguage("ko")}
        >
          <span>한국어</span>
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
            language === "zh-CN" ? "selected" : ""
          }`}
          value="zh-CN"
          onClick={() => changeLanguage("zh-CN")}
        >
          <span>중국어</span>
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
    </>
  );
};

export default LanguageSelectionOptions;
