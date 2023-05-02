import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductsInOrder from "./ProductsInOrder";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getFromApi } from "../../../utils";

export default function OrderDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const getOrders = async () => {
    const response = await getFromApi(
      `${import.meta.env.VITE_PREFIX_API}/orders/${id}`
    );
    if (response) setOrder(response[0]);
  };

  useEffect(() => {
    getOrders();
  }, [id]);

  return (
    <>
      {order && (
        <Container className="mt-3">
          <Button variant="outline-secondary" onClick={goBack}>
            &larr; <span>Volver</span>
          </Button>
          <h2>
            {order.nombre} - {order.nrocompro}
          </h2>
          <Row>
            <Col xs={12} md={6}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>ESTADO</td>
                    <td>{order.estado}</td>
                  </tr>
                  <tr>
                    <td>DIAGNOSTICO</td>
                    <td>{order.diag}</td>
                  </tr>
                  <tr>
                    <td>UBICACION</td>
                    <td>{order.ubicacion}</td>
                  </tr>
                  <tr>
                    <td>FECHA INGRESO</td>
                    <td>{order.ingresado}</td>
                  </tr>
                  <tr>
                    <td>PRIORIDAD</td>
                    <td>{order.prioridad}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12} md={6}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>TELEFONO</td>
                    <td>{order.telefono}</td>
                  </tr>
                  <tr>
                    <td>ARTICULO</td>
                    <td>{order.descart}</td>
                  </tr>
                  <tr>
                    <td>ACCESORIOS</td>
                    <td>{order.accesorios}</td>
                  </tr>
                  <tr>
                    <td>VENDEDOR</td>
                    <td>{order.operador}</td>
                  </tr>
                  <tr>
                    <td>TECNICO</td>
                    <td>{order.tecnico}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>
                      FALLA: <span>{order.falla}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>
                      DIAGNOSTICO: <span>{order.diagnostico}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
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
              {order.estado === 22 &&
                order.tecnico === user?.code_technical && (
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="primary">Reparado</Button>
                    <Button variant="danger">Sin Reparacion</Button>
                    <Button variant="info">Guardar</Button>
                  </ButtonGroup>
                )}
            </Col>
            <Col className="text-end">
              {order.estado === 22 && (
                <ButtonGroup aria-label="Basic example">
                  <Button variant="warning">Liberar</Button>
                </ButtonGroup>
              )}
              {order.estado === 21 && (
                <ButtonGroup aria-label="Basic example">
                  <Button variant="outline-success">Tomar</Button>
                </ButtonGroup>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
