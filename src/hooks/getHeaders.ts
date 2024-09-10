export default function getHeaders() {
  const jwt = localStorage.getItem("jwt") ?? "";
  return { headers: { Authorization: `Bearer ${jwt}` } };
}
