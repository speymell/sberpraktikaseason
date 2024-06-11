import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import ClientsList from "../components/clients/ClientsList";
import ClientsTabSection from "../components/clients/ClientsTabSeciton";
import ClientListAdd from "../components/clients/ClientsListAdd";

export default function Clients() {
  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;
  const companyid = userData.id;

  const [updateClients, setUpdateClients] = useState(false);

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/clients/" + companyid
        );
        setClients(response.data);
        setTotalClients(response.data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, [updateClients]);

  const addClientsHandler = (client) => {
    setUpdateClients(true);
  };

  const [tab, setTab] = useState("list");
  const renderTabContent = () => {
    switch (tab) {
      case "list":
        return <ClientsList clients={clients} />;
      case "addnewestate":
        return <ClientListAdd onAddClient={addClientsHandler} />;

      default:
        return null;
    }
  };
  console.log(clients);

  return (
    <div>
      <Navbar />
      <div className="companyname">{companyname}</div>
      <section className="estate-add-wrapper">
        <ClientsTabSection
          active={tab}
          onChange={(current) => setTab(current)}
        />
        {renderTabContent()}
      </section>
    </div>
  );
}
