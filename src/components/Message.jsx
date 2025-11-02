import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Message({ message, isLoading, isLastMessage }) {
  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">{message.role === "user" ? "👤" : "🤖"}</div>
      <div className="message-content">
        <div className="message-text">
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
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
            {message.content}
          </ReactMarkdown>
        </div>
        {message.role === "assistant" && isLastMessage && isLoading && <span className="cursor">▋</span>}
      </div>
    </div>
  );
}
