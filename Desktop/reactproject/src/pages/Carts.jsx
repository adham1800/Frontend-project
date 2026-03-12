import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../store/cartSlice";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export default function Carts() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.carts.items);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="mt-4">Your cart is empty</p>
      ) : (
        <>
          <Row className="mt-4">
            <Col>
              {items.map((item) => (
                <Card key={item.id} className="mb-3">
                  <Card.Body>
                    <Row>
                      <Col md={2}>
                        <img src={item.thumbnail} width="100%" alt={item.title} />
                      </Col>
                      <Col md={5}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>${item.price}</Card.Text>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="d-flex align-items-center gap-2">
                          <Form.Label className="mb-0">Qty:</Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value))
                            }
                            style={{ width: "60px" }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2} className="text-end">
                        <p className="mb-2">
                          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        </p>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemove(item.id)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12} className="text-end">
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
              <Button 
                variant="primary" 
                size="lg"
                className="mt-3"
               >
                Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
