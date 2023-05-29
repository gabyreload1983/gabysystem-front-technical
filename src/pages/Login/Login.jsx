import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../context/userContext";
import { postToApi } from "../../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { loginUserContext } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const login = async () => {
    setIsLogin(true);
    const response = await postToApi(
      `${import.meta.env.VITE_PREFIX_API}/users/login`,
      loginForm
    );
    if (response.status === "error") {
      setIsLogin(false);
      return Swal.fire({
        text: `${response.message}`,
        icon: "error",
      });
    }
    if (response.status === "success") {
      const { user, accessToken } = response;

      loginUserContext(user, accessToken);

      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Login success",
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        didClose: () => {
          navigate("/");
        },
      });
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
            <Button onClick={login} variant="primary" disabled={isLogin}>
              {isLogin ? "Wait..." : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
