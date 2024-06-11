import { useState } from "react";
import ClientListAdd from "./ClientsListAdd";
import ClientsListElement from "./ClientsListElement";
import ClientsTabSection from "./ClientsTabSeciton";

export default function ClientsList(props) {
  const [tab, setTab] = useState("list");

  return (
    <>
      {props.clients.map((client) => (
        <ClientsListElement
          name={`${client.lastname} ${client.firstname} ${client.middlename}`}
          email={client.email}
        />
      ))}
    </>
  );
}
