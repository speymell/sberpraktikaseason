import axios from "axios";
import "./MainPage.css";
import logo from "./images/logo.ico";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        return true;
      }
      return false;
    };

    if (checkAuth()) {
      navigate("/company", { replace: true });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        navigate("/company", { replace: true });
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="header">
        <a href="#" className="header__logo">
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
              <a href="/about" className="menu__link">
                О нас
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="header-book-button button signUp" type="button">
            <a href="/registration">Регистрация</a>
          </button>
          <button className="header-book-button button signIn" type="button">
            <a href="/login">Войти</a>
          </button>
        </div>
      </div>
      <div class="main-content">
        <form className="main-content__form" onSubmit={handleSubmit}>
          <div className="main-content__form-wrapper">
            <label htmlFor="email" className="main-content__form-left element">
              Введите e-mail
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>{" "}
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
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}
