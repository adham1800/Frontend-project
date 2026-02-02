import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../store/cartSlice";
import CartCard from "../components/CartCard";

export default function Carts() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.list);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  return (
    <div>
      <h2>Carts</h2>
      {carts.map((c) => (
        <CartCard key={c.id} cart={c} />
      ))}
    </div>
  );
}
