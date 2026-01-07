"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/lib/types/database"

interface SectionSkillsProps {
  data: Skill[]
  isHighlighted?: boolean
}

export function SectionSkills({ data, isHighlighted }: SectionSkillsProps) {
  if (data.length === 0) {
    return null
  }

  // Group skills by category
  const groupedSkills = data.reduce(
    (acc, skill) => {
      const category = skill.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  const categories = Object.keys(groupedSkills)

  return (
    <div
      className={cn(
        "py-4 transition-colors duration-500",
        isHighlighted && "bg-yellow-50 dark:bg-yellow-900/20"
      )}
    >
      <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
        Skills
      </h2>
      {categories.length === 1 && categories[0] === "Other" ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill) => (
            <Badge key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex flex-wrap items-start gap-2">
              <span className="text-sm font-medium min-w-[100px]">
                {category}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {groupedSkills[category].map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
