import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart, updateCart } from "../store/cartSlice";
import { Form, Button } from "react-bootstrap";

const CartForm = ({ cart }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(cart?.userId || "");
  const [products] = useState(cart?.products || []);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { userId, products };

    if (cart) {
      dispatch(updateCart({ id: cart.id, data }));
    } else {
      dispatch(addCart(data));
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Control
        className="mb-3"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Button type="submit">{cart ? "Update Cart" : "Add Cart"}</Button>
    </Form>
  );
};

export default CartForm;
