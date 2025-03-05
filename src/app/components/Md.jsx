import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardHeader } from '@heroui/react';
import { CardTitle } from './ui/Cards';


const MdEditor = () => {
  const [value, setValue] = useState('# Hello World\n\nStart typing your markdown here...\n\n```javascript\nfunction example() {\n  console.log("Syntax Highlighting");\n}\n```');

  // Custom renderer for code blocks with syntax highlighting
  const CodeRenderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Markdown Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div data-color-mode="light" className="w-full">
          <MDEditor
            value={value}
            onChange={(val) => setValue(val || '')}
            height={400}
            className="mb-4"
          />
          <div className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <MDEditor.Markdown 
              source={value} 
              components={CodeRenderer}
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MdEditor;