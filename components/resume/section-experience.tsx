"use client"

import { cn } from "@/lib/utils"
import type { Experience } from "@/lib/types/database"

interface SectionExperienceProps {
  data: Experience[]
  isHighlighted?: boolean
}

export function SectionExperience({ data, isHighlighted }: SectionExperienceProps) {
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
        Experience
      </h2>
      <div className="space-y-4">
        {data.map((exp) => (
          <div key={exp.id} className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
              </p>
            </div>
            {exp.bullets.length > 0 && (
              <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="text-muted-foreground">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
