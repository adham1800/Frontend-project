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
  initialState: { list: [], selected: null, items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1
        });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    }
  },
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

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
