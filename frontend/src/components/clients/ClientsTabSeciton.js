import Button from "../company/Button";

export default function ClientsTabSection({ active, onChange }) {
  return (
    <section className="tab-buttons">
      <Button isActive={active == "list"} onClick={() => onChange("list")}>
        Список
      </Button>
      <Button
        isActive={active == "addnewestate"}
        onClick={() => onChange("addnewestate")}
      >
        Добавить
      </Button>
    </section>
  );
}
