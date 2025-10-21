import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
import UnlockButton from "../components/Premium/UnlockButton";

function VocabularyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [vocabulary, setVocabulary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    fetchVocabulary();
  }, [id]);

  const fetchVocabulary = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vocabularies/${id}`);
      setVocabulary(response.data);
      setIsUnlocked(response.data.is_unlocked);
    } catch (error) {
      setError("Không thể tải thông tin từ vựng");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa từ này?")) {
      return;
    }

    try {
      await api.delete(`/vocabularies/${id}`);
      navigate("/dictionary");
    } catch (error) {
      setError("Không thể xóa từ vựng");
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>Đang tải...</div>
    );
  }

  if (error || !vocabulary) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          textAlign: "center",
          color: "#c00",
        }}
      >
        {error || "Không tìm thấy từ vựng"}
      </div>
    );
  }

  const isPremiumUser = user.is_premium;
  const canViewDetails = isPremiumUser || isUnlocked;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>{vocabulary.word}</h1>
        <button
          onClick={handleDelete}
          style={{
            padding: "8px 16px",
            background: "white",
            color: "#dc3545",
            border: "1px solid #dc3545",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Xóa
        </button>
      </div>

      <div
        style={{
          padding: "30px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ color: "#666", marginBottom: "20px" }}>
          {vocabulary.phonetic}
        </p>

        {canViewDetails ? (
          <>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "10px" }}>Nghĩa:</h3>
              <p>{vocabulary.meaning_vi}</p>
            </div>

            <div>
              <h3 style={{ marginBottom: "10px" }}>Ví dụ:</h3>
              {vocabulary.examples?.map((ex, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <p style={{ marginBottom: "5px" }}>• {ex.en}</p>
                  <p style={{ color: "#666", marginLeft: "15px" }}>→ {ex.vi}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              padding: "30px",
              background: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              🔒 Nội dung này chỉ dành cho người dùng Premium
            </p>
            <UnlockButton
              vocabularyId={vocabulary.id}
              onUnlock={() => setIsUnlocked(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VocabularyDetail;
