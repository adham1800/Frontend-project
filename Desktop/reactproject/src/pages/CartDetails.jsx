import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/cartSlice";
import { useParams } from "react-router-dom";
import { Table, Container } from "react-bootstrap";

export const CartDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.carts.selected);

  useEffect(() => {
    dispatch(getCart(id));
  }, [dispatch, id]);

  if (!cart) return null;

  return (
    <Container className="mt-4">
      <h2>Cart #{cart.id}</h2>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((p) => (
            <tr key={p.productId}>
              <td>{p.productId}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
              <td>${p.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Grand Total: ${cart.total}</h4>
    </Container>
  );
};
