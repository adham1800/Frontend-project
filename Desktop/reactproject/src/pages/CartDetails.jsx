import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";

const CartDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((s) => s.carts.selected);

  useEffect(() => {
    if (id) {
      dispatch(getCart(id));
    }
  }, [dispatch, id]);

  if (!cart) {
    return (
      <Container className="mt-5">
        <p>Loading cart details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate("/carts")} className="mb-3">
        Back to Carts
      </Button>

      <h2>Cart #{cart.id}</h2>
      <p className="text-muted">User ID: {cart.userId}</p>

      <Table striped bordered className="mt-4">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.products && cart.products.map((p) => (
            <tr key={p.productId}>
              <td>{p.productId}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
              <td>${p.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mt-4">Grand Total: ${cart.total}</h4>
    </Container>
  );
};

export default CartDetails;
