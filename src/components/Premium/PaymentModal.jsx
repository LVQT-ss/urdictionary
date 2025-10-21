import { useState } from "react";
import { api } from "../../utils/api";

function PaymentModal({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [loading, setLoading] = useState(false);

  const plans = {
    monthly: {
      price: 49000,
      name: "Gói tháng",
    },
    yearly: {
      price: 499000,
      name: "Gói năm",
      savings: "15%",
    },
  };

  const paymentMethods = [
    { id: "momo", name: "MoMo" },
    { id: "zalopay", name: "ZaloPay" },
    { id: "credit_card", name: "Thẻ tín dụng" },
  ];

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await api.post("/payments/create", {
        plan: selectedPlan,
        payment_method: paymentMethod,
      });

      // Redirect to payment gateway
      window.location.href = response.data.payment_url;
    } catch (error) {
      alert("Không thể tạo giao dịch. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h2>Nâng cấp tài khoản Premium</h2>

        <div style={{ marginTop: "20px" }}>
          <h3>Chọn gói dịch vụ:</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {Object.entries(plans).map(([id, plan]) => (
              <button
                key={id}
                onClick={() => setSelectedPlan(id)}
                style={{
                  flex: 1,
                  padding: "15px",
                  border:
                    selectedPlan === id
                      ? "2px solid #007bff"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  background: selectedPlan === id ? "#e7f3ff" : "white",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{plan.name}</div>
                <div style={{ fontSize: "24px", margin: "10px 0" }}>
                  {plan.price.toLocaleString()}đ
                </div>
                {plan.savings && (
                  <div style={{ color: "#28a745" }}>
                    Tiết kiệm {plan.savings}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Phương thức thanh toán:</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border:
                    paymentMethod === method.id
                      ? "2px solid #007bff"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  background: paymentMethod === method.id ? "#e7f3ff" : "white",
                  cursor: "pointer",
                }}
              >
                {method.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              background: "white",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              background: "#28a745",
              color: "white",
              cursor: "pointer",
            }}
          >
            {loading ? "Đang xử lý..." : "Thanh toán ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
