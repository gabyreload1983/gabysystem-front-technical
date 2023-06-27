import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function InProcess() {
  const [inProcess, setInProcess] = useState([]);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/in-process`
    );
    if (response.status === "success") return setInProcess(response.payload);
    if (response.status === "error") {
      logoutUserContext();
      return navigate("/login");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h3 className="text-center mt-3">
        <span className="badge bg-info">TOTAL {inProcess.length}</span>
      </h3>
      {inProcess && <OrderList orders={inProcess} />}
    </Container>
  );
}
