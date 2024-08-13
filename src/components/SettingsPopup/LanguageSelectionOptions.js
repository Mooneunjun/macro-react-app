import React, { useState, useEffect, useRef, useCallback } from "react";
import MenuSelectButton from "../Share/MenuSelectButton";

// 언어 선택 옵션 컴포넌트
const languages = [
  { value: "system", label: "자동탐지" },
  { value: "en", label: "English(US)" },
  { value: "ko", label: "한국어" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
];

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
    setIsOpen(false); // 연여 변경 후 팝업 닫기
  }, []);

  // 시스템 기본 언어를 가져오는 함수

  const getSystemLanguage = () => {
    // 브라우저에서 사용자의 선호 언어 목록을 가져옴
    const languages =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];

    // 가장 선호하는 언어 코드
    const languageCode = languages[0] || "en";

    // 중국어는 지역 정보를 포함하여 유지하고, 다른 언어는 지역 정보 제거
    if (languageCode.startsWith("zh")) {
      return languageCode; // "zh-CN" 또는 "zh-TW" 그대로 반환
    }

    // 다른 언어는 지역 정보 제거
    return languageCode.split("-")[0]; // 예: "ko-KR" -> "ko"
  };

  // 초기 언어 설정
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

  const systemLanguage = getSystemLanguage();
  // 언어 코드에 해당하는 label을 반환하는 함수
  const languageName = (languageCode) => {
    const language = languages.find(({ value }) => value === languageCode);
    return language ? language.label : "알 수 없음"; // 해당 언어 코드가 없으면 "알 수 없음" 반환
  };

  return (
    <>
      <MenuSelectButton
        className="language-select-button"
        onMouseDown={(e) => e.preventDefault()} // 기본 동작 중지
        onClick={toggleOptions} // 클릭 시 토글
      >
        {languageName(language)}
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

        {
          // 현재 선택된 언어 표시
          language !== "system" && (
            <div
              className={`select-option-item selected`}
              value={language}
              onClick={() => changeLanguage(language)}
            >
              <span>{languageName(language)}</span>
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
          )
        }

        {
          //시스템의 언어를 추천하기 위한 옵션 추가
          language === systemLanguage ? null : (
            <div
              className={`select-option-item`}
              value={systemLanguage}
              onClick={() => changeLanguage(systemLanguage)}
            >
              <span>{languageName(systemLanguage)} </span>
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
          )
        }

        <div className="select-option-divider"></div>

        {languages.map(({ value, label }) =>
          language !== value &&
          systemLanguage !== value &&
          value !== "system" ? (
            <div
              key={value}
              className={`select-option-item`}
              value={value}
              onClick={() => changeLanguage(value)}
            >
              <span>{label}</span>
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
          ) : null
        )}
      </div>

      {
        // 옵션 창을 닫는 이벤트
      }
      {isOpen && (
        <div
          className={`select-option-overlay ${isOpen ? "open" : "closed"}`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default LanguageSelectionOptions;
