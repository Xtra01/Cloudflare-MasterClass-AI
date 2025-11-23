import React from 'react';

interface Props {
  content: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBuffer: string[] = [];

  lines.forEach((line, index) => {
    // Handle Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false;
        elements.push(
          <div key={`code-${index}`} className="my-6 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
            {codeBlockLanguage && (
              <div className="px-4 py-1 bg-gray-800 text-xs text-gray-400 font-mono border-b border-gray-700">
                {codeBlockLanguage}
              </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm text-green-400 font-mono">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
      } else {
        // Start of code block
        inCodeBlock = true;
        codeBlockLanguage = line.trim().replace('```', '');
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-xl font-bold text-cf-orange mt-6 mb-3">{line.replace('### ', '')}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-3xl font-extrabold text-white mb-6">{line.replace('# ', '')}</h1>);
    } 
    // Lists
    else if (line.trim().startsWith('- ')) {
      elements.push(
        <li key={index} className="ml-6 list-disc text-gray-300 mb-1">
          {formatInline(line.replace('- ', ''))}
        </li>
      );
    } else if (line.trim().match(/^\d+\. /)) {
       elements.push(
        <div key={index} className="ml-6 flex gap-2 text-gray-300 mb-2">
           <span className="font-bold text-cf-orange">{line.split('.')[0]}.</span>
           <span>{formatInline(line.replace(/^\d+\. /, ''))}</span>
        </div>
      );
    }
    // Blockquote (Pro Tip usually)
    else if (line.startsWith('>')) {
       elements.push(
        <div key={index} className="border-l-4 border-cf-orange bg-cf-gray/30 p-4 my-4 rounded-r italic text-gray-200">
           {formatInline(line.replace('>', ''))}
        </div>
      );
    }
    // Empty lines
    else if (line.trim() === '') {
      elements.push(<div key={index} className="h-2"></div>);
    } 
    // Paragraphs
    else {
      elements.push(<p key={index} className="mb-4 text-gray-300 leading-relaxed">{formatInline(line)}</p>);
    }
  });

  return <div className="markdown-body">{elements}</div>;
};

// Helper for bold/code inline
const formatInline = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-gray-800 text-cf-orange px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

export default MarkdownRenderer;
