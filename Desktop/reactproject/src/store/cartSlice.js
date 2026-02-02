import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const getCarts = createAsyncThunk("carts/all", async () => {
  const res = await API.get("/carts");
  return res.data.carts;
});

export const getCart = createAsyncThunk("carts/one", async (id) => {
  const res = await API.get(`/carts/${id}`);
  return res.data;
});

export const getUserCarts = createAsyncThunk("carts/user", async (id) => {
  const res = await API.get(`/carts/user/${id}`);
  return res.data.carts;
});

export const deleteCart = createAsyncThunk("carts/delete", async (id) => {
  await API.delete(`/carts/${id}`);
  return id;
});

const cartSlice = createSlice({
  name: "carts",
  initialState: { list: [], selected: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarts.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(getCart.fulfilled, (s, a) => {
        s.selected = a.payload;
      })
      .addCase(getUserCarts.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(deleteCart.fulfilled, (s, a) => {
        s.list = s.list.filter((c) => c.id !== a.payload);
      });
  },
});

export default cartSlice.reducer;
