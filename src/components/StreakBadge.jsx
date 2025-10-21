function StreakBadge({ streak, longest_streak }) {
  return (
    <div style={containerStyle}>
      <div style={badgeStyle}>
        <span style={fireStyle}>🔥</span>
        <span style={streakStyle}>{streak}</span>
      </div>
      {longest_streak > streak && (
        <div style={longestStyle}>Best: {longest_streak}</div>
      )}
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
};

const badgeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 8px",
  background: "#fff3e0",
  borderRadius: "12px",
  border: "1px solid #ffe0b2",
};

const fireStyle = {
  fontSize: "16px",
};

const streakStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#f57c00",
};

const longestStyle = {
  fontSize: "10px",
  color: "#666",
};

export default StreakBadge;
