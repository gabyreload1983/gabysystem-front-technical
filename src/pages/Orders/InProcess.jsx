import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";

export default function InProcess() {
  const [inProcess, setInProcess] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}:3400/api/orders/in-process`
    );
    if (response) setInProcess(response);
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
