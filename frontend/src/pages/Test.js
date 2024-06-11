import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

export default function Test() {
  localStorage.setItem("token", "xdddtesttoken");
  localStorage.setItem(
    "user",
    JSON.stringify({
      message: "User logged in successfully",
      response: "OK",
      email: "anna@mail.ru",
      role: "ROLE_DIRECTOR",
      companyname: "PairOfSocks",
    })
  );

  const logout = () => {
    localStorage.removeItem("token");

    return <Navigate to="/login" />;
  };

  const [text, setText] = useState("xd");
  const [buttonText, setButtonText] = useState("Загрузить текст");

  const handleClick = async () => {
    setButtonText("Загрузка...");
    try {
      const response = await axios.get("http://localhost:8080/test");
      setText(response.data);
      setButtonText("Загрузить текст");
    } catch (error) {
      console.error(error);
      setButtonText("Ошибка загрузки");
    }
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={handleClick}>{buttonText}</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
