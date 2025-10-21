import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import PaymentModal from "../components/Premium/PaymentModal";

function Premium() {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const features = [
    {
      icon: "🔍",
      title: "Tra cứu không giới hạn",
      description: "Xem nghĩa và ví dụ của mọi từ vựng",
    },
    {
      icon: "📱",
      title: "Truy cập mọi nơi",
      description: "Đồng bộ dữ liệu trên nhiều thiết bị",
    },
    {
      icon: "🎯",
      title: "Gợi ý thông minh",
      description: "Hệ thống gợi ý từ vựng phù hợp với trình độ",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
          Nâng cấp tài khoản Premium
        </h1>
        <p style={{ fontSize: "1.2em", color: "#666" }}>
          Mở khóa toàn bộ tính năng và trải nghiệm học từ vựng tốt nhất
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          marginBottom: "40px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              padding: "30px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>
              {feature.icon}
            </div>
            <h3 style={{ marginBottom: "10px" }}>{feature.title}</h3>
            <p style={{ color: "#666" }}>{feature.description}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setShowPaymentModal(true)}
          style={{
            padding: "15px 30px",
            fontSize: "1.2em",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Nâng cấp ngay
        </button>
      </div>

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </div>
  );
}

export default Premium;
