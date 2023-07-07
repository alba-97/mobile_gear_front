export default function getHeaders() {
  const jwt = localStorage.getItem("jwt");
  console.log("JWT", jwt);
  return { headers: { Authorization: `Bearer ${jwt}` } };
}
