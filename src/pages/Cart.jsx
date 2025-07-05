import React from "react";
import useCart from "../context/useCart";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h3>Tu carrito está vacío 🛒</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Carrito de Compras</h3>
      <Row className="g-4">
        {cart.map((item) => (
          <Col md={6} lg={4} key={item.id}>
            <Card className="h-100">
              <div
                style={{
                  height: "200px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  Cantidad: {item.quantity} <br />
                  Precio: ${item.price.toFixed(2)} <br />
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h4>Total: ${total.toFixed(2)}</h4>
        <Button variant="outline-danger" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
