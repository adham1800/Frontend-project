import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productSlice";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: product } = useSelector((s) => s.products);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  if (!product) {
    return (
      <Container className="mt-5">
        <p>Loading product details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={product.thumbnail} width="100%" alt={product.title} />
        </div>
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <h4 className="text-primary mt-3">${product.price}</h4>
          <p className="mt-3">{product.description}</p>
          {product.rating && <p><strong>Rating:</strong> {product.rating}/5</p>}
          {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock}</p>}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
