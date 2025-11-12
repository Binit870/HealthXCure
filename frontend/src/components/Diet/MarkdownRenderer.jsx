import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }) => {
  if (!content)
    return <p className="text-gray-400 text-sm sm:text-base">⚠️ Empty content</p>;

  return (
    <div className="prose prose-invert max-w-full text-black leading-relaxed break-words sm:prose-lg md:prose-xl lg:prose-2xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: (props) => (
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 mb-4 text-green-800"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 mb-3 text-green-800"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="text-lg sm:text-xl md:text-2xl font-medium mt-4 mb-2 text-green-800"
              {...props}
            />
          ),
          p: (props) => (
            <p
              className={`mb-3 leading-relaxed text-sm sm:text-base md:text-lg ${
                props.children?.toString().includes("Height") ||
                props.children?.toString().includes("Weight")
                  ? "font-medium text-green-800"
                  : "text-black"
              }`}
              {...props}
            />
          ),
          ul: (props) => (
            <ul
              className="list-disc list-inside ml-4 mb-4 space-y-2 text-sm sm:text-base md:text-lg text-black"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="list-decimal list-inside ml-4 mb-4 space-y-2 text-sm sm:text-base md:text-lg text-black"
              {...props}
            />
          ),
          li: (props) => (
            <li
              className={`text-sm sm:text-base md:text-lg text-black ${
                props.children?.toString().includes("Height") ||
                props.children?.toString().includes("Weight")
                  ? "font-semibold text-green-800"
                  : ""
              }`}
              {...props}
            />
          ),
          table: (props) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-teal-600 border border-teal-600 rounded-lg shadow-sm text-sm sm:text-base md:text-lg" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="px-4 sm:px-6 py-2 bg-green-100 text-left text-xs sm:text-sm md:text-base font-medium text-green-800 uppercase tracking-wider"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base md:text-lg text-black border-t border-teal-700"
              {...props}
            />
          ),
          strong: (props) => (
            <strong className="font-bold text-green-800" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
