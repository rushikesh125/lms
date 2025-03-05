// components/MarkdownEditor.jsx
"use client";

import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
} from "lucide-react";

export default function MarkdownEditor({ markdown, onChange }) {
  const textareaRef = useRef(null);
  const [codeLanguage, setCodeLanguage] = useState("javascript");

  const insertText = (before, after = "") => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    const newText = `${markdown.substring(0, start)}${before}${selectedText}${after}${markdown.substring(end)}`;
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleToolbarAction = (action) => {
    switch (action) {
      case "bold": insertText("**", "**"); break;
      case "italic": insertText("*", "*"); break;
      case "h1": insertText("# "); break;
      case "h2": insertText("## "); break;
      case "h3": insertText("### "); break;
      case "ul": insertText("- "); break;
      case "ol": insertText("1. "); break;
      case "link": insertText("[", "](url)"); break;
      case "image": insertText("![alt text](", ")"); break;
      case "code": insertText("```" + codeLanguage + "\n", "\n```"); break;
      case "quote": insertText("> "); break;
      default: break;
    }
  };

  const ToolbarButton = ({ icon, onClick, tooltip }) => (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded hover:bg-gray-200 transition-colors"
      title={tooltip}
    >
      {icon}
    </button>
  );

  const languages = [
    "javascript", "jsx", "typescript", "tsx", "css", "html", "python", "java",
    "c", "cpp", "csharp", "php", "ruby", "go", "rust", "swift", "bash", "sql",
    "json", "yaml", "markdown"
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <ToolbarButton icon={<Bold size={18} />} onClick={() => handleToolbarAction("bold")} tooltip="Bold" />
        <ToolbarButton icon={<Italic size={18} />} onClick={() => handleToolbarAction("italic")} tooltip="Italic" />
        <ToolbarButton icon={<Heading1 size={18} />} onClick={() => handleToolbarAction("h1")} tooltip="Heading 1" />
        <ToolbarButton icon={<Heading2 size={18} />} onClick={() => handleToolbarAction("h2")} tooltip="Heading 2" />
        <ToolbarButton icon={<Heading3 size={18} />} onClick={() => handleToolbarAction("h3")} tooltip="Heading 3" />
        <ToolbarButton icon={<List size={18} />} onClick={() => handleToolbarAction("ul")} tooltip="Unordered List" />
        <ToolbarButton icon={<ListOrdered size={18} />} onClick={() => handleToolbarAction("ol")} tooltip="Ordered List" />
        <ToolbarButton icon={<Link size={18} />} onClick={() => handleToolbarAction("link")} tooltip="Link" />
        <ToolbarButton icon={<Image size={18} />} onClick={() => handleToolbarAction("image")} tooltip="Image" />
        <div className="flex items-center">
          <ToolbarButton icon={<Code size={18} />} onClick={() => handleToolbarAction("code")} tooltip="Code Block" />
          <select
            value={codeLanguage}
            onChange={(e) => setCodeLanguage(e.target.value)}
            className="ml-1 text-sm bg-white border border-gray-300 rounded px-1 py-0.5"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
            ))}
          </select>
        </div>
        <ToolbarButton icon={<Quote size={18} />} onClick={() => handleToolbarAction("quote")} tooltip="Blockquote" />
      </div>
      <textarea
        ref={textareaRef}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[500px] p-4 font-mono text-sm focus:outline-none resize-none"
        placeholder="Type your markdown here..."
      />
    </div>
  );
}