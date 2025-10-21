import { useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "./useAuth";

export function usePremium() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isPremium = user?.is_premium || false;
  const premiumExpiresAt = user?.premium_expires_at;

  const unlockVocabulary = async (vocabularyId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.post(`/premium/unlock/${vocabularyId}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createPayment = async (plan, paymentMethod) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.post("/payments/create", {
        plan,
        payment_method: paymentMethod,
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get("/payments/history");
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    isPremium,
    premiumExpiresAt,
    unlockVocabulary,
    createPayment,
    getPaymentHistory,
  };
}
