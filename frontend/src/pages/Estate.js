import EstateAdd from "../components/estate/EstateAdd";
import EstateArchive from "../components/estate/EstateArchive";
import EstateListForm from "../components/estate/EstateListForm";
import EstateTabSection from "../components/estate/EstateTabSection";
import Navbar from "../navbar/Navbar";
import React, { useState } from "react";

export default function Estate() {
  const userInfo = localStorage.getItem("user");
  const userData = JSON.parse(userInfo);
  const companyname = userData.companyname;
  const [tab, setTab] = useState("list");
  const renderTabContent = () => {
    switch (tab) {
      case "list":
        return <EstateListForm />;
      case "addnewestate":
        return <EstateAdd />;
      case "archive":
        return <EstateArchive />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Navbar />
      <div className="companyname">{companyname}</div>
      <EstateTabSection active={tab} onChange={(current) => setTab(current)} />
      {renderTabContent()}
    </div>
  );
}
