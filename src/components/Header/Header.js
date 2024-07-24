import React from "react";
import "./Header.css";
import WebSidebarButton from "../Share/WebSiderbarButton";
import WirteButton from "../Share/WirteButton";
import SidebarButton from "../Share/SidebarButton";
import MenuVersionButton from "../Share/MenuVersionButton";
import ProfileButton from "../Share/ProfileButton";

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
