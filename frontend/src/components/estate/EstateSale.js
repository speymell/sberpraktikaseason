import { useLocation } from "react-router-dom";

export default function EstateSale() {
  const location = useLocation();
  const estate = location.state.estate;

  return <div></div>;
}
