export default function WelcomeMessage({ systemPrompt }) {
  return (
    <div className="welcome-message">
      <h2>Welcome to Local Llama Chat!</h2>
      <p>
        Currently chatting as: <strong>{systemPrompt.charAt(0).toUpperCase() + systemPrompt.slice(1)}</strong>
      </p>
      <p className="hint">Click ⚙️ to change personality</p>
    </div>
  );
}
