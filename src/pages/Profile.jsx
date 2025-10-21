import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { api } from "../utils/api";
import PremiumBadge from "../components/Premium/PremiumBadge";

function Profile() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Mật khẩu mới không khớp");
        }
        if (formData.newPassword.length < 6) {
          throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự");
        }
      }

      await api.put("/auth/profile", {
        full_name: formData.fullName,
        current_password: formData.currentPassword,
        new_password: formData.newPassword || undefined,
      });

      setSuccess("Cập nhật thông tin thành công");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setError(err.message || "Không thể cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1>Thông tin tài khoản</h1>
        <p style={{ color: "#666" }}>{user.email}</p>
        {user.is_premium && (
          <div style={{ marginTop: "10px" }}>
            <PremiumBadge expiresAt={user.premium_expires_at} />
          </div>
        )}
      </div>

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
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Họ tên:
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
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
            Mật khẩu hiện tại:
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
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
            Mật khẩu mới (không bắt buộc):
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
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
            Xác nhận mật khẩu mới:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
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
            marginBottom: "20px",
          }}
        >
          {loading ? "Đang xử lý..." : "Cập nhật thông tin"}
        </button>
      </form>

      <button
        onClick={logout}
        style={{
          width: "100%",
          padding: "10px",
          background: "white",
          color: "#dc3545",
          border: "1px solid #dc3545",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Profile;
