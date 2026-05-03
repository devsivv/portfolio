"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type TokenType =
  | "plain"
  | "keyword"
  | "property"
  | "string"
  | "boolean"
  | "number"
  | "function";

type Segment = {
  text: string;
  type: TokenType;
};

const codeLines: Segment[][] = [
  [
    { text: "const", type: "keyword" },
    { text: " engineer ", type: "plain" },
    { text: "=", type: "plain" },
    { text: " {", type: "plain" },
  ],
  [
    { text: "  ", type: "plain" },
    { text: "name", type: "property" },
    { text: ": ", type: "plain" },
    { text: '"Shivam Dubey"', type: "string" },
    { text: ",", type: "plain" },
  ],
  [
    { text: "  ", type: "plain" },
    { text: "skills", type: "property" },
    { text: ": [", type: "plain" },
  ],
  [{ text: '    "C++",', type: "string" }],
  [{ text: '    "Python",', type: "string" }],
  [{ text: '    "Machine Learning",', type: "string" }],
  [{ text: '    "Competitive Programming",', type: "string" }],
  [{ text: '    "Chemical Engineering"', type: "string" }],
  [{ text: "  ],", type: "plain" }],
  [
    { text: "  ", type: "plain" },
    { text: "problemSolver", type: "property" },
    { text: ": ", type: "plain" },
    { text: "true", type: "boolean" },
    { text: ",", type: "plain" },
  ],
  [
    { text: "  ", type: "plain" },
    { text: "leader", type: "property" },
    { text: ": ", type: "plain" },
    { text: "true", type: "boolean" },
    { text: ",", type: "plain" },
  ],
  [
    { text: "  ", type: "plain" },
    { text: "hireable", type: "property" },
    { text: ": ", type: "plain" },
    { text: "function", type: "keyword" },
    { text: "() {", type: "plain" },
  ],
  [{ text: "    ", type: "plain" }, { text: "return", type: "keyword" }, { text: " (", type: "plain" }],
  [{ text: "      this.", type: "plain" }, { text: "problemSolver", type: "property" }, { text: " &&", type: "plain" }],
  [{ text: "      this.", type: "plain" }, { text: "skills", type: "property" }, { text: ".length >= ", type: "plain" }, { text: "5", type: "number" }],
  [{ text: "    );", type: "plain" }],
  [{ text: "  }", type: "plain" }],
  [{ text: "};", type: "plain" }],
];

const tokenClass: Record<TokenType, string> = {
  plain: "tok-plain",
  keyword: "tok-keyword",
  property: "tok-property",
  string: "tok-string",
  boolean: "tok-boolean",
  number: "tok-number",
  function: "tok-function",
};

function renderTypedSegments(segments: Segment[], visibleChars: number) {
  let remaining = visibleChars;
  return segments.map((segment, idx) => {
    if (remaining <= 0) return null;
    const piece = segment.text.slice(0, remaining);
    remaining -= piece.length;
    return (
      <span key={`${segment.text}-${idx}`} className={tokenClass[segment.type]}>
        {piece}
      </span>
    );
  });
}

export default function CodeEditorCard() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const lineLengths = useMemo(
    () =>
      codeLines.map((line) =>
        line.reduce((sum, segment) => sum + segment.text.length, 0)
      ),
    []
  );

  useEffect(() => {
    const currentLength = lineLengths[lineIdx];
    const isLoopEnd = lineIdx === codeLines.length - 1 && charIdx >= currentLength;
    const timer = setTimeout(() => {
      if (charIdx < currentLength) {
        setCharIdx((prev) => prev + 1);
        return;
      }
      if (lineIdx < codeLines.length - 1) {
        setLineIdx((prev) => prev + 1);
        setCharIdx(0);
        return;
      }
      setLineIdx(0);
      setCharIdx(0);
    }, isLoopEnd ? 700 : 52);
    return () => clearTimeout(timer);
  }, [charIdx, lineIdx, lineLengths]);

  return (
    <motion.div
      className="code-editor-shell"
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7, ease: "easeInOut" }}
    >
      <div className="code-editor-card">
        <div className="code-editor-topbar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="editor-title">engineer-profile.ts</span>
        </div>
        <div className="code-body">
          {codeLines.map((line, idx) => {
            const lineNo = String(idx + 1).padStart(2, "0");
            const currentLength = lineLengths[idx];
            const visibleChars =
              idx < lineIdx ? currentLength : idx === lineIdx ? charIdx : 0;

            return (
              <p key={`line-${lineNo}`} className="code-line">
                <span className="line-no">{lineNo}</span>
                <span className="code-text">
                  {renderTypedSegments(line, visibleChars)}
                  {idx === lineIdx && <span className="editor-caret">|</span>}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
