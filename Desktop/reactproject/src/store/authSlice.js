import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      // Store user in localStorage for demo purposes
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      if (users.some(u => u.username === data.username)) {
        return thunkAPI.rejectWithValue("Username already exists");
      }
      
      // Add new user
      const newUser = {
        id: Date.now(),
        username: data.username,
        email: data.email,
        password: data.password,
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Generate a mock token
      const token = btoa(`${data.username}:${Date.now()}`);
      
      return { token, user: newUser };
    } catch (error) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      // First check local users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        u => u.username === data.username && u.password === data.password
      );
      
      if (user) {
        const token = btoa(`${data.username}:${Date.now()}`);
        return { token, user };
      }
      
      // If not in local storage, try DummyJSON API
      const res = await API.post("/auth/login", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

export const fetchUser = createAsyncThunk("auth/me", async () => {
  const res = await API.get("/auth/me");
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
