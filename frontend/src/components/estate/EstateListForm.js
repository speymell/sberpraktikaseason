import "./EstateAdd.css";
import axios from "axios";
import { useEffect, useState } from "react";
import EstateListFormElement from "./EstateListFormElement";

export default function EstateListForm() {
  const [realty, setRealty] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;

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

  return (
    <div className="estate-add-wrapper">
      {realty.map((realt) => {
        if (realt.status == "В продаже") {
          return (
            <EstateListFormElement
              adress={realt.adress}
              realtyname={realt.realtyname}
              price={realt.price}
              year={realt.year}
              description={realt.description}
              floor={realt.floor}
              type={realt.type}
              previewImageId={realt.previewImageId}
              id={realt.id}
              square={realt.square}
              allfloor={realt.allfloor}
              rooms={realt.numberRooms}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
