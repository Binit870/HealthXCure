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
      className="mt-10 p-6 md:p-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl 
                 rounded-2xl border border-gray-700 shadow-2xl hover:shadow-blue-500/20 
                 transition-all duration-300"
    >
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-blue-400 to-cyan-300 text-center mb-6">
        📑 Report Summary
      </h2>

      {/* History Info */}
      {selectedHistoryItem && (
        <div className="text-center text-sm text-gray-400 mb-6">
          Viewing summary for:{" "}
          <span className="font-semibold text-blue-400 hover:text-cyan-300 transition-colors">
            {selectedHistoryItem.name}
          </span>
        </div>
      )}

      {/* Markdown Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="prose prose-invert max-w-none leading-relaxed"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-2xl font-bold text-blue-300 border-b border-gray-700 pb-1 mb-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl font-semibold text-cyan-300 mt-6 mb-3"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-gray-200 leading-relaxed mb-4 hover:text-gray-100 transition-colors"
                {...props}
              />
            ),
            strong: ({ node, ...props }) => (
              <strong className="text-white font-semibold bg-blue-500/20 px-1 rounded" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 bg-gray-800/40 rounded-md py-2"
                {...props}
              />
            ),
            li: ({ node, ordered, ...props }) => (
              <li
                className="mb-2 pl-2 before:content-['✔'] before:mr-2 before:text-cyan-400"
                {...props}
              />
            ),
            code: ({ node, inline, ...props }) =>
              inline ? (
                <code
                  className="bg-gray-800/60 text-cyan-300 px-1 py-0.5 rounded text-sm"
                  {...props}
                />
              ) : (
                <pre className="bg-gray-900/70 text-cyan-200 p-3 rounded-lg overflow-x-auto shadow-lg">
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
