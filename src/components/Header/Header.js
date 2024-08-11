import React from "react";
import "./Header.css";
import WebSidebarButton from "../Share/WebSiderbarButton";
import WriteButton from "../Share/WriteButton";
import SidebarButton from "../Share/SidebarButton";
import MenuSelectButton from "../Share/MenuSelectButton";
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
        <ProfileButton className="profile" />
      </div>
    </header>
  );
};

export default Header;
