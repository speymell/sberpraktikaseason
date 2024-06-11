import "./Button.css";

export default function Button({ children, onClick, isActive }) {
  return (
    <button
      className={isActive ? "company-button active" : "company-button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
