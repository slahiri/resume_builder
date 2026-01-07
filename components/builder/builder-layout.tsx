"use client"

import { useIsMobile } from "@/hooks/use-mobile"

interface BuilderLayoutProps {
  chatPanel: React.ReactNode
  previewPanel: React.ReactNode
}

export function BuilderLayout({ chatPanel, previewPanel }: BuilderLayoutProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">{chatPanel}</div>
        <div className="h-1/2 border-t overflow-hidden">{previewPanel}</div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full">
      <div className="w-[40%] h-full overflow-hidden border-r">
        {chatPanel}
      </div>
      <div className="w-[60%] h-full overflow-hidden">
        {previewPanel}
      </div>
    </div>
  )
}
