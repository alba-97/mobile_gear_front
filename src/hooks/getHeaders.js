import Cookies from "universal-cookie";

export default function getHeaders() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return { headers: { Authorization: token } };
}
