import Button from "../company/Button";
import "./../company/TabSection.css";
export default function EstateTabSection({ active, onChange }) {
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
      <Button
        isActive={active == "archive"}
        onClick={() => onChange("archive")}
      >
        Архив
      </Button>
    </section>
  );
}
