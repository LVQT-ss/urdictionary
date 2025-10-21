// components/Vocabulary/VocabularyCard.jsx
import { useState, useEffect } from "react";
import { validateEnglishWord } from "../../utils/api";

function VocabularyCard({ vocabulary, onDelete }) {
  const [wordDetails, setWordDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchWordDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await validateEnglishWord(vocabulary.word);
        setWordDetails(data);

        // Find the first available audio file
        const audioFile = data.phonetics?.find((p) => p.audio)?.audio;
        if (audioFile) {
          setAudio(new Audio(audioFile));
        }
      } catch (err) {
        setError(err.message || "Failed to load word details");
        setWordDetails(null);
        setAudio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWordDetails();
  }, [vocabulary.word]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        background: "white",
      }}
    >
      <div style={wordHeaderStyle}>
        <div style={wordTitleStyle}>
          <h3 style={wordStyle}>{vocabulary.word}</h3>
          {vocabulary.note && <span style={noteStyle}>{vocabulary.note}</span>}
          {audio && (
            <button onClick={playAudio} style={audioButtonStyle}>
              🔊
            </button>
          )}
        </div>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this word?")) {
              onDelete(vocabulary.id);
            }
          }}
          style={deleteButtonStyle}
        >
          🗑️
        </button>
      </div>

      {loading && <div style={loadingStyle}>Loading word details...</div>}

      {error && <div style={errorStyle}>{error}</div>}

      {wordDetails && !loading && !error && (
        <div style={meaningsContainerStyle}>
          {wordDetails.meanings?.map((meaning, index) => (
            <div key={index} style={meaningStyle}>
              <div style={partOfSpeechStyle}>{meaning.partOfSpeech}</div>
              <ul style={definitionsListStyle}>
                {meaning.definitions.map((def, idx) => (
                  <li key={idx} style={definitionStyle}>
                    <p>{def.definition}</p>
                    {def.example && (
                      <p style={exampleStyle}>Example: {def.example}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const wordHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
};

const wordTitleStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const wordStyle = {
  margin: "0",
  fontSize: "24px",
  color: "#2c3e50",
};

const noteStyle = {
  fontSize: "14px",
  color: "#666",
  background: "#f8f9fa",
  padding: "4px 8px",
  borderRadius: "4px",
  maxWidth: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const audioButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background-color 0.2s",
};

const meaningsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const meaningStyle = {
  borderLeft: "3px solid #6c757d",
  paddingLeft: "12px",
};

const partOfSpeechStyle = {
  fontSize: "14px",
  color: "#495057",
  fontWeight: "600",
  textTransform: "capitalize",
  marginBottom: "8px",
};

const definitionsListStyle = {
  margin: "0",
  paddingLeft: "20px",
};

const definitionStyle = {
  marginBottom: "12px",
};

const exampleStyle = {
  color: "#666",
  fontSize: "14px",
  fontStyle: "italic",
  marginTop: "4px",
  marginLeft: "8px",
};

const loadingStyle = {
  textAlign: "center",
  padding: "10px",
  color: "#666",
};

const errorStyle = {
  color: "#dc3545",
  fontSize: "14px",
  marginTop: "8px",
};

const deleteButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "4px",
  transition: "all 0.2s",
  ":hover": {
    backgroundColor: "#ffebee",
    transform: "scale(1.1)",
  },
};

export default VocabularyCard;
