import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { api } from "../utils/api";
import PremiumBadge from "../components/Premium/PremiumBadge";
import StreakBadge from "../components/StreakBadge";

function Profile() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.full_name || "",
    bio: user?.bio || "",
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
        bio: formData.bio,
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <p style={{ color: "#666", margin: 0 }}>{user.email}</p>
          {user.is_premium && (
            <PremiumBadge expiresAt={user.premium_expires_at} />
          )}
          <StreakBadge
            streak={user.streak}
            longest_streak={user.longest_streak}
          />
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={statBoxStyle}>
            <span style={statLabelStyle}>Ngày học liên tiếp</span>
            <span style={statValueStyle}>{user.streak} ngày</span>
          </div>
          <div style={statBoxStyle}>
            <span style={statLabelStyle}>Chuỗi dài nhất</span>
            <span style={statValueStyle}>{user.longest_streak} ngày</span>
          </div>
          <div style={statBoxStyle}>
            <span style={statLabelStyle}>Vai trò</span>
            <span style={statValueStyle}>{user.role}</span>
          </div>
        </div>
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
            Giới thiệu:
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minHeight: "100px",
              resize: "vertical",
            }}
            placeholder="Viết một vài điều về bản thân..."
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

const statBoxStyle = {
  flex: 1,
  padding: "15px",
  background: "#f8f9fa",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
};

const statLabelStyle = {
  fontSize: "12px",
  color: "#666",
  textAlign: "center",
};

const statValueStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
};

export default Profile;
