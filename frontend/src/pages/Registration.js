import "./MainPage.css";
import logo from "./images/logo.svg";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/registration", {
        lastname,
        firstname,
        middlename,
        email,
        password,
        companyname,
      })
      .then((response) => {
        navigate("/company", { replace: true });
      })
      .catch((error) => {
        setError(true);
      });
    console.log(lastname, firstname, middlename, email, password, companyname);
  };

  const [isChecked, setIsChecked] = useState(false);
  let onCheckedHandler = () => setIsChecked(!isChecked);
  return (
    <div className="wrapper">
      <div className="header">
        <a href="/" class="header__logo">
          <img src={logo} alt="" class="logo" />
        </a>
        <nav class="header-menu">
          <ul class="header-menu-list">
            <li class="header-menu-link is-current">
              <a href="/" className="menu__link">
                Главная
              </a>
            </li>
            <li class="header-menu-link">
              <a href="/about" className="menu__link">
                О нас
              </a>
            </li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="header-book-button button signUp" type="button">
            <a href="/registration">Регистрация</a>
          </button>
          <button class="header-book-button button signIn" type="button">
            <a href="/login">Войти</a>
          </button>
        </div>
      </div>
      <div class="main-content">
        <div className="main-content__header">Регистрация</div>
        <form className="main-content__form" onSubmit={handleSubmit}>
          <div className="main-content__form-wrapper">
            <div className="main-content__form-left">
              <label
                htmlFor="lastname"
                className="main-content__form-left element"
              >
                Введите фамилию
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </label>
              <label
                htmlFor="firstname"
                className="main-content__form-left element"
              >
                Введите имя
                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </label>
              <label
                htmlFor="middlename"
                className="main-content__form-left element"
              >
                Введите отчество
                <input
                  id="middlename"
                  type="text"
                  value={middlename}
                  onChange={(e) => setMiddleName(e.target.value)}
                ></input>
              </label>
            </div>
            <div className="main-content__form-right">
              <label
                htmlFor="email"
                className="main-content__form-left element"
              >
                Введите e-mail
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </label>
              <label
                htmlFor="password"
                className="main-content__form-left element"
              >
                Введите пароль
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </label>
              <label className="main-content__form-left element">
                Я директор
                <input
                  className="checker"
                  type="checkbox"
                  checked={isChecked}
                  onChange={onCheckedHandler}
                />
              </label>
              {isChecked && (
                <label
                  htmlFor="companyname"
                  className="main-content__form-left element"
                >
                  Введите название компании
                  <input
                    id="companyname"
                    type="text"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                  ></input>
                </label>
              )}
            </div>
          </div>
          <button type="submit">Продолжить</button>
        </form>
      </div>
    </div>
  );
}
