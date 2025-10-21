import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user is admin
  if (!user || user.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
