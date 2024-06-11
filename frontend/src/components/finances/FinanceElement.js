import "./FinanceElement.css";

export default function FinanceElement(props) {
  const updatedAt = props.updatedAt;
  const formattedDate = new Date(updatedAt).toLocaleString();
  return (
    <div className="finance-element-container">
      <div>{formattedDate}</div>
      <div className="finance-element-price">+{props.price}</div>
    </div>
  );
}
