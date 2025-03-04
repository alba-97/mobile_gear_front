export default () => {
  const authStateStr = localStorage.getItem("authState") || "{}";
  const authState = JSON.parse(authStateStr);
  const token = authState?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
