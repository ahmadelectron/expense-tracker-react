import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // اگر لاگین نبود، بفرستش به صفحه ثبت‌نام
    return <Navigate to="/register" replace />;
  }

  // اگر لاگین بود، اجازه بده محتوا (داشبورد) رندر شود
  return children;
};

export default ProtectedRoute;
