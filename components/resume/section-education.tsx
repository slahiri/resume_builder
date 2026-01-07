"use client"

import { cn } from "@/lib/utils"
import type { Education } from "@/lib/types/database"

interface SectionEducationProps {
  data: Education[]
  isHighlighted?: boolean
}

export function SectionEducation({ data, isHighlighted }: SectionEducationProps) {
  if (data.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "py-4 transition-colors duration-500",
        isHighlighted && "bg-yellow-50 dark:bg-yellow-900/20"
      )}
    >
      <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
        Education
      </h2>
      <div className="space-y-3">
        {data.map((edu) => (
          <div key={edu.id} className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{edu.school}</h3>
              <p className="text-muted-foreground">
                {edu.degree} in {edu.field}
                {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
              </p>
            </div>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {edu.startDate} – {edu.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
