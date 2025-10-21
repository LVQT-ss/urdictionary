import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PremiumBadge from "../Premium/PremiumBadge";
import StreakBadge from "../StreakBadge";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "white",
        padding: "15px 20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/"
            style={{
              fontSize: "24px",
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            📚 VocabApp
          </Link>

          {user && (
            <nav style={{ display: "flex", gap: "20px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
                Thêm từ
              </Link>
              <Link
                to="/dictionary"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Từ điển
              </Link>
              {user.is_admin && (
                <Link
                  to="/admin/users"
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  Quản lý
                </Link>
              )}
            </nav>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {user ? (
            <>
              {user.is_premium && (
                <PremiumBadge expiresAt={user.premium_expires_at} />
              )}
              <StreakBadge
                streak={user.streak}
                longest_streak={user.longest_streak}
              />
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "#333" }}
              >
                {user.full_name || user.email}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #dc3545",
                  borderRadius: "4px",
                  background: "white",
                  color: "#dc3545",
                  cursor: "pointer",
                }}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: "8px 16px",
                  border: "1px solid #007bff",
                  borderRadius: "4px",
                  background: "white",
                  color: "#007bff",
                  textDecoration: "none",
                }}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  background: "#007bff",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
