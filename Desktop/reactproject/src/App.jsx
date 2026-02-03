import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Carts from "./pages/Carts";
import CartDetails from "./pages/CartDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/carts/:id" element={<CartDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}
