"use client"

import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/types/database"

interface SectionProjectsProps {
  data: Project[]
  isHighlighted?: boolean
}

export function SectionProjects({ data, isHighlighted }: SectionProjectsProps) {
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
        Projects
      </h2>
      <div className="space-y-4">
        {data.map((project) => (
          <div key={project.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{project.name}</h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            {project.description && (
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            )}
            {project.bullets.length > 0 && (
              <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                {project.bullets.map((bullet, idx) => (
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
