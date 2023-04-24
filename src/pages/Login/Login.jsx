import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../context/userContext";

export default function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const login = async () => {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.status === "success") {
      const { accessToken } = json;

      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
        console.log(json.user);
        setUser(json.user);
        // window.location.replace("/");
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
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
            <Button onClick={login} variant="primary">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
