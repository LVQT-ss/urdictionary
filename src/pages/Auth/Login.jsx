import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Đăng nhập</h1>

      {success && (
        <div
          style={{
            padding: "10px",
            background: "#efe",
            color: "#080",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "10px",
            background: "#fee",
            color: "#c00",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Mật khẩu:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Chưa có tài khoản?{" "}
        <Link to="/register" style={{ color: "#007bff" }}>
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}

export default Login;
