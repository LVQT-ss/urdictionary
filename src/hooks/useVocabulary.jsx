import { useState } from "react";
import { api } from "../utils/api";

export function useVocabulary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addVocabulary = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.post("/vocabularies", data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVocabulary = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.delete(`/vocabularies/${id}`);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getVocabularyByLetter = async (letter) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/vocabularies?letter=${letter}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getVocabularyById = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/vocabularies/${id}`);
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
    addVocabulary,
    deleteVocabulary,
    getVocabularyByLetter,
    getVocabularyById,
  };
}
