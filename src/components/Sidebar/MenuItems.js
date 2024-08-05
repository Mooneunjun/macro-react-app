import React, { useState, useEffect, useRef, useCallback } from "react";
import Popup from "./Popup"; // 팝업 컴포넌트를 임포트
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "../Share/MyTooltip.css";
import "tippy.js/dist/border.css";

const fixationMenuItems = [
  { name: "홈", fixDate: "2024-07-28T12:34:56.789Z" },
  { name: "프로필", fixDate: "2024-07-27T15:00:00.000Z" },
  { name: "설정", fixDate: "2024-07-27T15:00:00.000Z" },
  { name: "로그아웃", fixDate: "2024-07-27T15:00:00.000Z" },
  { name: "도움말", fixDate: "2024-07-22T15:00:00.000Z" },
  { name: "문의하기", fixDate: "2024-07-24T15:00:00.000Z" },
];

const menuItems = [
  { name: "메뉴1", date: "2024-07-20T15:00:00.000Z" },
  { name: "메뉴2", date: "2024-07-22T15:00:00.000Z" },
  { name: "메뉴3", date: "2024-07-21T15:00:00.000Z" },
];

// fixDate를 기준으로 최신 순으로 정렬
const sortedFixationMenuItems = [...fixationMenuItems].sort(
  (a, b) => new Date(b.fixDate) - new Date(a.fixDate)
);
// date를 기준으로 최신 순으로 정렬
const sortedMenuItems = [...menuItems].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

const MenuItems = () => {
  const [popupIndex, setPopupIndex] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null); // 팝업 요소 참조
  const buttonRefs = useRef([]); // 팝업을 트리거하는 버튼 요소 참조 배열

  const togglePopup = (index, event) => {
    event.stopPropagation(); // 이벤트 전파 중지

    if (popupIndex === index) {
      setPopupIndex(null); // 팝업이 이미 열려 있으면 닫기
    } else {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      setPopupPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
      setPopupIndex(index); // 팝업 열기
    }
  };

  const handleClickOutside = useCallback(
    (event) => {
      // 클릭된 타겟이 팝업이나 버튼 요소에 포함되지 않으면 팝업 닫기
      if (
        popupIndex !== null &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRefs.current.some(
          (button) => button && button.contains(event.target)
        )
      ) {
        setPopupIndex(null);
      }
    },
    [popupIndex]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div>
      <ul>
        <p>고정</p>
        {sortedFixationMenuItems.map((item, index) => (
          <li className="macro-list" key={`fix-${index}`}>
            <div
              className={`macro-list-container${index === 0 ? " active" : ""}${
                popupIndex === index ? " focused" : ""
              }`}
            >
              <span>{item.name}</span>
              <Tippy content={`옵션`} placement="bottom" theme="black">
                <svg
                  className="macro-list-option"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  ref={(el) => (buttonRefs.current[index] = el)} // 트리거 버튼 참조 설정
                  onClick={(event) => togglePopup(index, event)} // 팝업 토글 함수 호출
                >
                  <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                </svg>
              </Tippy>
            </div>
          </li>
        ))}
      </ul>
      <ul>
        <p>최근</p>
        {sortedMenuItems.map((item, index) => {
          const adjustedIndex = index + sortedFixationMenuItems.length;
          return (
            <li className="macro-list" key={`menu-${adjustedIndex}`}>
              <div
                className={`macro-list-container${
                  adjustedIndex === 0 ? " active" : ""
                }${popupIndex === adjustedIndex ? " focused" : ""}`}
              >
                <span>{item.name}</span>
                <Tippy content={`옵션`} placement="bottom" theme="black">
                  <svg
                    className="macro-list-option"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    ref={(el) => (buttonRefs.current[adjustedIndex] = el)} // 트리거 버튼 참조 설정
                    onClick={(event) => togglePopup(adjustedIndex, event)} // 팝업 토글 함수 호출
                  >
                    <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                  </svg>
                </Tippy>
              </div>
            </li>
          );
        })}
      </ul>
      <Popup
        ref={popupRef} // 팝업 요소에 ref 할당
        isVisible={popupIndex !== null}
        position={popupPosition}
      />
    </div>
  );
};

export default MenuItems;
