"use client"

import { LayoutGrid, List } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type ViewMode = "grid" | "list"

interface ViewToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as ViewMode)}
      className="border rounded-md"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view" className="px-3">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view" className="px-3">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
