import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../utils/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Không thể xóa người dùng");
    }
  };

  const handleTogglePremium = async (user) => {
    try {
      const updatedUser = await updateUser(user.id, {
        is_premium: !user.is_premium,
      });
      if (updatedUser) {
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
      }
    } catch (error) {
      setError("Không thể cập nhật trạng thái premium");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "#dc3545", marginBottom: "20px" }}>{error}</div>
    );
  }

  return (
    <div>
      <h2>Quản lý người dùng</h2>

      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Họ tên</th>
              <th style={tableHeaderStyle}>Premium</th>
              <th style={tableHeaderStyle}>Ngày tạo</th>
              <th style={tableHeaderStyle}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={tableCellStyle}>{user.email}</td>
                <td style={tableCellStyle}>{user.full_name}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => handleTogglePremium(user)}
                    style={{
                      padding: "4px 8px",
                      background: user.is_premium ? "#28a745" : "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {user.is_premium ? "Premium" : "Free"}
                  </button>
                </td>
                <td style={tableCellStyle}>
                  {new Date(user.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{
                      padding: "4px 8px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
};

const tableCellStyle = {
  padding: "12px",
};

export default UserManagement;
