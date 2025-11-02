import { useRef, useEffect } from "react";
import Message from "./Message";
import WelcomeMessage from "./WelcomeMessage";

export default function MessageList({ messages, isLoading, systemPrompt }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {messages.length === 0 ? (
        <WelcomeMessage systemPrompt={systemPrompt} />
      ) : (
        messages.map((message, index) => (
          <Message key={index} message={message} isLoading={isLoading} isLastMessage={index === messages.length - 1} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
