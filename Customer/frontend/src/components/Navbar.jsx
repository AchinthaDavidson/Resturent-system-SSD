import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar({ user }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    document.title = "User Profile";
    let _userInfo = localStorage.getItem("loginInfo");
    setUserInfo(JSON.parse(_userInfo));
  }, []);
console.log(userInfo)
  return (
    <div className="navbar-container">
      <div className="container navbar">
        <span className="title">User Profile</span>
        <div className="user-info">
          <span className="user-name">Hi, {user?.user.name}</span>
        </div>
      </div>
    </div>
  );
}
