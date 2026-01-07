"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
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
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
        {chatPanel}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={40}>
        {previewPanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
