// components/Vocabulary/AddVocabularyInput.jsx
import { useState, useEffect } from "react";
import { useVocabulary } from "../../hooks/useVocabulary";
import { useAuth } from "../../hooks/useAuth";
import { useVocabularyContext } from "../../context/VocabularyContext";
import WordValidation from "./WordValidation";

function AddVocabularyInput() {
  const [word, setWord] = useState("");
  const [note, setNote] = useState("");
  const [debouncedWord, setDebouncedWord] = useState("");
  const [isValidWord, setIsValidWord] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { addVocabulary, isLoading } = useVocabulary();
  const { refreshVocabularyList } = useVocabularyContext();

  // Debounce word input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedWord(word.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [word]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!word.trim()) return;

    const firstLetter = word[0].toUpperCase();

    try {
      await addVocabulary({
        word: word.trim(),
        first_letter: firstLetter,
        note: note.trim(),
      });

      setWord(""); // Clear input
      setNote(""); // Clear note
      refreshVocabularyList(); // Trigger refresh of vocabulary list
      alert(`✅ Đã thêm "${word}" vào mục ${firstLetter}`);
    } catch (error) {
      alert("❌ Lỗi: " + error.message);
    }
  };

  if (authLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: 1,
              }}
            >
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Nhập từ vựng (VD: Effect)..."
                style={{
                  padding: "10px",
                  width: "100%",
                  fontSize: "16px",
                  border: "2px solid #ddd",
                  borderRadius: "5px",
                }}
                disabled={isLoading}
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú về từ này..."
                style={{
                  padding: "10px",
                  width: "100%",
                  fontSize: "16px",
                  border: "2px solid #ddd",
                  borderRadius: "5px",
                  minHeight: "38px",
                  resize: "vertical",
                }}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !isValidWord}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              {isLoading ? "Đang lưu..." : "Thêm"}
            </button>
          </div>
        </div>
      </form>
      <div style={{ marginTop: "20px" }}>
        {debouncedWord && (
          <WordValidation
            word={debouncedWord}
            onValidationChange={setIsValidWord}
          />
        )}
      </div>
    </div>
  );
}

export default AddVocabularyInput;
