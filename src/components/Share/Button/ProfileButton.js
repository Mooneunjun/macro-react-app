import React from "react";
import profileImage from "../../../images/profile.png"; // 프로필 이미지 경로

const ProfileButton = ({ className }) => {
  return (
    <div className={className}>
      <img src={profileImage} alt="Profile" className="profile-icon" />
    </div>
  );
};

export default ProfileButton;
