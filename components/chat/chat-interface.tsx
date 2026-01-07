"use client"

import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { useResumeStore } from "@/lib/store/resume-store"
import type { ChatMessage as ChatMessageType } from "@/lib/types/database"

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void
}

export function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  const messages = useResumeStore((state) => state.messages)
  const isLoading = useResumeStore((state) => state.isLoading)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center px-4 py-3 border-b">
        <h2 className="font-semibold">Chat</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {messages.length === 0 && !isLoading && (
            <div className="p-8 text-center">
              <h3 className="font-semibold text-lg mb-2">
                Welcome to Resume Builder!
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                I&apos;m here to help you create a professional resume. Tell me
                about yourself, your work experience, education, and skills.
                I&apos;ll help organize everything into a polished resume.
              </p>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>Try saying:</p>
                <ul className="space-y-1">
                  <li>&quot;My name is John and I&apos;m a software engineer&quot;</li>
                  <li>&quot;I worked at Google for 3 years as a senior developer&quot;</li>
                  <li>&quot;Add Python, JavaScript, and React to my skills&quot;</li>
                </ul>
              </div>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex gap-3 px-4 py-3 bg-background">
              <div className="h-8 w-8 shrink-0 rounded-full bg-secondary flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-secondary-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Assistant</p>
                <p className="text-sm text-muted-foreground">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <ChatInput
        onSend={onSendMessage}
        disabled={isLoading}
        placeholder="Tell me about yourself..."
      />
    </div>
  )
}
