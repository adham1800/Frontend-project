import { Navbar as BNavbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BsShop } from "react-icons/bs";

export default function Navbar() {
  return (
    <BNavbar bg="dark" variant="dark" expand="md">
      <Container>
        {/* Logo + Icon */}
        <BNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2">
          <BsShop size={24} />
          <span>E-Commerce</span>
        </BNavbar.Brand>

        <BNavbar.Toggle aria-controls="main-navbar" />
        <BNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Products
            </Nav.Link>

            <Nav.Link as={NavLink} to="/carts">
              Carts
            </Nav.Link>

            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>

            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}
