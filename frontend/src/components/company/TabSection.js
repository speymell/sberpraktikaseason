import Button from "./Button";
import "./TabSection.css";

export default function TabSection({ active, onChange }) {
  return (
    <section className="tab-buttons">
      <Button
        isActive={active == "workers"}
        onClick={() => onChange("workers")}
      >
        Сотрудники
      </Button>
      <Button isActive={active == "manage"} onClick={() => onChange("manage")}>
        Управление
      </Button>
    </section>
  );
}
