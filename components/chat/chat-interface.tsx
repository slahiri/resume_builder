"use client"

import { useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { useResumeStore } from "@/lib/store/resume-store"

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void
}

export function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  const messages = useResumeStore((state) => state.messages)
  const isLoading = useResumeStore((state) => state.isLoading)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  return (
    <div className="h-full flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Build your resume</h2>
            <p className="text-muted-foreground text-center text-sm max-w-sm mb-8">
              Tell me about yourself, your experience, and skills. I&apos;ll help create a professional resume.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {[
                "I'm a software engineer with 5 years experience",
                "Add my education at Stanford",
                "I know React, TypeScript, and Node.js",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSendMessage(suggestion)}
                  className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-muted transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 pt-0">
        <ChatInput
          onSend={onSendMessage}
          disabled={isLoading}
          placeholder="Describe yourself, add experience, skills..."
        />
      </div>
    </div>
  )
}
