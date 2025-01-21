export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-black text-white rounded-t-lg">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <span className="text-black text-sm font-bold">C</span>
        </div>
        <span className="font-semibold">Chat AI</span>
      </div>
      {/* <button
        type="button"
        aria-label="Chat AI"
        className="p-1 hover:bg-gray-700 rounded-full transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H7c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7z" />
        </svg>
      </button> */}
    </div>
  );
}
