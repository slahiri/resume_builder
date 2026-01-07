"use client"

import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createResumeAndRedirect } from "@/lib/actions/resume"

export function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileText className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">No resumes yet</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Get started by creating your first AI-powered resume. Our assistant will
        help you craft a professional resume in minutes.
      </p>
      <form action={createResumeAndRedirect} className="mt-6">
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Resume
        </Button>
      </form>
    </div>
  )
}
