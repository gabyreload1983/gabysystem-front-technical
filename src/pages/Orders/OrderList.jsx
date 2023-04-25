import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderList({ orders }) {
  const takeOrder = async (nrocompro) => {
    console.log(nrocompro);
  };
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>FECHA</th>
            <th>NRO ORDEN</th>
            <th>CLIENTE</th>
            <th>TIER</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={`${order.nrocompro}`}>
                  <td>{order.ingresado}</td>
                  <td>
                    <Link
                      to={`/orders/${order.nrocompro}`}
                      className="link-order"
                    >
                      {order.nrocompro}
                    </Link>
                  </td>
                  <td>{order.nombre} - </td>
                  <td>{order.prioridad}</td>
                  <td>
                    {order.estado === 21 && (
                      <Link
                        className="btn btn-outline-info"
                        onClick={() => takeOrder(order.nrocompro)}
                        to={`/orders/${order.nrocompro}`}
                      >
                        TOMAR
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
