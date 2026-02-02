import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCart } from "../store/cartSlice";

const CartCard = ({ cart }) => {
  const dispatch = useDispatch();

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Cart #{cart.id}</Card.Title>
        <Card.Text>User ID: {cart.userId}</Card.Text>
        <Card.Text>Total: ${cart.total}</Card.Text>

        <Button as={Link} to={`/carts/${cart.id}`} className="me-2">
          View
        </Button>
        <Button variant="danger" onClick={() => dispatch(deleteCart(cart.id))}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartCard;
