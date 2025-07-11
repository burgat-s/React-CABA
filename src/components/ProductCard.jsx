import { Card, Button } from 'react-bootstrap';
import useCart from "../context/useCart.js";


  
const ProductCard = ({product}) => {
    const { id, description, price, image } = product;
    const { addToCart } = useCart();
  const validateAndAddToCart = (product) => {
    console.log(localStorage.getItem("auth"));
    if (localStorage.getItem("auth") == "true") {
      addToCart(product);
    } else {
      alert("Debes iniciar sesión para agregar productos al carrito.");
    }
  };
    const truncateDescription = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };
    
    return (
      <Card
        className="d-flex flex-column h-100"
        style={{ width: "18rem", gap: "1rem" }}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={`Product ${id}`}
          className="img-fluid m-3"
          style={{
            objectFit: "contain",
            height: "200px",
            width: "calc(100% - 2rem)",
          }}
        />
        <Card.Body className="flex-grow-1 d-flex flex-column">
          <Card.Text
            style={{
              flex: "1 1 auto",
              whiteSpace: "pre-line",
              maxHeight: "90px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {truncateDescription(description, 200)}
          </Card.Text>
          <Card.Text className="mt-auto" style={{ height: "30px" }}>
            <strong>Price: </strong>${price}
          </Card.Text>
          <Button
            variant="primary"
            className="mt-auto"
            style={{ width: "100%" }}
            onClick={() => validateAndAddToCart(product)}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    );
};

export default ProductCard;

