import logo from "./logo.svg";
import settingsLogo from "./settings.svg";
import user from "./user.svg";
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const email = userData.email;
  console.log(userInfo);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleUserImageClick = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  let json = require("./../data/info.json");
  return (
    <nav className="pages-header">
      <div className="header-links">
        <img src={logo} alt="SEASON" className="header-logo"></img>
        <ul className="header-links__list">
          <li
            className={
              location.pathname === "/company"
                ? "header-links__list-element active"
                : "header-links__list-element"
            }
          >
            <a href="/company">Компания</a>
          </li>
          <li
            className={
              location.pathname === "/realty"
                ? "header-links__list-element active"
                : "header-links__list-element"
            }
          >
            <a href="/realty">Недвижимость</a>
          </li>
          <li
            className={
              location.pathname === "/clients"
                ? "header-links__list-element active"
                : "header-links__list-element"
            }
          >
            <a href="/clients">Клиенты</a>
          </li>
          <li
            className={
              location.pathname === "/finances"
                ? "header-links__list-element active"
                : "header-links__list-element"
            }
          >
            <a href="/finances">Финансы</a>
          </li>
        </ul>
      </div>
      <div className="header-buttons">
        <div className="header-buttons__username">{email.slice(0, 30)}</div>
        <img
          src={user}
          alt="user"
          onClick={handleUserImageClick}
          className="user-logo"
        ></img>
        {showMenu && (
          <ul className="dropdown-menu">
            <li>
              <button onClick={logout}>Выйти</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
