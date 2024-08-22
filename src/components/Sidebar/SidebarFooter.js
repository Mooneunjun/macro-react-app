import React, { useState, useEffect } from "react";
import ProfileButton from "../Share/Button/ProfileButton";
import ProfilePopup from "../Share/ProfilePopup/ProfilePopup";

const SidebarFooter = ({ openSettingsPopup, toggleSidebar }) => {
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
        !event.target.closest(".footer-profile") &&
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
    <footer className="sidebar-footer">
      <div
        className={`${
          isProfilePopupOpen ? "footer-profile active" : "footer-profile"
        }`}
        onClick={toggleProfilePopup}
      >
        <ProfileButton className="profile-icon" />
        <div className="profile-name">UserName</div>
      </div>

      <ProfilePopup
        openSettingsPopup={openSettingsPopup}
        toggleProfilePopup={toggleProfilePopup}
        toggleSidebar={toggleSidebar}
        className={`${
          isProfilePopupOpen ? "profile-popup-on" : "profile-popup-off"
        } footer-profile-popup`}
      />
    </footer>
  );
};

export default SidebarFooter;
