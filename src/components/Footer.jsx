import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <Container>
        <p className="mb-0 text-center">
          Cocitas de la red. <i className="bi bi-shop text-danger"></i>
        </p> 
      </Container>
    </footer>
  );
}
