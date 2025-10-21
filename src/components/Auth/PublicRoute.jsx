import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function PublicRoute({ children }) {
  const { user } = useAuth();

  // If user is logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the public route content
  return children;
}

export default PublicRoute;
