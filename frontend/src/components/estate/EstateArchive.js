import axios from "axios";
import { useEffect, useState } from "react";
import EstateListFormElement from "./EstateListFormElement";

export default function EstateArchive() {
  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;
  const [loading, setLoading] = useState(false);
  const [realty, setRealty] = useState([]);
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
        if (realt.status == "Продано") {
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
              status={realt.status}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
