import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";
import translationZHCN from "./locales/zh-CN/translation.json";
import translationZHTW from "./locales/zh-TW/translation.json";
import translationJA from "./locales/ja/translation.json";
import translationVI from "./locales/vi/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
  "zh-CN": {
    translation: translationZHCN,
  },
  "zh-TW": {
    translation: translationZHTW,
  },
  ja: {
    translation: translationJA,
  },
  vi: {
    translation: translationVI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 기본 언어
  fallbackLng: "en", // 지원되지 않는 언어일 경우 사용할 언어
  interpolation: {
    escapeValue: false, // React는 이미 XSS를 방지하므로 설정 불필요
  },
});

export default i18n;
