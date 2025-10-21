import { useState, useEffect, useCallback, useMemo } from "react";
import { getAllVocabularies } from "../../utils/api";
import VocabularyCard from "./VocabularyCard";
import Filter from "../Filter";

function VocabularyList() {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  const fetchVocabularies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllVocabularies();
      setVocabularies(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Error fetching vocabularies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVocabularies();
  }, [fetchVocabularies]);

  // Filter vocabularies based on search term
  const filteredVocabularies = useMemo(() => {
    if (!searchFilter) return vocabularies;

    const searchTerm = searchFilter.toLowerCase();
    return vocabularies.filter((vocab) => {
      const word = vocab.word?.toLowerCase() || "";
      const meaning = vocab.meaning_vi?.toLowerCase() || "";
      return word.includes(searchTerm) || meaning.includes(searchTerm);
    });
  }, [vocabularies, searchFilter]);

  const handleFilterChange = ({ search }) => {
    setSearchFilter(search);
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>
      ) : filteredVocabularies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          {searchFilter
            ? `Không tìm thấy từ vựng nào cho "${searchFilter}"`
            : "Chưa có từ vựng nào"}
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px", padding: "20px" }}>
          {filteredVocabularies.map((vocabulary) => (
            <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VocabularyList;
