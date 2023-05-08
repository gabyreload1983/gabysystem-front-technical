import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../context/userContext";
import { postToApi } from "../../utils";
import Swal from "sweetalert2";

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
    const response = await postToApi(
      `${import.meta.env.VITE_PREFIX_API}/users/login`,
      loginUser
    );
    if (response.status === "error")
      return Swal.fire({
        text: `${response.message}`,
        icon: "error",
      });
    if (response.status === "success") {
      const { accessToken } = response;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);

        setUser(response.user);

        await Swal.fire({
          toast: true,
          icon: "success",
          text: "Login success",
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
