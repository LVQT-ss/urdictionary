"use client";

// components/BookFliper/Book.tsx
import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { getAllVocabularies } from "../../utils/api";

function Book() {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDoublePage, setIsDoublePage] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      // Auto-switch to single page on small screens
      if (isSmall && isDoublePage) {
        setIsDoublePage(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDoublePage]);

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllVocabularies();

        let vocabArray = [];
        if (Array.isArray(response)) {
          vocabArray = response;
        } else if (response && Array.isArray(response.data)) {
          vocabArray = response.data;
        } else if (response && Array.isArray(response.vocabularies)) {
          vocabArray = response.vocabularies;
        }

        setVocabularies(vocabArray);
      } catch (err) {
        console.error("Error fetching vocabulary:", err);
        setError("Failed to load vocabulary. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVocabularies();
  }, []);

  const safeVocabularies = Array.isArray(vocabularies) ? vocabularies : [];

  const groupByLetterAndPage = (words) => {
    if (!Array.isArray(words) || words.length === 0) return [];

    const sorted = [...words].sort((a, b) => {
      const letterA = (a.first_letter || a.word?.[0] || "Z").toUpperCase();
      const letterB = (b.first_letter || b.word?.[0] || "Z").toUpperCase();
      return (
        letterA.localeCompare(letterB) ||
        (a.word || "").localeCompare(b.word || "")
      );
    });

    const groupedByLetter = {};
    sorted.forEach((word) => {
      const letter = (word.first_letter || word.word?.[0] || "Z").toUpperCase();
      if (!groupedByLetter[letter]) {
        groupedByLetter[letter] = [];
      }
      groupedByLetter[letter].push(word);
    });

    const pages = [];
    Object.keys(groupedByLetter)
      .sort()
      .forEach((letter) => {
        const wordsForLetter = groupedByLetter[letter];
        for (let i = 0; i < wordsForLetter.length; i += 3) {
          pages.push({
            letter,
            words: wordsForLetter.slice(i, i + 3),
          });
        }
      });

    return pages;
  };

  const pages = groupByLetterAndPage(safeVocabularies);

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={spinnerStyle}></div>
        <p style={loadingTextStyle}>Loading your vocabulary flip book...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorContainerStyle}>
        <p style={errorTextStyle}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={retryButtonStyle}
        >
          Retry
        </button>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div style={emptyContainerStyle}>
        <p style={emptyTextStyle}>No vocabulary found.</p>
      </div>
    );
  }

  return (
    <div style={mainContainerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>My Vocabulary Dictionary</h1>
        <p style={subtitleStyle}>
          {safeVocabularies.length} words • {pages.length} pages
        </p>
        {!isSmallScreen && (
          <PageToggle
            isDoublePage={isDoublePage}
            onToggle={() => setIsDoublePage(!isDoublePage)}
          />
        )}
      </div>

      <div style={flipbookContainerStyle}>
        <HTMLFlipBook
          key={`flipbook-${isDoublePage}`}
          width={370}
          height={500}
          maxShadowOpacity={0.5}
          drawShadow={true}
          showCover={true}
          size="fixed"
          flippingTime={600}
          minWidth={isDoublePage ? 780 : 400}
          usePortrait={!isDoublePage}
          startPage={0}
          style={{ margin: "0 auto" }}
        >
          {/* COVER PAGE */}
          <div className="page" style={{ background: "transparent" }}>
            <div className="page-content" style={coverStyle}>
              <div style={coverContentStyle}>
                <h1 style={coverTitleStyle}>My Vocabulary Dictionary</h1>
                <p style={coverStatsStyle}>
                  {safeVocabularies.length} words • {pages.length} pages
                </p>
                <div style={coverDividerStyle}></div>
                <div style={coverDescStyle}>Organized A-Z • Flip to learn!</div>
              </div>
            </div>
          </div>

          {pages.map((page, pageIndex) => (
            <div
              className="page"
              key={`page-${pageIndex}`}
              style={{ background: "transparent" }}
            >
              <div className="page-content" style={pageContentStyle}>
                {/* Large letter header */}
                <div style={letterHeaderStyle}>
                  <div style={largeLetterStyle}>{page.letter}</div>
                </div>

                {/* Dictionary entries */}
                <div style={dictionaryEntriesStyle}>
                  {page.words.map((vocab, wordIndex) => (
                    <DictionaryEntry
                      key={`${pageIndex}-${wordIndex}`}
                      vocabulary={vocab}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}

function DictionaryEntry({ vocabulary }) {
  return (
    <div style={entryStyle}>
      <div style={entryHeaderStyle}>
        <h4 style={entryWordStyle}>{vocabulary.word || "No word"}</h4>
        <p style={entryPhoneticStyle}>{vocabulary.phonetic || "No phonetic"}</p>
      </div>

      <div style={entryContentStyle}>
        <div style={meaningBlockStyle}>
          <span style={meaningLabelStyle}>Meaning:</span>
          <span style={meaningTextStyle}>
            {vocabulary.meaning_vi || "No meaning"}
          </span>
        </div>

        {vocabulary.examples?.[0]?.en && (
          <div style={exampleBlockStyle}>
            <span style={exampleLabelStyle}>Example:</span>
            <span style={exampleTextStyle}>"{vocabulary.examples[0].en}"</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PageToggle({ isDoublePage, onToggle }) {
  return (
    <div style={toggleContainerStyle}>
      <button
        onClick={onToggle}
        style={toggleButtonStyle}
        title={isDoublePage ? "Switch to single page" : "Switch to double page"}
      >
        <span style={toggleIconStyle}>{isDoublePage ? "📖" : "📄"}</span>
        {isDoublePage ? "Double Page" : "Single Page"}
      </button>
    </div>
  );
}

const mainContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  padding: "40px 20px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "40px",
};

const titleStyle = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 10px 0",
};

const subtitleStyle = {
  fontSize: "16px",
  color: "#718096",
  margin: "0",
  fontWeight: "500",
};

const flipbookContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  background: "white",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
};

const coverStyle = {
  padding: "40px 20px",
  textAlign: "center",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
};

const coverContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};

const coverTitleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  margin: "0",
};

const coverStatsStyle = {
  fontSize: "18px",
  margin: "0",
  opacity: "0.95",
  fontWeight: "500",
};

const coverDividerStyle = {
  width: "60px",
  height: "3px",
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: "2px",
};

const coverDescStyle = {
  fontSize: "14px",
  opacity: "0.9",
  fontStyle: "italic",
};

const pageContentStyle = {
  padding: "20px",
  backgroundColor: "#faf8f3",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  fontFamily: "Georgia, serif",
};

const letterHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "20px",
  paddingBottom: "15px",
  borderBottom: "3px solid #8b7355",
};

const largeLetterStyle = {
  fontSize: "72px",
  fontWeight: "700",
  color: "#8b7355",
  lineHeight: "1",
  fontFamily: "Georgia, serif",
};

const dictionaryEntriesStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  flex: 1,
  overflowY: "auto",
};

const entryStyle = {
  paddingBottom: "14px",
  borderBottom: "1px solid #d4c5b9",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const entryHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const entryWordStyle = {
  margin: "0",
  color: "#2d1810",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "Georgia, serif",
};

const entryPhoneticStyle = {
  margin: "0",
  fontSize: "12px",
  color: "#8b7355",
  fontStyle: "italic",
  fontWeight: "500",
};

const entryContentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "13px",
};

const meaningBlockStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
};

const meaningLabelStyle = {
  fontWeight: "700",
  color: "#5a4a3a",
  fontSize: "12px",
  textTransform: "uppercase",
};

const meaningTextStyle = {
  color: "#3d2817",
  fontSize: "13px",
  lineHeight: "1.4",
};

const exampleBlockStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "4px",
};

const exampleLabelStyle = {
  fontWeight: "700",
  color: "#5a4a3a",
  fontSize: "12px",
  textTransform: "uppercase",
};

const exampleTextStyle = {
  color: "#6b5d52",
  fontSize: "12px",
  fontStyle: "italic",
  lineHeight: "1.4",
};

const loadingContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  gap: "20px",
};

const spinnerStyle = {
  width: "50px",
  height: "50px",
  border: "4px solid #e2e8f0",
  borderTop: "4px solid #667eea",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const loadingTextStyle = {
  fontSize: "18px",
  color: "#2d3748",
  fontWeight: "500",
};

const errorContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  gap: "20px",
  padding: "20px",
};

const errorTextStyle = {
  fontSize: "18px",
  color: "#c53030",
  fontWeight: "500",
  textAlign: "center",
};

const retryButtonStyle = {
  marginTop: "10px",
  padding: "12px 24px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const emptyContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  gap: "20px",
  padding: "20px",
};

const emptyTextStyle = {
  fontSize: "18px",
  color: "#4a5568",
  fontWeight: "500",
};

const toggleContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
};

const toggleButtonStyle = {
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.3s ease",
  gap: "8px",
};

const toggleIconStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
};

export default Book;
