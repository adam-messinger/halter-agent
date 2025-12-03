"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

// Halter-style collar icon (simplified cow collar shape)
function HalterIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer collar ring */}
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="#1B4F39"
        strokeWidth="3"
        fill="none"
      />
      {/* Inner tech element */}
      <circle
        cx="20"
        cy="20"
        r="8"
        fill="#E3FDCB"
      />
      {/* Center dot */}
      <circle
        cx="20"
        cy="20"
        r="3"
        fill="#1B4F39"
      />
      {/* Signal waves */}
      <path
        d="M28 12 C32 16, 32 24, 28 28"
        stroke="#1B4F39"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 12 C8 16, 8 24, 12 28"
        stroke="#1B4F39"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b border-[#E3FDCB] bg-[#1B4F39] flex items-center gap-3">
        <HalterIcon className="w-8 h-8" />
        <h1 className="text-lg font-semibold text-white">Halter Farm Advisor</h1>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 bg-[#f8fdf5]"
      >
        {messages.length === 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E3FDCB] mb-4">
              <HalterIcon className="w-10 h-10" />
            </div>
            <p className="text-xl font-semibold text-[#1B4F39] mb-2">
              Welcome to Halter Farm Advisor
            </p>
            <p className="text-[#1B4F39]/70 max-w-md mx-auto">
              Ask me about your herd, grazing conditions, health alerts, or any aspect of your farm operations.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl ${
                message.role === "user"
                  ? "bg-[#1B4F39] text-white rounded-br-md"
                  : "bg-white text-[#1B4F39] shadow-sm border border-[#E3FDCB] rounded-bl-md"
              }`}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <div key={index} className={`prose prose-sm max-w-none ${
                    message.role === "user" ? "prose-invert" : ""
                  }`}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-2 pl-5 list-disc space-y-1">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 pl-5 list-decimal space-y-1">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="leading-relaxed">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        code: ({ children }) => (
                          <code className={`px-1.5 py-0.5 rounded text-sm ${
                            message.role === "user"
                              ? "bg-white/20"
                              : "bg-[#E3FDCB] text-[#1B4F39]"
                          }`}>{children}</code>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-lg font-bold mb-2">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-base font-bold mb-2">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-sm font-bold mb-1">{children}</h3>
                        ),
                      }}
                    >
                      {part.text}
                    </ReactMarkdown>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {status === "streaming" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3 p-4 rounded-2xl rounded-bl-md bg-white shadow-sm border border-[#E3FDCB]">
              <div className="animate-spin-slow">
                <HalterIcon className="w-6 h-6" />
              </div>
              <span className="text-[#1B4F39]/70 text-sm animate-pulse-green">
                Thinking...
              </span>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-[#E3FDCB] bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && status === "ready") {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="flex gap-3 max-w-4xl mx-auto"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== "ready"}
            placeholder="Ask about your herd..."
            className="flex-1 px-5 py-3 rounded-full border-2 border-[#E3FDCB] bg-white text-[#1B4F39] text-sm outline-none focus:border-[#1B4F39] disabled:opacity-50 transition-colors placeholder:text-[#1B4F39]/40"
          />
          <button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            className="w-12 h-12 rounded-full border-none bg-[#1B4F39] text-white cursor-pointer text-lg flex items-center justify-center disabled:bg-[#1B4F39]/30 disabled:cursor-not-allowed hover:bg-[#153d2d] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
