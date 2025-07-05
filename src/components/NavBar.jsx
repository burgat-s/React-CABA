import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";
import { UseUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import useCart from "../context/useCart";


const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = UseUser();
  const [firstRender, setFirstRender] = useState(true);
  const { getTotalQuantity } = useCart();


  useEffect(() => {
    if (firstRender) {
      SwalReact(Swal).fire({
        title: "Información Importante",
        text: "Usuario y contraseña para el login son: juan y 123456. La ruta '/error' muestra manejo de error de API.",
        icon: "info",
        confirmButtonText: "Ok",
      });
      setFirstRender(false);
    }
  }, [firstRender]);

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cositas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user?.admin ? (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/usuarios">
                Usuarios
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={location.pathname === "/" ? "fw-bold" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/electronics"
                className={
                  location.pathname === "/electronics" ? "fw-bold" : ""
                }
              >
                Electronics
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className={location.pathname === "/about" ? "fw-bold" : ""}
              >
                About
              </Nav.Link>
            </Nav>
          )}

          <Nav>
            {!user ? (
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light">Login</Button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link className="mt-2">
                  <span>Hola {user.username} !</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="position-relative d-inline-flex align-items-center"
                >
                  <i className="bi bi-cart-fill fs-4"></i>
                  <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-secondary">
                    {getTotalQuantity()}
                  </span>
                </Nav.Link>
                <Nav.Link className="ml-4">
                  <Button
                    className="ms-2 me-2"
                    variant="outline-light"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
