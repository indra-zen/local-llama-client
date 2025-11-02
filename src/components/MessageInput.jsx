export default function MessageInput({ input, isLoading, onInputChange, onSubmit }) {
  return (
    <form className="input-container" onSubmit={onSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="message-input"
      />
      <button type="submit" disabled={isLoading || !input.trim()} className="send-button">
        {isLoading ? "⋯" : "→"}
      </button>
    </form>
  );
}
