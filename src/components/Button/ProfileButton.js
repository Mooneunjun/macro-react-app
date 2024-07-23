import React from "react";
import profileImage from "../../images/profile.png"; // 이미지를 import합니다.

const ProfileButton = ({ className }) => {
  return (
    <div className={className}>
      <img src={profileImage} alt="Profile" className="profile-icon" />
    </div>
  );
};

export default ProfileButton;
