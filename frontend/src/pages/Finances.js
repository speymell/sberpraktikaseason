import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import EstateAdd from "./../components/estate/EstateAdd.css";
import axios from "axios";
import FinanceElement from "../components/finances/FinanceElement";
import "./../components/finances/FinanceElement.css";

export default function Finances() {
  const [realty, setRealty] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRealty = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/realtys/" + companyname
        );
        setRealty(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRealty();
  }, []);

  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;

  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date.target.value + "T00:00:00.000Z")); // add timezone offset
  };

  const handleEndDateChange = (date) => {
    setEndDate(new Date(date.target.value + "T23:59:59.999Z")); // add timezone offset
  };

  return (
    <div>
      <Navbar />
      <div className="companyname">{companyname}</div>
      <section className="estate-add-wrapper">
        <div className="estate-add-container finances">
          <div>
            <label>Выберите дату:</label>
          </div>
          <div className="add-date">
            <input
              type="date"
              value={startDate.toISOString().slice(0, 10)}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="add-date">
            {" "}
            <input
              type="date"
              value={endDate.toISOString().slice(0, 10)}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="estate-add-container finances">
          <h2>Финансовый отчёт</h2>
          <div className="finances-wrapper">
            <div>Дата</div>
            <div>Цена</div>
          </div>
          {realty
            .filter((realt) => {
              const updatedAt = new Date(realt.updatedAt);
              return updatedAt >= startDate && updatedAt <= endDate;
            })
            .map((realt) => {
              if (realt.status === "Продано") {
                return (
                  <FinanceElement
                    updatedAt={realt.updatedAt}
                    price={realt.price}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
      </section>
    </div>
  );
}
