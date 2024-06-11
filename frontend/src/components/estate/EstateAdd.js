import "./EstateAdd.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EstateAdd() {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;
  const id_user = userData.id;

  const [realtyname, setRealtyname] = useState("");
  const [price, setPrice] = useState("");
  const [floor, setFloor] = useState("");
  const [square, setSquare] = useState("");
  const [type, setType] = useState("");
  const [adress, setAdress] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("В продаже");
  const [allfloor, setAllfloors] = useState("");
  const [description, setDescription] = useState("");
  const [numberRooms, setNumberRooms] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const blobs = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const blob = new Blob([event.target.result], { type: file.type });
        blobs.push(blob);
        setImages(blobs);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("realtyname", realtyname);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("floor", floor);
    formData.append("square", square);
    formData.append("type", type);
    formData.append("adress", adress);
    formData.append("year", year);
    formData.append("allfloor", allfloor);
    formData.append("description", description);
    formData.append("numberRooms", numberRooms);
    formData.append("id_user", id_user);
    formData.append("companyname", companyname);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    axios
      .post("http://localhost:8080/realtycreate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Объект добавлен");
        navigate("/realty", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="estate-add-wrapper">
      <form className="estate-add-container" onSubmit={handleSubmit}>
        <div className="estate-add-left">
          <label
            htmlFor="realtyname"
            className="main-content__form-left element"
          >
            Название
            <input
              id="realtyname"
              type="text"
              value={realtyname}
              onChange={(e) => setRealtyname(e.target.value)}
            ></input>
          </label>
          <label htmlFor="square" className="main-content__form-left element">
            Площадь
            <input
              id="square"
              type="number"
              value={square}
              onChange={(e) => setSquare(e.target.value)}
            ></input>
          </label>
          <label htmlFor="price" className="main-content__form-left element">
            Стоимость
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </label>
          <label htmlFor="type" className="main-content__form-left element">
            Тип
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Выберите тип</option>
              <option value="дом">Дом</option>
              <option value="квартира">Квартира</option>
            </select>
          </label>
          <label htmlFor="adress" className="main-content__form-left element">
            Адрес
            <input
              id="adress"
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            ></input>
          </label>
          <label htmlFor="floor" className="main-content__form-left element">
            Этаж
            <input
              id="floor"
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            ></input>
          </label>
          <label htmlFor="allfloor" className="main-content__form-left element">
            Всего этажей
            <input
              id="allfloor"
              type="number"
              value={allfloor}
              onChange={(e) => setAllfloors(e.target.value)}
            ></input>
          </label>
          <label
            htmlFor="numberRooms"
            className="main-content__form-left element"
          >
            Всего комнат
            <input
              id="numberRooms"
              type="number"
              value={numberRooms}
              onChange={(e) => setNumberRooms(e.target.value)}
            ></input>
          </label>
          <label htmlFor="year" className="main-content__form-left element">
            Год
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="estate-add-right">
          <label
            htmlFor="description"
            className="main-content__form-left element"
          >
            Описание
            <textarea
              style={{ resize: "none" }}
              className="estate-element-description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="images" className="main-content__form-left element">
              Изображения
              <input
                className="input-file"
                id="images"
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </label>
          <div className="estate-right-buttons ">
            <button type="submit" disabled={!type}>
              Продолжить
            </button>
            <button
              className="estate-add-cancel"
              type="button"
              onClick={() => {
                setRealtyname("");
                setPrice("");
                setFloor("");
                setSquare("");
                setType("");
                setAdress("");
                setYear("");
                setStatus("");
                setAllfloors("");
                setDescription("");
                setNumberRooms("");
                setImages([]);
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
