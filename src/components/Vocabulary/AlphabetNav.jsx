import React from "react";

function AlphabetNav({ selectedLetter, onLetterSelect }) {
  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterSelect(letter)}
          style={{
            width: "36px",
            height: "36px",
            border:
              selectedLetter === letter
                ? "2px solid #007bff"
                : "1px solid #ddd",
            borderRadius: "4px",
            background: selectedLetter === letter ? "#e7f3ff" : "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default AlphabetNav;
