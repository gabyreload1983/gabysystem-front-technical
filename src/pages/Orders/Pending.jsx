import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { callApi } from "./utils";

export default function Pending() {
  const { sector } = useParams();
  const [pendings, setPendings] = useState([]);

  const getOrders = async () => {
    const response = await callApi(`pending/${sector}`);
    if (response) setPendings(response);
  };

  useEffect(() => {
    getOrders();
  }, [sector]);

  return (
    <Container>
      <h1>Pendings {sector}</h1>
      {pendings && <OrderList orders={pendings} />}
    </Container>
  );
}
