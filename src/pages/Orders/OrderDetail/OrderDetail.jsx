import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductsInOrder from "./ProductsInOrder";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getFromApi, putToApi } from "../../../utils";
import Swal from "sweetalert2";
import {
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../orderUtils";
import moment from "moment/moment";

export default function OrderDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [price, setPrice] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const getOrder = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/${id}`
    );
    if (response.status === "error") {
      Swal.fire({
        text: `${response.message}`,
        icon: "error",
      });
    }

    if (response.status === "success") {
      const order = response.payload;
      setOrder(order);
      setDiagnosis(order.diagnostico);
      setPrice(Number(order.costo));
      setTotal(Number(order.total));
    }
  };

  const handleDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const handlePrice = (e) => {
    const lastCharacter = Number(e.target.value[e.target.value.length - 1]);
    if (isNaN(lastCharacter)) return;

    setTotal((prevTotal) => {
      return prevTotal - price + Number(e.target.value);
    });
    setPrice(Number(e.target.value));
  };

  const updateOrder = async () => {
    try {
      const response = await Swal.fire({
        text: `Actualizar orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;
      const data = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/update`,
        {
          nrocompro: `${order.nrocompro}`,
          code_technical: `${user.code_technical}`,
          diagnostico: diagnosis,
          costo: price,
        }
      );

      if (data.status === "error")
        return Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      if (data.status === "success") {
        await getOrder();

        await Swal.fire({
          toast: true,
          icon: "success",
          text: "Orden actualizada",
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

  const closeOrder = async (diag) => {
    try {
      const orderToClose = {
        nrocompro: order.nrocompro,
        diagnostico: diagnosis,
        costo: price,
        code_technical: user.code_technical,
        diag,
      };
      const response = await Swal.fire({
        text: `Cerrar orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;

      const notification = await Swal.fire({
        text: `Enviar notificacion por email?`,
        showCancelButton: true,
        cancelButtonText: "Cerrar Sin Notificacion",
        confirmButtonText: "Cerrar y Enviar Email",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      if (notification.isConfirmed) orderToClose.notification = true;

      const data = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/close`,
        orderToClose
      );

      if (data.status === "error")
        return Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      if (data.status === "success") {
        await getOrder();

        await Swal.fire({
          toast: true,
          icon: "success",
          text: "Orden Cerrada exitosamente",
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

  const freeOrder = async () => {
    try {
      const orderToFree = {
        nrocompro: order.nrocompro,
        code_technical: user.code_technical,
      };
      const response = await Swal.fire({
        text: `Liberar orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;

      const data = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/free`,
        orderToFree
      );

      if (data.status === "error")
        return Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      if (data.status === "success") {
        await getOrder();

        await Swal.fire({
          toast: true,
          icon: "success",
          text: "Orden Liberada exitosamente",
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

  const takeOrder = async () => {
    try {
      const response = await Swal.fire({
        text: `Queres tomar la orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;
      const data = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/take`,
        {
          nrocompro: `${order.nrocompro}`,
          code_technical: `${user.code_technical}`,
        }
      );
      if (data.status === "error")
        return Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      if (data.status === "success") {
        await getOrder();

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
    getOrder();
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
                    <td>{getOrderState(order.estado)}</td>
                  </tr>
                  <tr>
                    <td>DIAGNOSTICO</td>
                    <td>{getOrderDiagnosis(order.diag)}</td>
                  </tr>
                  <tr>
                    <td>UBICACION</td>
                    <td>{getOrderUbication(order.ubicacion)}</td>
                  </tr>
                  <tr>
                    <td>FECHA INGRESO</td>
                    <td>
                      {moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}
                    </td>
                  </tr>
                  <tr>
                    <td>PRIORIDAD</td>
                    <td className={getOrderTierBackground(order.prioridad)}>
                      {getOrderTier(order.prioridad)}
                    </td>
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
                      <InputGroup>
                        <InputGroup.Text>DIAGNOSTICO</InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          value={diagnosis}
                          onChange={handleDiagnosis}
                          rows="5"
                        />
                      </InputGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>DETALLE</h3>
              <ProductsInOrder
                order={order}
                total={total}
                price={price}
                onHandlePrice={handlePrice}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {order.estado === 22 &&
                order.tecnico === user?.code_technical && (
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="primary" onClick={() => closeOrder(22)}>
                      Reparado
                    </Button>
                    <Button variant="danger" onClick={() => closeOrder(23)}>
                      Sin Reparacion
                    </Button>
                    <Button variant="info" onClick={updateOrder}>
                      Guardar
                    </Button>
                  </ButtonGroup>
                )}
            </Col>
            <Col className="text-end">
              {order.estado === 22 &&
                order.tecnico === user?.code_technical && (
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="warning" onClick={freeOrder}>
                      Liberar
                    </Button>
                  </ButtonGroup>
                )}
              {order.estado === 21 && (
                <ButtonGroup aria-label="Basic example">
                  <Button variant="outline-success" onClick={takeOrder}>
                    Tomar
                  </Button>
                </ButtonGroup>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
