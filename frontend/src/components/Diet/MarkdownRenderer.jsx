import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }) => {
  if (!content) return <p className="text-gray-500">⚠️ Empty content</p>;

  return (
    <div className="prose prose-lg prose-green max-w-none text-gray-800 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: (props) => (
            <h1
              className="text-3xl font-bold mt-8 mb-4 text-green-800"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="text-2xl font-semibold mt-6 mb-3 text-green-700"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="text-xl font-medium mt-5 mb-2 text-green-600"
              {...props}
            />
          ),
          p: (props) => <p className="mb-3 leading-relaxed" {...props} />,
          ul: (props) => (
            <ul
              className="list-disc list-inside ml-4 mb-4 space-y-2"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="list-decimal list-inside ml-4 mb-4 space-y-2"
              {...props}
            />
          ),
          li: (props) => <li className="text-gray-700" {...props} />,
          table: (props) => (
            <div className="overflow-x-auto my-6">
              <table
                className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-sm"
                {...props}
              />
            </div>
          ),
          th: (props) => (
            <th
              className="px-6 py-3 bg-green-50 text-left text-xs font-medium text-green-700 uppercase tracking-wider"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-t border-gray-100"
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
