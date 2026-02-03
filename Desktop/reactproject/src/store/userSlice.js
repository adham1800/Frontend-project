import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";


export const getUsers = createAsyncThunk(
  "users/getAll",
  async ({ limit = 10, skip = 0 }) => {
    const res = await API.get(`/users?limit=${limit}&skip=${skip}`);
    return res.data;
  }
);


export const searchUsers = createAsyncThunk("users/search", async (query) => {
  const res = await API.get(`/users/search?q=${query}`);
  return res.data.users;
});


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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export default userSlice.reducer;
