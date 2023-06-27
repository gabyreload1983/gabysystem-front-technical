import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";
import { UserContext } from "../../context/userContext";

export default function MyOrders() {
  const { codeTechnical } = useParams();
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate();
  const { logoutUserContext } = useContext(UserContext);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${
        import.meta.env.VITE_URL_HOST
      }/api/orders/technical/${codeTechnical}`
    );
    if (response.status === "success") return setMyOrders(response.payload);
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
        <span className="badge bg-success">TOTAL {myOrders.length}</span>
      </h3>
      {myOrders && <OrderList orders={myOrders} />}
    </Container>
  );
}
