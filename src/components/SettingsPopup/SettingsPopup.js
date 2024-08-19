import React from "react";
import "./SettingsPopup.css";
import ThemeSelectOptions from "./ThemeSelectOptions"; // 새 컴포넌트 임포트
import LanguageSelectionOptions from "./LanguageSelectionOptions";
import { useTranslation } from "react-i18next";

const SettingsPopup = ({ className, closeSettingsPopup }) => {
  const { t } = useTranslation();
  return (
    <div className={`settings-popup ${className}`}>
      <div className="popup-header">
        <h3>
          {
            //다국어 "설정" 타이틀 텍스트
            t("settinsPopup.title")
          }
        </h3>
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
          <span>
            {
              //다국어 "화면 모드" 텍스트
              t("settinsPopup.theme")
            }
          </span>
          <ThemeSelectOptions />
        </div>

        <div className="content-row">
          <span>
            {
              //다국어 "언어" 텍스트
              t("settinsPopup.language")
            }
          </span>
          <LanguageSelectionOptions />
        </div>

        <div className="content-row">
          <span>
            {
              //다국어 "모든 노트 삭제하기" 텍스트
              t("settinsPopup.deleteAllNotes")
            }
          </span>
          <button className="delete-button">
            {
              //다국어 "모두 삭제" 텍스트
              t("settinsPopup.deleteAll")
            }
          </button>
        </div>

        <div className="content-row">
          <span>
            {
              //다국어 "모든 장치에서 로그아웃" 텍스트
              t("settinsPopup.logoutAllDevices")
            }
          </span>
          <button className="logout-button">
            {
              //다국어 "모두 로그아웃" 텍스트
              t("settinsPopup.logoutAll")
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
