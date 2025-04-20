"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Upload, Music, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function AudioChatApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedMessages = localStorage.getItem("audioChat")
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
      const formData = new FormData()

      // Add the current question
      formData.append("question", inputValue)

      // Add chat history
      formData.append("history", JSON.stringify(updatedMessages))

      // Add audio file if available
      if (audioFile) {
        formData.append("file", audioFile)
      }

      const res = await fetch("/api/analyze-audio", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      // Add AI response to chat
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.result || "I couldn't analyze that properly. Could you try again?",
      }

      const newMessages = [...updatedMessages, aiMessage]
      setMessages(newMessages)

      // Save to localStorage
      localStorage.setItem("audioChat", JSON.stringify(newMessages))
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
      localStorage.setItem("audioChat", JSON.stringify(newMessages))
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.includes("audio")) {
      setAudioFile(file)

      // Add a system message about the uploaded file
      const systemMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `📁 Audio file uploaded: ${file.name}. You can now ask questions about this audio.`,
      }

      const updatedMessages = [...messages, systemMessage]
      setMessages(updatedMessages)
      localStorage.setItem("audioChat", JSON.stringify(updatedMessages))
    }
  }

  const clearAudioFile = () => {
    setAudioFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mr-2">
            <Music className="h-3 w-3" />
          </div>
          <h1 className="text-lg font-medium">Audio Chat Assistant</h1>
        </div>
        {audioFile && (
          <div className="flex items-center bg-gray-900 rounded-full px-3 py-1 text-sm">
            <Music className="h-3 w-3 mr-2 text-teal-500" />
            <span className="truncate max-w-[150px]">{audioFile.name}</span>
            <button onClick={clearAudioFile} className="ml-2 text-gray-400 hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </header>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Music className="h-12 w-12 mb-4 text-teal-500" />
            <p className="text-center mb-2">Upload an audio file and start chatting</p>
            <p className="text-center text-sm">Ask questions about the music, lyrics, or audio content</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
                  <Music className="h-4 w-4" />
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
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
              <Music className="h-4 w-4" />
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

      {/* Audio upload button */}
      <div className="border-t border-gray-800 p-2 flex justify-center">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          id="audio-upload"
        />
        <label
          htmlFor="audio-upload"
          className="flex items-center justify-center px-4 py-2 bg-gray-900 text-teal-500 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          {audioFile ? "Change audio file" : "Upload audio file"}
        </label>
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
              placeholder="Ask about the audio... (Shift+Enter for new line)"
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
