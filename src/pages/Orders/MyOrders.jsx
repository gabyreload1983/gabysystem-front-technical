import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";

export default function MyOrders() {
  const { codeTechnical } = useParams();
  const [myOrders, setMyOrders] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${
        import.meta.env.VITE_URL_HOST
      }/api/orders/technical/${codeTechnical}`
    );
    if (response.status === "success") setMyOrders(response.payload);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h3 className="text-center mt-3">
        <span className="badge bg-success">TOTAL {myOrders.length}</span>
      </h3>
      {myOrders && <OrderList orders={myOrders} />}
    </Container>
  );
}
