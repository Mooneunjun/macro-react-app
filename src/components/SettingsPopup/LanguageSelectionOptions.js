import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import MenuSelectButton from "../Share/MenuSelectButton";

// 언어 선택 옵션 배열
const languages = [
  { value: "system", label: "자동탐지" },
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
  { value: "ja", label: "日本語" },
];

// 로컬 스토리지 관련 유틸리티 함수
const getStoredLanguage = () => localStorage.getItem("language");
const setStoredLanguage = (language) =>
  localStorage.setItem("language", language);

const LanguageSelectionOptions = () => {
  // 초기 언어 설정
  const [language, setLanguage] = useState(getStoredLanguage() || "system");
  const [isOpen, setIsOpen] = useState(false);
  const languageSelectRef = useRef(null);

  // 시스템 기본 언어를 가져오는 함수 (useMemo로 캐싱)
  const systemLanguage = useMemo(() => {
    const languages =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];
    const languageCode = languages[0] || "en";

    if (languageCode.startsWith("zh")) {
      return languageCode;
    }

    return languageCode.split("-")[0];
  }, []);

  // 언어 변경 함수
  const changeLanguage = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
      setStoredLanguage(newLanguage);

      const languageToApply =
        newLanguage === "system" ? systemLanguage : newLanguage;
      document.documentElement.setAttribute("data-Language", languageToApply);
      setIsOpen(false); // 언어 변경 후 팝업 닫기
    },
    [systemLanguage]
  );

  // 초기 언어 설정 (useEffect로 초기 실행)
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
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // 클릭 이벤트를 통해 옵션 창을 열거나 닫음
  const toggleOptions = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // 언어 코드에 해당하는 label을 반환하는 함수
  const languageName = (languageCode) => {
    const language = languages.find(({ value }) => value === languageCode);
    return language ? language.label : "알 수 없음";
  };

  // SVG 아이콘을 컴포넌트로 분리
  const CheckIcon = () => (
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
  );

  return (
    <>
      {/* 언어 선택 버튼 */}
      <MenuSelectButton
        className="language-select-button"
        onMouseDown={(e) => e.preventDefault()} // 버튼 클릭 시 기본 동작을 방지
        onClick={toggleOptions} // 버튼 클릭 시 옵션 창을 토글
      >
        {languageName(language)} {/* 현재 선택된 언어의 이름을 버튼에 표시 */}
      </MenuSelectButton>

      {/* 언어 선택 옵션 목록 */}
      <div
        className={`select-option ${isOpen ? "open" : "closed"}`} // 옵션 창이 열렸는지 닫혔는지를 클래스 이름으로 관리
        ref={languageSelectRef} // 외부 클릭 감지를 위한 참조 설정
      >
        {/* '자동탐지' 옵션 */}
        <div
          className={`select-option-item ${
            language === "system" ? "selected" : ""
          }`} // 선택된 상태라면 'selected' 클래스 적용
          value="system"
          onClick={() => changeLanguage("system")} // '자동탐지' 옵션을 선택 시 언어 변경
        >
          <span>자동탐지</span>
          <CheckIcon /> {/* 선택된 항목을 표시하는 체크 아이콘 */}
        </div>
        {/* 현재 선택된 언어 표시 (시스템이 아닌 경우에만) */}
        {language !== "system" && (
          <div
            className="select-option-item selected"
            value={language}
            onClick={() => changeLanguage(language)} // 현재 선택된 언어로 다시 변경
          >
            <span>{languageName(language)}</span>
            <CheckIcon />
          </div>
        )}
        {/* 시스템 언어 추천 옵션 */}
        {language !== systemLanguage && (
          <div
            className="select-option-item"
            value={systemLanguage}
            onClick={() => changeLanguage(systemLanguage)} // 시스템 기본 언어로 변경
          >
            <span>{languageName(systemLanguage)}</span>
            <CheckIcon />
          </div>
        )}
        <div className="select-option-divider"></div>{" "}
        {/* 옵션 항목들 사이의 구분선 */}
        {/* 사용 가능한 언어 목록에서 시스템 언어 및 현재 선택된 언어를 제외한 나머지 언어들 */}
        {languages.map(({ value, label }) =>
          language !== value &&
          systemLanguage !== value &&
          value !== "system" ? (
            <div
              key={value} // 배열 순회 시 유니크한 키 값 설정
              className="select-option-item"
              value={value}
              onClick={() => changeLanguage(value)} // 해당 언어로 변경
            >
              <span>{label}</span>
              <CheckIcon />
            </div>
          ) : null
        )}
      </div>

      {/* 옵션 창이 열려 있을 때, 외부 클릭 시 창을 닫기 위한 오버레이 */}
      {isOpen && (
        <div
          className={`select-option-overlay ${isOpen ? "open" : "closed"}`}
          onClick={() => setIsOpen(false)} // 오버레이 클릭 시 옵션 창 닫기
        ></div>
      )}
    </>
  );
};

export default LanguageSelectionOptions;
