import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "closed" : "open"}`}>
      <ul>
        <li>홈</li>
        <li>프로필</li>
        <li>설정</li>
        <li>로그아웃</li>
      </ul>
    </div>
  );
};

export default Sidebar;
