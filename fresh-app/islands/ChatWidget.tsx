import { useState } from "preact/hooks";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; isUser: boolean }[]
  >([
    {
      text: "Xin chào! 👋 Tôi là trợ lý AllShop. Tôi có thể giúp gì cho bạn?",
      isUser: false,
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { text: message, isUser: true },
      {
        text: "Cảm ơn bạn đã liên hệ! Nhân viên sẽ phản hồi trong giây lát.",
        isUser: false,
      },
    ]);
    setMessage("");
  };

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở chat hỗ trợ"
        class={`fixed bottom-6 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 md:bottom-8 md:left-8 ${
          isOpen
            ? "bg-gray-600 text-white"
            : "bg-gradient-to-br from-primary-500 to-accent-600 text-white animate-float"
        }`}
      >
        {isOpen
          ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )
          : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
      </button>

      {/* Chat window */}
      <div
        class={`fixed bottom-22 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 md:bottom-24 md:left-8 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div class="bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-3 text-white">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
              A
            </div>
            <div>
              <p class="text-sm font-semibold">AllShop Support</p>
              <p class="flex items-center gap-1 text-xs text-white/80">
                <span class="inline-block h-2 w-2 rounded-full bg-green-400">
                </span>
                Trực tuyến
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div class="flex h-72 flex-col gap-3 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              class={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                class={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.isUser
                    ? "rounded-br-md bg-primary-600 text-white"
                    : "rounded-bl-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div class="border-t border-gray-200 p-3 dark:border-gray-700">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            class="flex gap-2"
          >
            <input
              type="text"
              value={message}
              onInput={(e) =>
                setMessage((e.target as HTMLInputElement).value)}
              placeholder="Nhập tin nhắn..."
              class="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none transition-colors focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width={2.5}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
