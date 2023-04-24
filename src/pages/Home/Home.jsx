import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Container } from "react-bootstrap";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <h1>
        Bienvenido{" "}
        <strong>
          {user?.first_name} {user?.last_name}
        </strong>
      </h1>
    </Container>
  );
}
