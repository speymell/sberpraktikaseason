export default function checkToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
}
