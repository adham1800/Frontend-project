import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}
