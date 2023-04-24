import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    code_technical: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const register = async () => {
    console.log(user);
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.status === "success") {
      window.location.replace("/login");
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Nombre"
                name="first_name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Apellido"
                name="last_name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="code_technical">
              <Form.Label>Usuario Urbano</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Usuario Urbano"
                name="code_technical"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button onClick={register} variant="primary">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
