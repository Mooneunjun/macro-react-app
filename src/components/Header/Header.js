import React, { useState, useEffect } from "react";
import "./Header.css";
import WebSidebarButton from "../Share/Button/WebSiderbarButton";
import WriteButton from "../Share/Button/WriteButton";
import SidebarButton from "../Share/Button/SidebarButton";
import MenuSelectButton from "../Share/Button/MenuSelectButton";
import ProfileButton from "../Share/Button/ProfileButton";
import ProfilePopup from "../Share/ProfilePopup/ProfilePopup";

const Header = ({
  toggleSidebar,
  openWriteModal,
  isSidebarOpen,
  openSettingsPopup,
}) => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen((prev) => !prev);
  };

  useEffect(() => {
    // 프로필 팝업 외부 클릭 시 팝업을 닫는 함수
    const handleClickOutside = (event) => {
      // event.target을 통해 클릭된 요소가 `footer-profile` 또는 `profile-popup-on` 클래스가 아닌지 확인
      if (
        isProfilePopupOpen &&
        !event.target.closest(".header-profile") &&
        !event.target.closest(".profile-popup-on")
      ) {
        setIsProfilePopupOpen(false);
      }
    };

    // `click` 이벤트에 대한 리스너 등록
    window.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isProfilePopupOpen]);

  return (
    <header className="header">
      <div
        className={`left-buttons ${
          isSidebarOpen ? "sidebar-on" : "sidebar-off"
        }`}
      >
        <WebSidebarButton
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          className="sidebar-button"
        />
        <WriteButton openWriteModal={openWriteModal} className="write-button" />
      </div>

      <div className="right-header">
        <SidebarButton
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          className="second-sidebar-button"
        />
        <MenuSelectButton className="menu-version">
          MoonMacro 1.0
        </MenuSelectButton>
        <WriteButton
          openWriteModal={openWriteModal}
          className="second-write-button"
        />
        <div className="header-profile" onClick={toggleProfilePopup}>
          <ProfileButton className="profile" />
        </div>
      </div>

      <ProfilePopup
        openSettingsPopup={openSettingsPopup}
        toggleProfilePopup={toggleProfilePopup}
        toggleSidebar={toggleSidebar}
        className={`${
          isProfilePopupOpen ? "profile-popup-on" : "profile-popup-off"
        } header-profile-popup`}
      />
    </header>
  );
};

export default Header;
