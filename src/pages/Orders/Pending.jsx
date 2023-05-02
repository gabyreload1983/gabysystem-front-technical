import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";

export default function Pending() {
  const { sector } = useParams();
  const [pendings, setPendings] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `${import.meta.env.VITE_PREFIX_API}/orders/pending/${sector}`
    );
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
