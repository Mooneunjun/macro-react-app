import React from "react";
import "./Sidebar.css";
import WirteButton from "../Button/WirteButton";
import SidebarButton from "../Button/SidebarButton";
import ProfileButton from "../Button/ProfileButton";

const Sidebar = ({ toggleSidebar, openWriteModal, isSidebarOpen }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <header className="sidebar-head">
        <SidebarButton
          toggleSidebar={toggleSidebar}
          className="sidebar-button"
        />
        <WirteButton openWriteModal={openWriteModal} className="wirte-button" />
      </header>
      <nav className="sidebar-menu">
        <div className="macro-menu">
          <ProfileButton className="menu-logo" />
          <h3 className="menu-name">MoonMacro</h3>
          <WirteButton
            openWriteModal={openWriteModal}
            className="menu-wirte-button"
          />
        </div>
        <ul>
          <li>홈</li>
          <li>프로필</li>
          <li>설정</li>
          <li>로그아웃</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
