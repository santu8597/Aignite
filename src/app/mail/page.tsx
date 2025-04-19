"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { mastraClient } from "@/lib/mastra"
import { Send,Bot } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory-mail")
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (e) {
        console.error("Error parsing saved messages:", e)
      }
    }

    // Focus the input field on load
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Create a unique ID for the message
    const userMessageId = Date.now().toString()

    // Add user message to chat
    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: inputValue,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsLoading(true)

    try {
      const agent = mastraClient.getAgent("fraudMailDetectorAgent")

      // Convert our messages to the format expected by the agent
      const conversationHistory = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await agent.generate({
        messages: conversationHistory,
      })

      // Add AI response to chat
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response.text,
      }

      const newMessages = [...updatedMessages, aiMessage]
      setMessages(newMessages)

      // Save to localStorage
      localStorage.setItem("chatHistory-mail", JSON.stringify(newMessages))
    } catch (error) {
      console.error("Error:", error)

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I encountered an error processing your request.",
      }

      const newMessages = [...updatedMessages, errorMessage]
      setMessages(newMessages)
      localStorage.setItem("chatHistory-mail", JSON.stringify(newMessages))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mr-2">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg> */}
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-medium">AI Chat Assistant</h1>
        </div>
      </header>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg> */}
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.role === "user" ? "bg-transparent text-white" : "bg-gray-900 text-white",
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-1 bg-gray-900 rounded-lg">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Shift+Enter for new line)"
              className="w-full p-4 bg-transparent text-white outline-none resize-none"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="ml-2 w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center text-white disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </div>
  )
}
