import { useState } from "react";
import { api } from "../../utils/api";

function UnlockButton({ vocabularyId, onUnlock }) {
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    try {
      setLoading(true);
      await api.post(`/premium/unlock/${vocabularyId}`);
      onUnlock();
    } catch (error) {
      alert("Không thể mở khóa từ này. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUnlock}
      disabled={loading}
      style={{
        padding: "8px 16px",
        background: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      {loading ? "Đang mở khóa..." : "Mở khóa từ này"}
    </button>
  );
}

export default UnlockButton;
