import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/productSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

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
            variant="danger"
            onClick={() => dispatch(deleteProduct(product.id))}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
