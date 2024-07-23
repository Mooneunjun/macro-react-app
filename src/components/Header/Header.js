import React from "react";
import "./Header.css";
import WebSidebarButton from "../Button/WebSiderbarButton";
import WirteButton from "../Button/WirteButton";
import SidebarButton from "../Button/SidebarButton";
import MenuVersionButton from "../Button/MenuVersionButton";
import ProfileButton from "../Button/ProfileButton";

const Header = ({ toggleSidebar, openWriteModal, isSidebarOpen }) => {
  return (
    <header className="header">
      <div
        className={`left-buttons ${
          isSidebarOpen ? "sidebar-on" : "sidebar-off"
        }`}
      >
        <WebSidebarButton
          toggleSidebar={toggleSidebar}
          className="sidebar-button"
        />
        <WirteButton openWriteModal={openWriteModal} className="wirte-button" />
      </div>

      <div className="right-header">
        <SidebarButton
          toggleSidebar={toggleSidebar}
          className="second-sidebar-button"
        />
        <MenuVersionButton
          className="menu-version"
          versionName="MoonMacro 1.0"
        />
        <WirteButton
          openWriteModal={openWriteModal}
          className="second-wirte-button"
        />
        <ProfileButton className="profile" />
      </div>
    </header>
  );
};

export default Header;
