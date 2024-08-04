import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import SettingsPopup from "./components/Share/SettingsPopup";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wasSidebarOpen, setWasSidebarOpen] = useState(false);
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setWasSidebarOpen(!isSidebarOpen);

    console.log(` 사이드바 ${!isSidebarOpen}`);
  };

  const openWriteModal = () => {
    // 글쓰기 모달을 여는 로직
    console.log("글쓰기 모달 열기");
  };

  const openSettingsPopup = () => {
    setIsSettingsPopupOpen(true);
    console.log("설정 팝업 열기");
  };

  const closeSettingsPopup = () => {
    setIsSettingsPopupOpen(false);
    console.log("설정 팝업 닫기");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        // 화면 크기가 768px 이하로 작아질 때 사이드바를 닫음
        setIsSidebarOpen(false);
      } else {
        // 화면 크기가 768px 이상으로 커질 때 이전 사이드바 상태를 복원
        setIsSidebarOpen(wasSidebarOpen);
      }
    };

    // 이벤트 리스너 추가
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // 이벤트 리스너 정리
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [wasSidebarOpen]);

  return (
    <div>
      <Header
        toggleSidebar={toggleSidebar}
        openWriteModal={openWriteModal}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        toggleSidebar={toggleSidebar}
        openWriteModal={openWriteModal}
        isSidebarOpen={isSidebarOpen}
        openSettingsPopup={openSettingsPopup}
      />
      {(isSidebarOpen || isSettingsPopupOpen) && (
        <div
          className={`black-background ${
            isSettingsPopupOpen ? "settings-popup-background" : ""
          }`}
          onClick={() => {
            if (isSidebarOpen) toggleSidebar();
            if (isSettingsPopupOpen) setIsSettingsPopupOpen(false);
          }}
        />
      )}
      {/* 나머지 앱 내용 */}

      <SettingsPopup
        className={`${isSettingsPopupOpen ? "open" : "closed"} `}
        closeSettingsPopup={closeSettingsPopup}
      />
    </div>
  );
}

export default App;
