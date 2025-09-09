import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return null; // wait until auth is loaded
  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
