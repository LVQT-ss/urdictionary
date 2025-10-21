import { createContext, useContext, useState, useCallback } from "react";

const VocabularyContext = createContext();

export function VocabularyProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshVocabularyList = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <VocabularyContext.Provider
      value={{ refreshTrigger, refreshVocabularyList }}
    >
      {children}
    </VocabularyContext.Provider>
  );
}

export function useVocabularyContext() {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error(
      "useVocabularyContext must be used within a VocabularyProvider"
    );
  }
  return context;
}
