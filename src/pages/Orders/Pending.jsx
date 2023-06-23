import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { getFromApi, putToApi } from "../../utils";
import Swal from "sweetalert2";
import { UserContext } from "../../context/userContext";

export default function Pending() {
  const { sector } = useParams();
  const [pendings, setPendings] = useState([]);
  const { user } = useContext(UserContext);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/pending/${sector}`
    );
    if (response.status === "success") setPendings(response.payload);
  };

  const takeOrder = async (nrocompro) => {
    try {
      const response = await Swal.fire({
        text: `Queres tomar la orden ${nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;
      const data = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/take`,
        {
          nrocompro: `${nrocompro}`,
          code_technical: `${user.code_technical}`,
        }
      );
      if (data.status === "error")
        return Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      if (data.status === "success") {
        await getOrders();

        await Swal.fire({
          toast: true,
          icon: "success",
          text: "Orden tomada",
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
    } catch (error) {
      Swal.fire({
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, [sector]);

  return (
    <Container>
      <h3 className="text-center mt-3">
        <span className="badge bg-warning">TOTAL {pendings.length}</span>
      </h3>

      {pendings && <OrderList orders={pendings} onTakeOrder={takeOrder} />}
    </Container>
  );
}
