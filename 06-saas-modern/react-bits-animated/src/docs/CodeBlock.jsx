import { useCallback, useState } from 'react';
import { TbCopy, TbCheck } from 'react-icons/tb';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const COPY_RESET_MS = 2000;

const CodeBlock = ({ children, language = null, showLineNumbers = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = String(children).trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_RESET_MS);
  }, [children]);

  return (
    <div className="docs-code">
      <div className="docs-code-header">
        <button
          className="docs-copy-button"
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? <TbCheck /> : <TbCopy />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={twilight}
        showLineNumbers={showLineNumbers}
        className="code-highlighter"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
