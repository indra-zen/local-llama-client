import { SYSTEM_PROMPTS, PERSONALITY_ICONS } from "../constants/systemPrompts";

export default function SettingsPanel({ systemPrompt, onSelectPersonality, onClose }) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 animate-slide-down">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
        Choose Personality
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {Object.keys(SYSTEM_PROMPTS).map((key) => (
          <button
            key={key}
            className={`
              flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 transition-all
              ${
                systemPrompt === key
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-500"
                  : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              }
              active:scale-95
            `}
            onClick={() => {
              onSelectPersonality(key);
              onClose();
            }}
          >
            <span className="text-2xl sm:text-3xl">{PERSONALITY_ICONS[key]}</span>
            <span className="text-xs sm:text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
