import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#f8f9fa",
        padding: "40px 20px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}
      >
        <div>
          <h3 style={{ marginBottom: "15px" }}>📚 VocabApp</h3>
          <p style={{ color: "#666" }}>
            Ứng dụng học từ vựng thông minh với tính năng ghi nhớ và tra cứu.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "15px" }}>Liên kết</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "#666" }}>
                Trang chủ
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "#666" }}
              >
                Giới thiệu
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/premium"
                style={{ textDecoration: "none", color: "#666" }}
              >
                Nâng cấp Premium
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: "15px" }}>Hỗ trợ</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <a
                href="mailto:support@vocabapp.com"
                style={{ textDecoration: "none", color: "#666" }}
              >
                Liên hệ
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/faq" style={{ textDecoration: "none", color: "#666" }}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          padding: "20px 0 0",
          borderTop: "1px solid #ddd",
          textAlign: "center",
          color: "#666",
        }}
      >
        <p>&copy; {new Date().getFullYear()} VocabApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
