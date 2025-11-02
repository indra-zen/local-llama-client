import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Message({ message, isLoading, isLastMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`
        flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-md
        ${isUser ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-gradient-to-br from-pink-400 to-red-500"}
      `}
      >
        {isUser ? "👤" : "🤖"}
      </div>
      <div className={`flex-1 max-w-[85%] sm:max-w-[75%] ${isUser ? "flex justify-end" : ""}`}>
        <div
          className={`
          max-w-none px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm
          ${
            isUser
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-sm"
              : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm"
          }
        `}
        >
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg text-xs sm:text-sm my-2"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={`${
                      isUser ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700"
                    } px-1 py-0.5 rounded text-xs sm:text-sm ${className}`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-2 last:mb-0 text-sm sm:text-base leading-relaxed">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-2 space-y-1 text-sm sm:text-base">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside my-2 space-y-1 text-sm sm:text-base">{children}</ol>
              ),
              h1: ({ children }) => <h1 className="text-lg sm:text-xl font-bold mt-4 mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base sm:text-lg font-bold mt-3 mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm sm:text-base font-bold mt-2 mb-1">{children}</h3>,
              blockquote: ({ children }) => (
                <blockquote
                  className={`border-l-4 pl-4 my-2 italic ${isUser ? "border-white/50" : "border-indigo-500"}`}
                >
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className={`underline ${isUser ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        {message.role === "assistant" && isLastMessage && isLoading && (
          <span className="inline-block ml-1 text-indigo-600 dark:text-indigo-400 animate-blink">▋</span>
        )}
      </div>
    </div>
  );
}
