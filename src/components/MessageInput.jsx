export default function MessageInput({ input, isLoading, onInputChange, onSubmit }) {
  return (
    <form
      className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl sm:text-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform shadow-lg"
      >
        {isLoading ? "⋯" : "→"}
      </button>
    </form>
  );
}
