"use client"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Check, Send, User, Bot } from "lucide-react"
import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

// Component to display tool invocation details
const ToolInvocationCard = ({ toolInvocation }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!toolInvocation) return null

  const { toolName, args, result, state } = toolInvocation

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden mb-4 bg-black text-white">
      <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          <Check size={18} className="text-white" />
          <span>Used tool: {toolName}</span>
        </div>
        <button className="text-white">{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button>
      </div>

      {isExpanded && (
        <>
          <div className="border-t border-gray-700 p-3 font-mono text-sm">{JSON.stringify(args, null, 2)}</div>

          {state === "result" && (
            <>
              <div className="border-t border-gray-700 p-3">
                <div className="text-white font-semibold mb-1">Result:</div>
                <pre className="font-mono text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default function WeatherChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/send", // Adjust this if your API route is different
  })

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle Shift+Enter in the input field
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault()
        if (input.trim()) {
          handleSubmit(new Event("submit") as any)
        }
      }
    }
  }

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="text-blue-400" />
          AI Assistant
        </h1>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Bot size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-lg">How can I help you today?</p>
              <p className="text-sm mt-2">Ask me about the weather or anything else!</p>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex gap-3 w-full max-w-3xl", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                m.role === "user" ? "bg-blue-600" : "bg-gray-700",
              )}
            >
              {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className="flex-1">
              {m.role === "assistant" &&
                m.parts &&
                m.parts.map((part, j) => {
                  if (part.type === "tool-invocation") {
                    const toolInvocation = {
                      toolName: part.toolInvocation.toolName,
                      args: part.toolInvocation.args,
                      result: part.toolInvocation.state === "result" ? part.toolInvocation.result : null,
                      state: part.toolInvocation.state,
                    }

                    return (
                      <div key={`${m.id}-${j}`}>
                        <ToolInvocationCard toolInvocation={toolInvocation} />
                      </div>
                    )
                  } else if (part.type === "text") {
                    return (
                      <div key={`${m.id}-${j}`} className="mb-4 p-4 bg-gray-800/50 rounded-lg inline-block max-w-full">
                        {part.text}
                      </div>
                    )
                  }
                  return null
                })}

              {m.role === "user" && (
                <div className="p-4 bg-blue-900/30 rounded-lg inline-block max-w-full">{m.content}</div>
              )}

              {m.role === "assistant" && !m.parts && (
                <div className="p-4 bg-gray-800/50 rounded-lg inline-block max-w-full">{m.content}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            placeholder={`Type a message... (Press Shift+Enter for new line)`}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            className="w-full bg-gray-900 border border-gray-700 text-white py-3 pl-4 pr-20 rounded-full resize-none overflow-hidden"
            style={{ minHeight: "50px", maxHeight: "120px" }}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 rounded-full h-10 w-10 p-0 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-2">Shift+Enter for new line • Enter to send</p>
      </div>
    </div>
  )
}
