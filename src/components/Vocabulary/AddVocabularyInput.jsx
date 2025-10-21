// components/Vocabulary/AddVocabularyInput.jsx
import { useState, useEffect } from "react";
import { useVocabulary } from "../../hooks/useVocabulary";
import { useAuth } from "../../hooks/useAuth";
import WordValidation from "./WordValidation";

function AddVocabularyInput() {
  const [word, setWord] = useState("");
  const [debouncedWord, setDebouncedWord] = useState("");
  const [isValidWord, setIsValidWord] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { addVocabulary, isLoading } = useVocabulary();

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
      });

      setWord(""); // Clear input
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
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Nhập từ vựng (VD: Effect)..."
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "5px",
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !isValidWord}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Đang lưu..." : "Thêm"}
        </button>
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
