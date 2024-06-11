import { useEffect, useState } from "react";
import axios from "axios";
import "./../../pages/MainPage.css";
import "./EstateAdd.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userInfo = localStorage.getItem("user");
const userData = JSON.parse(userInfo);
const companyname = userData.companyname;
const id_user = userData.id;

export default function EstateListFormElement(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [state, setState] = useState(false);
  const id_realty = props.id;

  const [realtyname, setRealtyname] = useState(props.realtyname);
  const [price, setPrice] = useState(props.price);
  const [floor, setFloor] = useState(props.floor);
  const [square, setSquare] = useState(props.square);
  const [type, setType] = useState(props.type);
  const [adress, setAdress] = useState(props.adress);
  const [year, setYear] = useState(props.year);
  const [status, setStatus] = useState("Продано");
  const [allfloor, setAllfloors] = useState(props.allfloor);
  const [description, setDescription] = useState(props.description);
  const [numberRooms, setNumberRooms] = useState(props.rooms);

  const [emailclient, setEmailClient] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/images/" + props.previewImageId)
      .then((response) => {
        setImageUrl(`http://localhost:8080/images/${props.previewImageId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.previewImageId]);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/company", { replace: true });
  };
  const handleAddClient = () => {
    navigate("/clients", { replace: true });
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/image/${props.id}`
      );
      const imageIds = response.data;
      const imagePromises = imageIds.map((imageId) =>
        axios.get(`http://localhost:8080/images/${imageId.id}`, {
          responseType: "arraybuffer",
        })
      );
      const images = await Promise.all(imagePromises);
      const imageList = images.map((image) => {
        const blob = new Blob([image.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        return { id: image.config.url.split("/").pop(), url };
      });
      setImages(imageList);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleEstateSale = () => {
    axios
      .post("http://localhost:8080/images/" + props.previewImageId)
      .then((response) => {
        setImageUrl(`http://localhost:8080/images/${props.previewImageId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onHandleClick = () => {
    setShowDetails(true);
    fetchImages();
  };

  const handleSubmit = (e) => {
    toast.success("Объект продан и перенесён в архив");
    e.preventDefault();
    axios
      .post("http://localhost:8080/sellrealty", {
        id_user,
        emailclient,
        id_realty,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    window.location.href = "/realty";
  };

  return (
    <div className="estate-add-container">
      {state ? (
        <form
          className="estate-add-container list-form data"
          onSubmit={handleSubmit}
        >
          <div className="estate-add-left">
            <label
              htmlFor="realtyname"
              className="main-content__form-left element"
            >
              Название
              <input
                disabled={true}
                id="realtyname"
                type="text"
                value={realtyname}
                onChange={(e) => setRealtyname(e.target.value)}
              ></input>
            </label>
            <label htmlFor="square" className="main-content__form-left element">
              Площадь
              <input
                disabled={true}
                id="square"
                type="number"
                value={square}
                onChange={(e) => setSquare(e.target.value)}
              ></input>
            </label>
            <label htmlFor="price" className="main-content__form-left element">
              Стоимость
              <input
                disabled={true}
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </label>
            <label htmlFor="type" className="main-content__form-left element">
              Тип
              <select
                disabled={true}
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
                disabled={true}
                id="adress"
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              ></input>
            </label>
            <label htmlFor="floor" className="main-content__form-left element">
              Этаж
              <input
                disabled={true}
                id="floor"
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              ></input>
            </label>
            <label
              htmlFor="allfloor"
              className="main-content__form-left element"
            >
              Всего этажей
              <input
                disabled={true}
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
                disabled={true}
                id="numberRooms"
                type="number"
                value={numberRooms}
                onChange={(e) => setNumberRooms(e.target.value)}
              ></input>
            </label>
            <label htmlFor="year" className="main-content__form-left element">
              Год
              <input
                disabled={true}
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
            </label>
            <label
              htmlFor="description"
              className="main-content__form-left element"
            >
              Описание
              <textarea
                disabled={true}
                className="estate-element-description"
                id="description"
                value={description}
                style={{ resize: "none" }}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
            <label
              htmlFor="emailclient"
              className="main-content__form-left element"
            >
              E-mail клиента
              <input
                id="emailclient"
                type="email"
                value={emailclient}
                onChange={(e) => setEmailClient(e.target.value)}
              ></input>
            </label>
            <div className="estate-right-buttons">
              <button type="submit" disabled={!emailclient}>
                Продать
              </button>
              <button
                className="estate-add-client-button"
                onClick={handleAddClient}
              >
                Создать клиента
              </button>
              <button
                className="estate-add-cancel"
                type="button"
                onClick={handleCancel}
              >
                Отменить
              </button>
            </div>
          </div>
          <div className="estate-add-right">
            <div className="estate-add-images">
              {images.map((image) => (
                <div key={image.id}>
                  <img
                    src={image.url}
                    alt={image.id}
                    style={{
                      width: 240,
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="estate-add-left list-form">
            <section className="estate-add-left__info">
              <div>{props.realtyname}</div>
              <div className="estate-price">{props.price}</div>
            </section>
            <div>{props.adress}</div>
            {!showDetails && (
              <button className="" onClick={onHandleClick}>
                Открыть
              </button>
            )}
            {showDetails && (
              <div className="details">
                <div>Тип: {props.type}</div>
                <div>Год: {props.year}</div>
                <div>Этаж: {props.floor}</div>
                <div>Описание: {props.description}</div>
                <div class="estate-details-buttons">
                  {props.status != "Продано" && (
                    <button
                      className="estate-details-button-sale"
                      onClick={() => {
                        setState(true);
                      }}
                    >
                      Продажа
                    </button>
                  )}
                  <button
                    className="estate-details-button-cancel"
                    onClick={() => setShowDetails(false)}
                  >
                    Назад
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="estate-add-right list-form">
            {imageUrl && (
              <img
                src={imageUrl}
                style={{
                  width: 300,
                  height: 200,
                  objectFit: "cover",
                }}
                alt="Недвижимость"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
