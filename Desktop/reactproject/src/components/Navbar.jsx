import { Navbar as BNavbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsShop, BsBoxArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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

            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>

            <Nav.Link as={NavLink} to="/carts">
              Carts
            </Nav.Link>

            {!token ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                <BsBoxArrowRight size={20} />
                Logout
              </Nav.Link>
            )}
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}
