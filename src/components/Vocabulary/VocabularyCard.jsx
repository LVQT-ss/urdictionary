// components/Vocabulary/VocabularyCard.jsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UnlockButton from "../Premium/UnlockButton";

function VocabularyCard({ vocabulary }) {
  const { user } = useAuth();
  const [isUnlocked, setIsUnlocked] = useState(vocabulary.is_unlocked);

  const isPremiumUser = user?.is_premium;
  const canViewDetails = isPremiumUser || isUnlocked;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        background: "white",
      }}
    >
      <h3>{vocabulary.word}</h3>
      <p style={{ color: "#666" }}>{vocabulary.phonetic}</p>

      {canViewDetails ? (
        <div>
          <p>
            <strong>Nghĩa:</strong> {vocabulary.meaning_vi}
          </p>
          <div>
            <strong>Ví dụ:</strong>
            {vocabulary.examples?.map((ex, i) => (
              <div key={i} style={{ marginLeft: "10px", marginTop: "5px" }}>
                <p>• {ex.en}</p>
                <p style={{ color: "#666", fontSize: "14px" }}> → {ex.vi}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <p>🔒 Nội dung Premium</p>
          <UnlockButton
            vocabularyId={vocabulary.id}
            onUnlock={() => setIsUnlocked(true)}
          />
        </div>
      )}
    </div>
  );
}

export default VocabularyCard;
