"use client"

import { cn } from "@/lib/utils"
import { Sparkles, User } from "lucide-react"
import type { ChatMessage as ChatMessageType } from "@/lib/types/database"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isUser
            ? "bg-foreground text-background"
            : "bg-gradient-to-br from-violet-500 to-purple-600"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4 text-white" />
        )}
      </div>
      <div
        className={cn(
          "flex-1 max-w-[85%] pt-1",
          isUser && "flex justify-end"
        )}
      >
        <div
          className={cn(
            "inline-block px-4 py-2 rounded-2xl text-sm",
            isUser
              ? "bg-foreground text-background rounded-tr-sm"
              : "bg-muted rounded-tl-sm"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
