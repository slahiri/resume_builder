"use client"

import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PersonalInfo } from "@/lib/types/database"

interface SectionHeaderProps {
  data: PersonalInfo
  isHighlighted?: boolean
}

export function SectionHeader({ data, isHighlighted }: SectionHeaderProps) {
  const hasContactInfo =
    data.email || data.phone || data.location || data.linkedin || data.website

  if (!data.name && !data.title && !hasContactInfo) {
    return (
      <div
        className={cn(
          "text-center py-8 border-b transition-colors duration-500",
          isHighlighted && "bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <p className="text-muted-foreground text-sm">
          Start by telling me about yourself...
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "text-center py-6 border-b transition-colors duration-500",
        isHighlighted && "bg-yellow-50 dark:bg-yellow-900/20"
      )}
    >
      {data.name && (
        <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
      )}
      {data.title && (
        <p className="text-lg text-muted-foreground mt-1">{data.title}</p>
      )}
      {hasContactInfo && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {data.email}
            </a>
          )}
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {data.phone}
            </a>
          )}
          {data.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {data.location}
            </span>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          )}
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              Website
            </a>
          )}
        </div>
      )}
    </div>
  )
}
