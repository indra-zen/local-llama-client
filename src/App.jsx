import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import SettingsPanel from "./components/SettingsPanel";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { useChatMessages } from "./hooks/useChatMessages";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("default");
  const [showSettings, setShowSettings] = useState(false);

  const { messages, isLoading, sendMessage, clearMessages } = useChatMessages(systemPrompt);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await sendMessage(userMessage);
  };

  const handleSelectPersonality = (personality) => {
    setSystemPrompt(personality);
    clearMessages();
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-2 sm:p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl h-[100dvh] sm:h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-none sm:rounded-xl shadow-lg overflow-hidden">
        <ChatHeader onToggleSettings={() => setShowSettings(!showSettings)} />

        {showSettings && (
          <SettingsPanel
            systemPrompt={systemPrompt}
            onSelectPersonality={handleSelectPersonality}
            onClose={() => setShowSettings(false)}
          />
        )}

        <MessageList messages={messages} isLoading={isLoading} systemPrompt={systemPrompt} />

        <MessageInput input={input} isLoading={isLoading} onInputChange={setInput} onSubmit={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
