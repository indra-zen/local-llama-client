export default function WelcomeMessage({ systemPrompt }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Welcome to Local Llama Chat!
      </h2>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
        Currently chatting as:{" "}
        <strong className="text-indigo-600 dark:text-indigo-400">
          {systemPrompt.charAt(0).toUpperCase() + systemPrompt.slice(1)}
        </strong>
      </p>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-4">Click ⚙️ to change personality</p>
    </div>
  );
}
