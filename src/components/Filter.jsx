import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ search: value });
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search vocabulary..."
          style={searchInputStyle}
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              onFilterChange({ search: "" });
            }}
            style={clearButtonStyle}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const searchContainerStyle = {
  position: "relative",
  width: "100%",
};

const searchInputStyle = {
  width: "100%",
  padding: "12px",
  paddingRight: "40px",
  fontSize: "16px",
  border: "2px solid #e1e1e1",
  borderRadius: "6px",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const clearButtonStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  fontSize: "20px",
  color: "#666",
  cursor: "pointer",
  padding: "4px",
};

export default Filter;
