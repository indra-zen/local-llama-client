import { SYSTEM_PROMPTS, PERSONALITY_ICONS } from "../constants/systemPrompts";

export default function SettingsPanel({ systemPrompt, onSelectPersonality, onClose }) {
  return (
    <div className="settings-panel">
      <h3>Choose Personality</h3>
      <div className="personality-grid">
        {Object.keys(SYSTEM_PROMPTS).map((key) => (
          <button
            key={key}
            className={`personality-button ${systemPrompt === key ? "active" : ""}`}
            onClick={() => {
              onSelectPersonality(key);
              onClose();
            }}
          >
            {PERSONALITY_ICONS[key]}
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
