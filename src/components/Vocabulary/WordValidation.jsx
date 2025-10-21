import React, { useState, useEffect } from "react";
import { validateEnglishWord } from "../../utils/api";

function WordValidation({ word, onValidationChange }) {
  const [wordDetails, setWordDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (!word) {
      setWordDetails(null);
      setError(null);
      onValidationChange && onValidationChange(false);
      return;
    }

    const validateWord = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await validateEnglishWord(word);
        setWordDetails(data);
        onValidationChange && onValidationChange(true);

        // Find the first available audio file
        const audioFile = data.phonetics?.find((p) => p.audio)?.audio;
        if (audioFile) {
          setAudio(new Audio(audioFile));
        }
      } catch (error) {
        setError(error.message || "Word not found in dictionary");
        setWordDetails(null);
        setAudio(null);
        onValidationChange && onValidationChange(false);
      } finally {
        setLoading(false);
      }
    };

    validateWord();
  }, [word, onValidationChange]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  if (loading) {
    return <div style={loadingStyle}>Checking word...</div>;
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!wordDetails) {
    return null;
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={wordHeaderStyle}>
          <h3 style={wordStyle}>{wordDetails.word}</h3>
          {wordDetails.phonetic && (
            <span style={phoneticStyle}>{wordDetails.phonetic}</span>
          )}
          {audio && (
            <button onClick={playAudio} style={audioButtonStyle}>
              🔊
            </button>
          )}
        </div>
      </div>

      <div style={meaningsContainerStyle}>
        {wordDetails.meanings?.map((meaning, index) => (
          <div key={index} style={meaningStyle}>
            <div style={partOfSpeechStyle}>{meaning.partOfSpeech}</div>
            <ul style={definitionsListStyle}>
              {meaning.definitions.slice(0, 2).map((def, idx) => (
                <li key={idx} style={definitionStyle}>
                  {def.definition}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const headerStyle = {
  marginBottom: "16px",
};

const wordHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const wordStyle = {
  margin: "0",
  fontSize: "24px",
  color: "#2c3e50",
};

const phoneticStyle = {
  fontSize: "16px",
  color: "#666",
  fontStyle: "italic",
};

const audioButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#e9ecef",
  },
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
  fontSize: "14px",
  color: "#495057",
  marginBottom: "4px",
  lineHeight: "1.4",
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

export default WordValidation;
