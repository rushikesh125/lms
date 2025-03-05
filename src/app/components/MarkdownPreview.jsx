// "use client";
// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';

// export default function MarkdownPreview({ markdown }) {
//   return (
//     <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
//       <div className="p-2 border-b bg-gray-50">
//         <h3 className="font-medium text-gray-700">Preview</h3>
//       </div>
//       <div className="p-4 prose max-w-none h-[500px] overflow-auto">
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           rehypePlugins={[rehypeRaw]}
//           components={{
//             code({ node, inline, className, children, ...props }) {
//               const match = /language-(\w+)/.exec(className || '');
//               return !inline && match ? (
//                 <SyntaxHighlighter
//                   style={oneDark}
//                   language={match[1]}
//                   PreTag="div"
//                   {...props}
//                 >
//                   {String(children).replace(/\n$/, '')}
//                 </SyntaxHighlighter>
//               ) : (
//                 <code className={className} {...props}>
//                   {children}
//                 </code>
//               );
//             },
//           }}
//         >
//           {markdown || ''}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// }


"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";

export default function MarkdownPreview({ markdown }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-2 border-b bg-gray-50">
        <h3 className="font-medium text-gray-700">Markdown Preview</h3>
      </div>
      <div className="p-4 prose max-w-none h-[500px] overflow-auto">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
}