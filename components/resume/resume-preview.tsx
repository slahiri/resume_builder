"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SectionHeader } from "./section-header"
import { SectionExperience } from "./section-experience"
import { SectionEducation } from "./section-education"
import { SectionSkills } from "./section-skills"
import { SectionProjects } from "./section-projects"
import { useResumeStore, type ResumeSection } from "@/lib/store/resume-store"

export function ResumePreview() {
  const data = useResumeStore((state) => state.data)
  const updatedSection = useResumeStore((state) => state.updatedSection)

  const isHighlighted = (section: ResumeSection) => updatedSection === section

  const hasContent =
    data.personal.name ||
    data.personal.title ||
    data.experience.length > 0 ||
    data.education.length > 0 ||
    data.skills.length > 0 ||
    data.projects.length > 0

  return (
    <div className="h-full flex flex-col bg-muted/30">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background">
        <h2 className="font-semibold">Preview</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-sm border">
            <div className="p-6">
              <SectionHeader
                data={data.personal}
                isHighlighted={isHighlighted("personal")}
              />
              <SectionExperience
                data={data.experience}
                isHighlighted={isHighlighted("experience")}
              />
              <SectionEducation
                data={data.education}
                isHighlighted={isHighlighted("education")}
              />
              <SectionSkills
                data={data.skills}
                isHighlighted={isHighlighted("skills")}
              />
              <SectionProjects
                data={data.projects}
                isHighlighted={isHighlighted("projects")}
              />
              {!hasContent && (
                <div className="py-12 text-center text-muted-foreground">
                  <p>Your resume will appear here as you build it.</p>
                  <p className="text-sm mt-1">
                    Start chatting to add your information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
