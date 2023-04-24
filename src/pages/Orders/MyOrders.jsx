import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { callApi } from "./utils";

export default function MyOrders() {
  const { codeTechnical } = useParams();
  const [myOrders, setMyOrders] = useState([]);

  const getOrders = async () => {
    const response = await callApi(`technical/${codeTechnical}`);
    if (response) setMyOrders(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h1>MyOrders</h1>
      {myOrders && <OrderList orders={myOrders} />}
    </Container>
  );
}
