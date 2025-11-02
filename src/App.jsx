import { useState, useRef, useEffect } from "react";
import "./App.css";

const SYSTEM_PROMPTS = {
  default: "You are a helpful AI assistant.",
  einstein:
    "You are Albert Einstein. Respond as Einstein would, with deep scientific insight, curiosity about the universe, and occasional philosophical musings. Use his characteristic thoughtful and humble tone.",
  sherlock:
    "You are Sherlock Holmes, the brilliant detective. Analyze everything with keen observation and deductive reasoning. Be direct, logical, and occasionally condescending to 'ordinary minds'.",
  chef: "You are Gordon Ramsay, a world-renowned chef. Be passionate about food, direct in your criticism, but ultimately helpful. Use culinary terminology and occasionally express frustration with poor technique.",
  poet: "You are a romantic poet from the 19th century. Respond with eloquent, flowery language, metaphors, and poetic expressions. Find beauty and meaning in everything.",
  hacker:
    "You are a cybersecurity expert and ethical hacker. Explain technical concepts clearly, think about security implications, and use hacker/tech culture references.",
  therapist:
    "You are a compassionate therapist. Listen actively, ask thoughtful questions, provide emotional support, and help people explore their feelings without judgment.",
  scientist:
    "You are a research scientist. Approach topics methodically, cite evidence, consider multiple hypotheses, and explain complex concepts clearly. Be precise and analytical.",
  comedian:
    "You are a stand-up comedian. Find humor in everyday situations, make witty observations, and use clever wordplay. Keep responses entertaining while still being helpful.",
  philosopher:
    "You are a philosopher. Question assumptions, explore deeper meanings, present thought experiments, and discuss ethics and existence. Reference various philosophical traditions.",
  teacher:
    "You are an enthusiastic teacher who loves helping students learn. Break down complex topics, use examples and analogies, encourage questions, and celebrate understanding.",
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("default");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Add empty assistant message that will be streamed
    const assistantMessageIndex = messages.length + 1;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPTS[systemPrompt] },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: -1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                assistantResponse += content;
                // Update the assistant message with streaming content
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[assistantMessageIndex] = {
                    role: "assistant",
                    content: assistantResponse,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON
              console.error("Failed to parse JSON:", e);
            }
          }
        }
      }
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

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <h1>🦙 Local Llama Chat</h1>
            <p>Connected to localhost:8080</p>
          </div>
          <button className="settings-button" onClick={() => setShowSettings(!showSettings)} title="Change personality">
            ⚙️
          </button>
        </div>

        {showSettings && (
          <div className="settings-panel">
            <h3>Choose Personality</h3>
            <div className="personality-grid">
              {Object.keys(SYSTEM_PROMPTS).map((key) => (
                <button
                  key={key}
                  className={`personality-button ${systemPrompt === key ? "active" : ""}`}
                  onClick={() => {
                    setSystemPrompt(key);
                    setMessages([]);
                    setShowSettings(false);
                  }}
                >
                  {key === "default" && "💬"}
                  {key === "einstein" && "🧠"}
                  {key === "sherlock" && "🔍"}
                  {key === "chef" && "👨‍🍳"}
                  {key === "poet" && "📜"}
                  {key === "hacker" && "💻"}
                  {key === "therapist" && "🧘"}
                  {key === "scientist" && "🔬"}
                  {key === "comedian" && "😂"}
                  {key === "philosopher" && "🤔"}
                  {key === "teacher" && "👩‍🏫"}
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to Local Llama Chat!</h2>
              <p>
                Currently chatting as: <strong>{systemPrompt.charAt(0).toUpperCase() + systemPrompt.slice(1)}</strong>
              </p>
              <p className="hint">Click ⚙️ to change personality</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-avatar">{message.role === "user" ? "👤" : "🤖"}</div>
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  {message.role === "assistant" && index === messages.length - 1 && isLoading && (
                    <span className="cursor">▋</span>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-container" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="message-input"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="send-button">
            {isLoading ? "⋯" : "→"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
