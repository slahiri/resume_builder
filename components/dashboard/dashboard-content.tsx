"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "./empty-state"
import { ResumeGrid } from "./resume-grid"
import { ResumeList } from "./resume-list"
import { ViewToggle, type ViewMode } from "./view-toggle"
import { createResumeAndRedirect } from "@/lib/actions/resume"
import type { Resume } from "@/lib/types/database"

const STORAGE_KEY = "resume-builder-view-mode"

interface DashboardContentProps {
  resumes: Resume[]
}

export function DashboardContent({ resumes }: DashboardContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "grid" || stored === "list") {
      setViewMode(stored)
    }
  }, [])

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }

  if (resumes.length === 0) {
    return <EmptyState />
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Resumes</h2>
          <p className="text-sm text-muted-foreground">
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ViewToggle value={viewMode} onChange={handleViewChange} />
          <form action={createResumeAndRedirect}>
            <Button type="submit" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Resume
            </Button>
          </form>
        </div>
      </div>

      {viewMode === "grid" ? (
        <ResumeGrid resumes={resumes} />
      ) : (
        <ResumeList resumes={resumes} />
      )}
    </div>
  )
}
