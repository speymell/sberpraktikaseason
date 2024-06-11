import { useEffect, useState } from "react";
import "./../forms/FormElement.css";
import axios from "axios";

export default function CompanyInfo(props) {
  const [loading, setLoading] = useState(false);
  const [totalWorkers, setTotalWorkers] = useState(0);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/realtys/" + props.companyname
        );
        console.log("http://localhost:8080/realtys/" + props.companyname);
        setTotalWorkers(response.data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, [props.companyname]);
  return (
    <div className="companyInfo-wrapper">
      <div className="form-element">
        <div className="form-element__property">Название компании:</div>
        <div>{props.companyname}</div>
      </div>
      <div className="form-element">
        <div className="form-element__property">Всего сотрудников:</div>
        <div>{props.totalWorkers}</div>
      </div>
      <div className="form-element">
        <div className="form-element__property">Всего объектов: </div>
        <div>{totalWorkers}</div>
      </div>
    </div>
  );
}
