import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    toast.error("Login to add products");
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
