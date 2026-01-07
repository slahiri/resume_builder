"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import type { ChatMessage as ChatMessageType } from "@/lib/types/database"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3",
        isUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1 overflow-hidden">
        <p className="text-sm font-medium">{isUser ? "You" : "Assistant"}</p>
        <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  )
}
