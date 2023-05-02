import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderList({ orders, onTakeOrder }) {
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
          {orders.length > 0 &&
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
                      <Button
                        variant="outline-success"
                        onClick={() => onTakeOrder(order.nrocompro)}
                      >
                        TOMAR
                      </Button>
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
