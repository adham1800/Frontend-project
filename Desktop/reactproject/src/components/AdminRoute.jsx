import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Change this to the username you want to grant admin access to
const ADMIN_USERNAME = "admin";

export const AdminRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if user is the admin
  if (!user || user.username !== ADMIN_USERNAME) {
    return <Navigate to="/" />;
  }

  return children;
};
