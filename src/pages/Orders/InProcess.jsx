import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";

export default function InProcess() {
  const [inProcess, setInProcess] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://localhost:3400/api/orders/in-process`
    );
    if (response) setInProcess(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h1>InProcess</h1>
      {inProcess && <OrderList orders={inProcess} />}
    </Container>
  );
}
