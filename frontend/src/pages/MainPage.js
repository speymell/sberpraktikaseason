import "./MainPage.css";
import logo from "./images/logo.svg";
import headimg from "./images/headimg.png";
import uRightHouse from "./images/uRightHouse.png";
import { useState } from "react";

export default function MainPage() {
  const signupHandleClick = () => {
    window.location.href = "/registration";
  };
  const signinHandleClick = () => {
    window.location.href = "/login";
  };
  return (
    <div className="wrapper">
      <div className="header">
        <a href="/" className="header__logo">
          <img src={logo} alt="" className="logo" />
        </a>
        <nav className="header-menu">
          <ul className="header-menu-list">
            <li className="header-menu-link is-current">
              <a href="/" className="menu__link">
                Главная
              </a>
            </li>
            <li className="header-menu-link">
              <a href="/" className="menu__link">
                О нас
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="header-book-button button signUp" type="button">
            <a href="/registration">Регистрация</a>
          </button>
          <button
            className="header-book-button button signIn"
            onClick={signinHandleClick}
            type="button"
          >
            <a href="/login">Войти</a>
          </button>
        </div>
      </div>
      <div className="main">
        <div className="main__wrapper">
          <div className="main-head">
            <img
              src={headimg}
              width="520"
              height="165"
              className="head-image"
              alt="headimg"
            />
          </div>
          <div className="main-text">
            Управляйте информационной системой прямо в
            <span className="text-bold"> браузере</span>
          </div>
          <button
            className="button start-button"
            type="button"
            onClick={signupHandleClick}
          >
            Начать
          </button>
        </div>
        <div className="wrapper-right-img">
          <img src={uRightHouse} alt="" className="right-img" />
        </div>
      </div>
    </div>
  );
}
