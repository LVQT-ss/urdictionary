import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await register(email, password, fullName);
      setSuccess(true);
      // Clear form
      setEmail("");
      setPassword("");
      setFullName("");
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.",
          },
        });
      }, 2000);
    } catch (error) {
      setError("Không thể đăng ký. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Đăng ký</h1>

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
          Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Họ tên:
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            minLength={6}
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
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Đã có tài khoản?{" "}
        <Link to="/login" style={{ color: "#007bff" }}>
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default Register;
