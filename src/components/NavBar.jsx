import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GabySystem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/profile">
                Perfil
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/customers">
                Clientes
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products">
                Productos
              </Nav.Link>
              <Nav.Link as={NavLink} to="/orders">
                Ordenes de trabajo
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
