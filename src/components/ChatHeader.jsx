export default function ChatHeader({ onToggleSettings }) {
  return (
    <div className="chat-header">
      <div className="header-content">
        <h1>🦙 Local Llama Chat</h1>
        <p>Connected to localhost:8080</p>
      </div>
      <button className="settings-button" onClick={onToggleSettings} title="Change personality">
        ⚙️
      </button>
    </div>
  );
}
