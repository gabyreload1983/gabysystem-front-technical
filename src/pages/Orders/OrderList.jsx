import React from "react";

export default function OrderList({ orders }) {
  return (
    <>
      {orders &&
        orders.map((order) => {
          return (
            <div key={order.nrocompro}>
              <p>
                {order.nrocompro} - {order.codigo} - {order.nombre} -{" "}
                {order.tecnico}
              </p>
            </div>
          );
        })}
    </>
  );
}
