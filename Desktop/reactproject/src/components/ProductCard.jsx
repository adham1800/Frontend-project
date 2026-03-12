import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.username === "admin";

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Col md={4} className="mb-3">
      <Card>
        <Card.Img variant="top" src={product.thumbnail} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Button as={Link} to={`/products/${product.id}`} className="me-2">
            View
          </Button>
          <Button 
            variant="success" 
            onClick={handleAddToCart}
            className="me-2">
            Add to Cart
          </Button>
          {isAdmin && (
            <Button
              variant="danger"
              onClick={() => dispatch(deleteProduct(product.id))}>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
