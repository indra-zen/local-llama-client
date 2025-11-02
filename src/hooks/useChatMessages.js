import { useState } from "react";
import { sendChatMessage } from "../services/chatService";

export function useChatMessages(systemPrompt) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (userMessage) => {
        // Add user message
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

        // Add empty assistant message that will be streamed
        const assistantMessageIndex = messages.length + 1;
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        setIsLoading(true);

        try {
            await sendChatMessage(messages, userMessage, systemPrompt, (content) => {
                // Update the assistant message with streaming content
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[assistantMessageIndex] = {
                        role: "assistant",
                        content: content,
                    };
                    return newMessages;
                });
            });
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[assistantMessageIndex] = {
                    role: "assistant",
                    content: `Error: ${error.message}. Make sure your llama.cpp server is running on port 8080.`,
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return {
        messages,
        isLoading,
        sendMessage,
        clearMessages,
    };
}
