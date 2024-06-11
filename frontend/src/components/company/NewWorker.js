import "./NewWorker.css";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import axios from "axios";

export default function NewWorker({ onInvite, onAddWorker }) {
  const [email, setEmail] = useState("");

  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Введите email");
      return;
    }
    axios
      .post("http://localhost:8080/company/invite", {
        email,
        companyname,
      })
      .then((response) => {
        const newWorker = response.data;
        onInvite(newWorker);
        onAddWorker(newWorker);
        toast.success("Приглашение отправлено");
        console.log("Запрос обработан");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onInviteHandler = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <div className="new-worker">
        <div className="new-worker__controls">
          <input
            className="new-worker__controls-input"
            type="email"
            placeholder="email@mail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="new-worker__actions">
          <button
            className="new-worker__action"
            type="submit"
            onClick={onInviteHandler}
          >
            Пригласить
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
