import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";

export default function PrivateRoute({ children }) {
  const { loggedUser } = useSelector((store) => store.user);
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!loggedUser?.success && !token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && token) {
    return children;
  }

  return <Spinner />;
}
