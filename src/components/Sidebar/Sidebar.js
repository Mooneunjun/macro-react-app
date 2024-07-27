import React from "react";
import { useState } from "react";
import "./Sidebar.css";
import WriteButton from "../Share/WriteButton";
import SidebarButton from "../Share/SidebarButton";
import ProfileButton from "../Share/ProfileButton";
import Tooltip from "../Share/Tooltip";

const Sidebar = ({ toggleSidebar, openWriteModal, isSidebarOpen }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    console.log(event.target.value);
  };

  const menuItems = [
    { name: "홈" },
    { name: "프로필" },
    { name: "설정" },
    { name: "로그아웃" },
    { name: "도움말" },
    { name: "문의하기" },
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <header className="sidebar-head">
        <SidebarButton
          toggleSidebar={toggleSidebar}
          className="sidebar-button"
          isSidebarOpen={isSidebarOpen}
          toolTipClassName="sidebar-button-tooltip"
        />
        <WriteButton
          openWriteModal={openWriteModal}
          className="write-button"
          toolTipClassName="write-button-tooltip"
        />
      </header>
      <nav className="sidebar-menu">
        <div className="macro-menu">
          <ProfileButton className="menu-logo" />
          <h3 className="menu-name">MoonMacro</h3>
          <WriteButton
            openWriteModal={openWriteModal}
            className="menu-write-button"
            toolTipClassName=" menu-write-button-tooltip"
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
            placeholder="검색"
            onChange={handleSearchTextChange}
            value={searchText} // input에 value를 설정하여 상태를 사용합니다.
          />
        </div>

        <ul>
          {menuItems.map((item, index) => (
            <li className="macro-list" key={index}>
              <div
                className={`macro-list-container ${
                  index === 0 ? "active" : ""
                }`}
              >
                <span>{item.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                </svg>
                <Tooltip className={`macro-list-option`} text={`옵션`} />
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
