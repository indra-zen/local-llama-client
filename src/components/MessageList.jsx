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
    <div className="messages-container">
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
