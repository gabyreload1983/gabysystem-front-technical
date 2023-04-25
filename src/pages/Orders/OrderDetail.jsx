import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { callApi } from "./utils";
import ProductsInOrder from "./ProductsInOrder";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrders = async () => {
    const response = await callApi(id);
    if (response) setOrder(response[0]);
  };

  useEffect(() => {
    getOrders();
  }, [id]);

  return (
    <>
      {order && (
        <Container>
          <h2>
            {order.nombre} - {order.nrocompro}
          </h2>
          <Row>
            <Col xs={6}>
              <p>ESTADO: {order.estado}</p>
              <p>DIAGNOSTICO: {order.diag}</p>
              <p>UBICACION: {order.ubicacion}</p>
              <p>FECHA INGRESO: {order.ingresado}</p>
              <p>PRIORIDAD: {order.prioridad}</p>
              <p>VENDEDOR: {order.operador}</p>
            </Col>
            <Col xs={6}>
              <p>TELEFONO: {order.telefono}</p>
              <p>ARTICULO: {order.descart}</p>
              <p>FALLA: {order.falla}</p>
              <p>ACCESORIOS: {order.accesorios}</p>
              <p>TECNICO: {order.tecnico}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>DETALLE</h3>
              <ProductsInOrder order={order} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary">Reparado</Button>
                <Button variant="danger">Sin Reparacion</Button>
              </ButtonGroup>
            </Col>
            <Col className="text-end">
              <ButtonGroup aria-label="Basic example">
                <Button variant="warning">Liberar</Button>
                <Button variant="info">Guardar</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
