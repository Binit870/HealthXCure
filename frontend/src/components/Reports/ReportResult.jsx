import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReportResult = ({ result, selectedHistoryItem }) => {
  return (
    <motion.div
      key="result-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // White box with teal shadow and border
      className="mt-10 p-6 md:p-10 bg-white rounded-2xl border border-teal-200 shadow-xl hover:shadow-teal-300/50 transition-all duration-300"
    >
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-teal-600 text-center mb-6">
        📑 Report Summary
      </h2>

      {/* History Info */}
      {selectedHistoryItem && (
        <div className="text-center text-sm text-gray-500 mb-6">
          Viewing summary for:{" "}
          <span className="font-semibold text-teal-600 hover:text-teal-700 transition-colors">
            {selectedHistoryItem.name}
          </span>
        </div>
      )}

      {/* Markdown Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        // Default text color is dark for white background
        className="prose max-w-none leading-relaxed text-gray-800"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              // Teal heading
              <h1
                className="text-2xl font-bold text-teal-600 border-b border-teal-200 pb-1 mb-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              // Slightly less intense teal heading
              <h2
                className="text-xl font-semibold text-teal-500 mt-6 mb-3"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              // Standard text color
              <p
                className="text-gray-700 leading-relaxed mb-4 transition-colors"
                {...props}
              />
            ),
            strong: ({ node, ...props }) => (
              // Highlighted strong text: white text on teal background
              <strong className="text-white font-semibold bg-teal-500 px-1 rounded" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              // Teal border for quote
              <blockquote
                className="border-l-4 border-teal-400 pl-4 italic text-gray-600 bg-teal-50 rounded-md py-2"
                {...props}
              />
            ),
            li: ({ node, ordered, ...props }) => (
              // Teal checkmark
              <li
                className="mb-2 pl-2 before:content-['✔'] before:mr-2 before:text-teal-500 text-gray-700"
                {...props}
              />
            ),
            code: ({ node, inline, ...props }) =>
              inline ? (
                // Inline code: light teal background, dark text
                <code
                  className="bg-teal-100 text-teal-800 px-1 py-0.5 rounded text-sm"
                  {...props}
                />
              ) : (
                // Code block: light teal background, dark text
                <pre className="bg-teal-50 text-gray-800 p-3 rounded-lg overflow-x-auto shadow-inner border border-teal-200">
                  <code {...props} />
                </pre>
              ),
          }}
        >
          {result}
        </ReactMarkdown>
      </motion.div>
    </motion.div>
  );
};

export default ReportResult;