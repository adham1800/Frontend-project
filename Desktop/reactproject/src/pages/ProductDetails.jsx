import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productSlice";
import { useParams } from "react-router-dom";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((s) => s.products.selected);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (!product) return null;

  return (
    <div className="p-5">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} width="300" />
      <p>{product.description}</p>
      <h4>${product.price}</h4>
    </div>
  );
};
