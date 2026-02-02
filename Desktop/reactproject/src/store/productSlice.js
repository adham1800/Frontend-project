import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const getProducts = createAsyncThunk(
  "products/getAll",
  async ({ limit = 10, skip = 0 }) => {
    const res = await API.get(`/products?limit=${limit}&skip=${skip}`);
    return res.data;
  }
);

export const searchProducts = createAsyncThunk("products/search", async (q) => {
  const res = await API.get(`/products/search?q=${q}`);
  return res.data.products;
});

export const getProduct = createAsyncThunk("products/getOne", async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
});

export const getCategories = createAsyncThunk(
  "products/categories",
  async () => {
    const res = await API.get("/products/categories");
    return res.data;
  }
);

export const getByCategory = createAsyncThunk(
  "products/byCategory",
  async (cat) => {
    const res = await API.get(`/products/category/${cat}`);
    return res.data.products;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id) => {
    await API.delete(`/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], total: 0, selected: null, categories: [] },
  reducers: {
    sortProducts(state, action) {
      const key = action.payload;
      state.list.sort((a, b) =>
        key === "title" ? a[key].localeCompare(b[key]) : a[key] - b[key]
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (s, a) => {
        s.list = a.payload.products;
        s.total = a.payload.total;
      })
      .addCase(searchProducts.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(getProduct.fulfilled, (s, a) => {
        s.selected = a.payload;
      })
      .addCase(getCategories.fulfilled, (s, a) => {
        s.categories = a.payload;
      })
      .addCase(getByCategory.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.list = s.list.filter((p) => p.id !== a.payload);
      });
  },
});

export const { sortProducts } = productSlice.actions;
export default productSlice.reducer;
