import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  searchProducts,
  sortProducts,
} from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import { Container, Row, Form } from "react-bootstrap";

const Products = () => {
  const dispatch = useDispatch();
  const { list, total } = useSelector((s) => s.products);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getProducts({ limit: 10, skip: page * 10 }));
  }, [dispatch, page]);

  return (
    <Container>
      <Form.Control
        placeholder="Search products..."
        className="my-3"
        onChange={(e) => dispatch(searchProducts(e.target.value))}
      />

      <CategoryFilter />

      <Form.Select
        className="my-3"
        onChange={(e) => dispatch(sortProducts(e.target.value))}>
        <option>Sort by</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="title">Title</option>
      </Form.Select>

      <Row>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Row>

      <Pagination total={total} setPage={setPage} />
    </Container>
  );
};

export default Products;
