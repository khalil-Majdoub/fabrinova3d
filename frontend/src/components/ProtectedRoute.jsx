import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user, loading } = useAuth();
  if (loading) return <main className="login-page"><p className="mono">AUTHENTICATING…</p></main>;
  if (!token) return <Navigate to={allowedRoles ? "/admin/login" : "/login"} replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/account" replace />;
  }
  return children;
};

export default ProtectedRoute;
