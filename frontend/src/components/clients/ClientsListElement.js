export default function ClientsListElement(props) {
  return (
    <div className="form-element client">
      <div className="form-element__name">{props.name}</div>
      <div className="">{props.email}</div>
    </div>
  );
}
