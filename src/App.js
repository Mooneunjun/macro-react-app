import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import SettingsPopup from "./components/Share/SettingsPopup";

function App() {
  // 로컬 스토리지에서 초기 사이드바 상태를 가져옴
  const getInitialSidebarState = () => {
    const savedState = localStorage.getItem("isSidebarOpen");
    return savedState !== null ? JSON.parse(savedState) : false;
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
  const [wasSidebarOpen, setWasSidebarOpen] = useState(false);
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false);

  const toggleSidebar = () => {
    const newIsSidebarOpen = !isSidebarOpen;
    setIsSidebarOpen(newIsSidebarOpen);
    setWasSidebarOpen(!isSidebarOpen); // 이전 상태를 저장

    localStorage.setItem("isSidebarOpen", JSON.stringify(newIsSidebarOpen)); // 로컬 스토리지에 저장
    console.log(`사이드바 ${newIsSidebarOpen ? "열림" : "닫힘"}`);
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
            if (isSidebarOpen && window.innerWidth <= 768) toggleSidebar();
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
