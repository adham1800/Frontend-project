import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

/* GET ALL USERS (pagination) */
export const getUsers = createAsyncThunk(
  "users/getAll",
  async ({ limit = 10, skip = 0 }) => {
    const res = await API.get(`/users?limit=${limit}&skip=${skip}`);
    return res.data;
  }
);

/* SEARCH USERS */
export const searchUsers = createAsyncThunk("users/search", async (query) => {
  const res = await API.get(`/users/search?q=${query}`);
  return res.data.users;
});

/* GET SINGLE USER */
export const getUser = createAsyncThunk("users/getOne", async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    total: 0,
    selected: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.list = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export default userSlice.reducer;
