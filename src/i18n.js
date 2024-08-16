// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 언어별 번역 파일 import
import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";

// 번역 리소스 설정
const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
};

// i18n 초기화
i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 초기 언어 설정
  fallbackLng: "en", // 지원하지 않는 언어일 경우 대체 언어
  interpolation: {
    escapeValue: false, // React에서는 XSS 보호를 자동으로 하므로 false로 설정
  },
});

export default i18n;
