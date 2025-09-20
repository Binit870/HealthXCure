import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }) => {
  if (!content) return <p className="text-gray-400">⚠️ Empty content</p>;

  return (
    <div className="prose prose-invert prose-lg max-w-none text-white leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: (props) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-green-300" {...props} />
          ),
          h2: (props) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-green-300" {...props} />
          ),
          h3: (props) => (
            <h3 className="text-xl font-medium mt-5 mb-2 text-green-300" {...props} />
          ),
          p: (props) => (
            <p
              className={`mb-3 leading-relaxed ${
                props.children?.toString().includes("Height") ||
                props.children?.toString().includes("Weight")
                  ? "font-medium text-green-300"
                  : "text-white"
              }`}
              {...props}
            />
          ),
          ul: (props) => (
            <ul className="list-disc list-inside ml-4 mb-4 space-y-2 text-white" {...props} />
          ),
          ol: (props) => (
            <ol className="list-decimal list-inside ml-4 mb-4 space-y-2 text-white" {...props} />
          ),
          li: (props) => (
            <li
              className={`text-white ${
                props.children?.toString().includes("Height") ||
                props.children?.toString().includes("Weight")
                  ? "font-semibold text-green-300"
                  : ""
              }`}
              {...props}
            />
          ),
          table: (props) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-600 border border-gray-600 rounded-lg shadow-sm" {...props} />
            </div>
          ),
          th: (props) => (
            <th className="px-6 py-3 bg-green-900 text-left text-xs font-medium text-green-300 uppercase tracking-wider" {...props} />
          ),
          td: (props) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-white border-t border-gray-700" {...props} />
          ),
          strong: (props) => (
            <strong className="font-bold text-green-300" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
