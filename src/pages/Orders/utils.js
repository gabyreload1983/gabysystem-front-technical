export const callApi = async (path) => {
  const response = await fetch(`http://localhost:8080/api/orders/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    return await response.json();
  }
  return false;
};
