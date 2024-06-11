import "./FormList.css";
import FormElement from "./FormElement";
import NewWorker from "../company/NewWorker";
import React, { useState } from "react";

export default function FormList(props) {
  const [workers, setWorkers] = useState(props.workers);

  const handleNewWorker = (newWorker) => {
    props.onAddWorker(newWorker);
  };
  return (
    <div className="form-list">
      <NewWorker onInvite={handleNewWorker} onAddWorker={props.onAddWorker} />
      {props.workers.map((worker) => (
        <FormElement
          onDeleteWorker={props.onDeleteWorker}
          name={`${worker.lastname} ${worker.firstname} ${worker.middlename}`}
          id={worker.id}
        />
      ))}
    </div>
  );
}
