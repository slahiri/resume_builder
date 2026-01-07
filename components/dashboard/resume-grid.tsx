"use client"

import { ResumeCard } from "./resume-card"
import type { Resume } from "@/lib/types/database"

interface ResumeGridProps {
  resumes: Resume[]
}

export function ResumeGrid({ resumes }: ResumeGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  )
}
