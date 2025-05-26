import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth") === "true";
  const username = localStorage.getItem("username");
  const firstRender = localStorage.getItem("firstRender");

  if (firstRender !== "true") {
    localStorage.setItem("firstRender", "true");
    SwalReact(Swal).fire({
      title: "Informacion Importante",
      text: "Usuario y contraseña para  el login son: juan y 123456. La ruta '/error' muestra manejo de error de api", 
      icon: "info",
      confirmButtonText: "Ok",
    });
  }
  const cerrarSesion = () => {
    localStorage.removeItem("auth");
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
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/electronics">
              Electronics
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            {!isAuth ? (
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light">Login</Button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link className="mt-2">
                  <span>Hola {username} !</span>
                </Nav.Link>
                <Nav.Link className="position-relative d-inline-flex align-items-center ">
                  <i className="bi bi-cart-fill fs-4 "></i>
                  <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-secondary">
                    3
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
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;