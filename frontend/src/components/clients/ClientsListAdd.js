import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ClientListAdd({ onAddClient }) {
  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const id_company = userData.companyid;
  const id_user = userData.id;

  const location = useLocation();

  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [number_phone, setNumber_phone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      age,
      email,
      firstname,
      lastname,
      middlename,
      number_phone,
      id_company,
      id_user
    );

    axios
      .post("http://localhost:8080/createclient", {
        age,
        email,
        firstname,
        lastname,
        middlename,
        number_phone,
        id_company,
        id_user,
      })
      .then((response) => {
        toast.success("Клиент добавлен");
        navigate("/clients", { replace: true });

        const newClient = response.data;
        onAddClient(newClient);
      })
      .catch((error) => {
        toast.error("Ошибка добавления");
        console.log(error);
      });
    toast.success("Клиент добавлен");
  };

  return (
    <div className="estate-add-wrapper">
      <form className="estate-add-container" onSubmit={handleSubmit}>
        <div className="estate-add-left">
          <label htmlFor="email" className="main-content__form-left element">
            email
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
          <label htmlFor="lastname" className="main-content__form-left element">
            Фамилия
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            ></input>
          </label>
          <label
            htmlFor="firstname"
            className="main-content__form-left element"
          >
            Имя
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            ></input>
          </label>
          <label
            htmlFor="middlename"
            className="main-content__form-left element"
          >
            Отчество
            <input
              id="middlename"
              type="text"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            ></input>
          </label>
          <label
            htmlFor="number_phone"
            className="main-content__form-left element"
          >
            Номер телефона
            <input
              id="number_phone"
              type="number"
              value={number_phone}
              onChange={(e) => setNumber_phone(e.target.value)}
            ></input>
          </label>
          <label htmlFor="age" className="main-content__form-left element">
            Возраст
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="estate-add-right">
          <div className="estate-right-buttons clients">
            <button
              type="submit"
              disabled={!number_phone}
              onClick={() => (window.location.href = "/clients")}
            >
              Добавить
            </button>
            <button
              className="estate-add-cancel"
              type="button"
              onClick={() => {
                setNumber_phone("");
                setEmail("");
                setAge("");
                setFirstname("");
                setLastname("");
                setMiddlename("");
              }}
            >
              Отменить
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
