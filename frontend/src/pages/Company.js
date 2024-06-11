import "./Company.css";
import React, { useState, useEffect } from "react";
import workersData from "./../data/workers.json";
import "./../index.css";
import Navbar from "../navbar/Navbar";
import TabSection from "./../components/company/TabSection";
import FormList from "./../components/forms/FormList";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import CompanyInfo from "../components/company/CompanyInfo";

export default function Company() {
  let json = require("./../data/info.json");
  const [tab, setTab] = useState("workers");
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateWorkers, setUpdateWorkers] = useState(false);

  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;

  const [totalWorkers, setTotalWorkers] = useState(0);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/byCompany/" + companyname
        );
        setWorkers(response.data);
        setTotalWorkers(response.data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, [updateWorkers]);

  useEffect(() => {
    if (updateWorkers) {
      setUpdateWorkers(false);
    }
  }, [updateWorkers]);

  const addWorkerHandler = (worker) => {
    setUpdateWorkers(true);
  };

  const renderTabContent = () => {
    switch (tab) {
      case "workers":
        return (
          <FormList
            workers={workers}
            onAddWorker={addWorkerHandler}
            onDeleteWorker={addWorkerHandler}
          />
        );
      case "manage":
        return (
          <CompanyInfo totalWorkers={totalWorkers} companyname={companyname} />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <section>
        <Navbar />
        <div className="companyname">{companyname}</div>
        <TabSection active={tab} onChange={(current) => setTab(current)} />
        {renderTabContent()}
      </section>
    </div>
  );
}
