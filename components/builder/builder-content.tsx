"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { BuilderLayout } from "./builder-layout"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ResumePreview } from "@/components/resume/resume-preview"
import { useResumeStore } from "@/lib/store/resume-store"
import type { Resume, ChatMessage } from "@/lib/types/database"

interface BuilderContentProps {
  resume: Resume
  chatHistory?: ChatMessage[]
}

export function BuilderContent({ resume, chatHistory = [] }: BuilderContentProps) {
  const router = useRouter()
  const initializeResume = useResumeStore((state) => state.initializeResume)
  const addMessage = useResumeStore((state) => state.addMessage)
  const setIsLoading = useResumeStore((state) => state.setIsLoading)

  // Initialize store with resume data
  useEffect(() => {
    initializeResume(resume.id, resume.title, resume.data, chatHistory)
  }, [resume.id, resume.title, resume.data, chatHistory, initializeResume])

  const handleSendMessage = useCallback(
    async (content: string) => {
      // Create user message
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)
      setIsLoading(true)

      // TODO: In Phase 3, this will call the AI agent
      // For now, just simulate a response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I received your message! AI integration is coming in Phase 3. For now, I'm just a placeholder response.",
          timestamp: new Date().toISOString(),
        }
        addMessage(assistantMessage)
        setIsLoading(false)
      }, 1000)
    },
    [addMessage, setIsLoading]
  )

  return (
    <BuilderLayout
      chatPanel={<ChatInterface onSendMessage={handleSendMessage} />}
      previewPanel={<ResumePreview />}
    />
  )
}
