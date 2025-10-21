import React from "react";
import AddVocabularyInput from "../components/Vocabulary/AddVocabularyInput";
import VocabularyList from "../components/Vocabulary/VocabularyList";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
          📚 Chào mừng đến với VocabApp
        </h1>
        <p style={{ fontSize: "1.2em", color: "#666", marginBottom: "30px" }}>
          Ứng dụng học từ vựng thông minh với tính năng ghi nhớ và tra cứu.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Link
            to="/login"
            style={{
              padding: "12px 24px",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            style={{
              padding: "12px 24px",
              border: "2px solid #007bff",
              color: "#007bff",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Đăng ký
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Thêm từ vựng mới</h1>
      <AddVocabularyInput />
      <VocabularyList />
    </div>
  );
}

export default Home;
