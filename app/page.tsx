"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-screen bg-white text-black font-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <h1 className="text-lg font-semibold">Halter Farm Advisor</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-medium mb-2">Welcome to Halter Farm Advisor</p>
            <p className="text-sm">Ask me about your herd, grazing conditions, or farm operations.</p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === "user" ? "bg-gray-100" : "bg-transparent"
              }`}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <div key={index} className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-2 pl-5 list-disc">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 pl-5 list-decimal">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 px-1 rounded text-sm">{children}</code>
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
        {status === "streaming" && (
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl">
              <div className="flex gap-1 items-center">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
        className="p-4 border-t border-gray-200 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "ready"}
          placeholder="Ask about your herd..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 bg-white text-black text-sm outline-none focus:border-gray-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status !== "ready" || !input.trim()}
          className="w-10 h-10 rounded-full border-none bg-black text-white cursor-pointer text-lg flex items-center justify-center disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          &uarr;
        </button>
      </form>
    </div>
  );
}
