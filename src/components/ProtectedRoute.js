import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useSelector((state) => state.Auth);

  return isUserLoggedIn === true ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
