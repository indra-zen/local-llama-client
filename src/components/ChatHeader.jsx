export default function ChatHeader({ onToggleSettings }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-semibold">🦙 Local Llama Chat</h1>
        <p className="text-xs sm:text-sm opacity-90 mt-1">Connected to server</p>
      </div>
      <button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center text-xl sm:text-2xl"
        onClick={onToggleSettings}
        title="Change personality"
      >
        ⚙️
      </button>
    </div>
  );
}
