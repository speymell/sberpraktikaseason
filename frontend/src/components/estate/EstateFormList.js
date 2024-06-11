import EstateFormElement from "./EstateFormElement";

export default function EstateFormList(props) {
  return (
    <div className="form-list">
      {/* {props.estates.map((estate) => ( */}
      <EstateFormElement
      //   name={`${estate.name} ${estate.adress} ${estate.price}`}
      />
      {/* ))} */}
    </div>
  );
}
