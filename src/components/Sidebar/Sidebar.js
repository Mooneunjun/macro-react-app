import React, { useState } from "react";
import "./Sidebar.css";
import WriteButton from "../Share/Button/WriteButton";
import SidebarButton from "../Share/Button/SidebarButton";
import ProfileButton from "../Share/Button/ProfileButton";
import MenuItems from "./MenuItems";
import SidebarFooter from "./SidebarFooter";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  toggleSidebar,
  openWriteModal,
  isSidebarOpen,
  openSettingsPopup,
  transitionEnabled,
}) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open" : "closed"} ${
        transitionEnabled ? "transition-enabled" : ""
      }`}
    >
      <header className="sidebar-head">
        <SidebarButton
          toggleSidebar={toggleSidebar}
          className="sidebar-button"
          isSidebarOpen={isSidebarOpen}
        />
        <WriteButton openWriteModal={openWriteModal} className="write-button" />
      </header>
      <nav className="sidebar-menu">
        <div className="macro-menu">
          <ProfileButton className="menu-logo" />
          <h3 className="menu-name">MoonMacro</h3>
          <WriteButton
            openWriteModal={openWriteModal}
            className="menu-write-button"
          />
        </div>

        <div className="macro-search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z"></path>
          </svg>
          <input
            type="text"
            placeholder={t("sidebar.search")}
            onChange={handleSearchTextChange}
            value={searchText} // input에 value를 설정하여 상태를 사용합니다.
          />
        </div>

        <MenuItems />
      </nav>

      <SidebarFooter
        openSettingsPopup={openSettingsPopup}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default Sidebar;
