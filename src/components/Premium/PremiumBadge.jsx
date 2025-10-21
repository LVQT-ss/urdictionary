import React from "react";

function PremiumBadge({ expiresAt }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 8px",
        background: "linear-gradient(45deg, #FFD700, #FFA500)",
        borderRadius: "20px",
        color: "#000",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      <span style={{ marginRight: "4px" }}>⭐</span>
      Premium
      {expiresAt && (
        <span style={{ marginLeft: "4px", fontSize: "12px" }}>
          (đến {formatDate(expiresAt)})
        </span>
      )}
    </div>
  );
}

export default PremiumBadge;
