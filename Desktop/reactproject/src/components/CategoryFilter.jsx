import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getByCategory } from "../store/productSlice";
import { Form } from "react-bootstrap";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.products.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Form.Select onChange={(e) => dispatch(getByCategory(e.target.value))}>
      <option>All Categories</option>
      {categories.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default CategoryFilter;
