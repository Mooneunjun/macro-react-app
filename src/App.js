import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openWriteModal = () => {
    // 글쓰기 모달을 여는 로직
    console.log("글쓰기 모달 열기");
  };

  return (
    <div>
      <Header
        toggleSidebar={toggleSidebar}
        openWriteModal={openWriteModal}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {/* 나머지 앱 내용 */}
    </div>
  );
}

export default App;
