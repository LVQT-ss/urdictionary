import React, { Suspense, lazy } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

// Lazy load the Book component
const Book = lazy(() => import("../components/BookFliper/Book"));

function Dictionary() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Từ điển của bạn</h1>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading dictionary...
          </div>
        }
      >
        <Book />
      </Suspense>
    </div>
  );
}
export default Dictionary;
