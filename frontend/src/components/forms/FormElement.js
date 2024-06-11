import { toast } from "react-toastify";
import "./FormElement.css";
import cancel from "./cancel.svg";
import axios from "axios";

export default function FormElement(props) {
  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const role = userData.role;

  function kickUser() {
    if (role == "ROLE_DIRECTOR" && props.id !== userData.id) {
      axios
        .post("http://localhost:8080/company/delete", { id: props.id })
        .then((response) => {
          toast.success("Пользователь удалён");
          console.log("Запрос обработан");
          props.onDeleteWorker(props.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const a = role == "ROLE_DIRECTOR" && props.id !== userData.id;

  return (
    <div className="form-element">
      <div className="form-element__name">{props.name}</div>
      <div className="">
        {a && (
          <button className="form-element__button" onClick={kickUser}>
            <img src={cancel} alt="delete"></img>
          </button>
        )}
      </div>
    </div>
  );
}
