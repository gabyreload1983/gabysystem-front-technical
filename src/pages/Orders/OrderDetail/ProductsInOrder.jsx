import React from "react";
import { Form, InputGroup, Table } from "react-bootstrap";

export default function ProductsInOrder({
  order,
  total,
  price,
  onHandlePrice,
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Descripcion</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>.ST</td>
          <td>Mano de Obra</td>
          <td className="custom-td text-end">
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control value={price} onChange={onHandlePrice} />
            </InputGroup>
          </td>
        </tr>
        {order.products.map((p, index) => {
          return (
            <tr key={`${p.nrocompro}${index}`}>
              <td>{p.codigo}</td>
              <td>{p.descrip}</td>

              <td className="custom-td text-end">
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <InputGroup.Text>${p.lista1}</InputGroup.Text>
                </InputGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td className="custom-td text-end">
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <InputGroup.Text>{total}</InputGroup.Text>
            </InputGroup>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}
