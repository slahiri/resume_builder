import { create } from "zustand"
import type {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  ChatMessage,
} from "@/lib/types/database"

export type ResumeSection =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"

interface ResumeState {
  // Resume metadata
  resumeId: string | null
  title: string

  // Resume data
  data: ResumeData

  // Chat state
  messages: ChatMessage[]
  isLoading: boolean

  // UI state
  updatedSection: ResumeSection | null
  saveStatus: "saved" | "saving" | "error" | "idle"

  // Actions - Resume metadata
  setResumeId: (id: string | null) => void
  setTitle: (title: string) => void

  // Actions - Initialize/Reset
  initializeResume: (id: string, title: string, data: ResumeData, messages?: ChatMessage[]) => void
  resetStore: () => void

  // Actions - Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void

  // Actions - Experience
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void

  // Actions - Education
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void

  // Actions - Skills
  addSkill: (skill: Skill) => void
  removeSkill: (id: string) => void

  // Actions - Projects
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void

  // Actions - Chat
  addMessage: (message: ChatMessage) => void
  setMessages: (messages: ChatMessage[]) => void
  setIsLoading: (loading: boolean) => void

  // Actions - UI
  setUpdatedSection: (section: ResumeSection | null) => void
  setSaveStatus: (status: "saved" | "saving" | "error" | "idle") => void
}

const emptyResumeData: ResumeData = {
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  // Initial state
  resumeId: null,
  title: "Untitled Resume",
  data: emptyResumeData,
  messages: [],
  isLoading: false,
  updatedSection: null,
  saveStatus: "idle",

  // Resume metadata
  setResumeId: (id) => set({ resumeId: id }),
  setTitle: (title) => set({ title }),

  // Initialize/Reset
  initializeResume: (id, title, data, messages = []) =>
    set({
      resumeId: id,
      title,
      data,
      messages,
      saveStatus: "saved",
      updatedSection: null,
    }),

  resetStore: () =>
    set({
      resumeId: null,
      title: "Untitled Resume",
      data: emptyResumeData,
      messages: [],
      isLoading: false,
      updatedSection: null,
      saveStatus: "idle",
    }),

  // Personal Info
  updatePersonalInfo: (info) => {
    set((state) => ({
      data: {
        ...state.data,
        personal: { ...state.data.personal, ...info },
      },
      updatedSection: "personal",
      saveStatus: "saving",
    }))
    // Clear highlight after animation
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  // Experience
  addExperience: (experience) => {
    set((state) => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, experience],
      },
      updatedSection: "experience",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  updateExperience: (id, experience) => {
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      },
      updatedSection: "experience",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  removeExperience: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((exp) => exp.id !== id),
      },
      updatedSection: "experience",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  // Education
  addEducation: (education) => {
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, education],
      },
      updatedSection: "education",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  updateEducation: (id, education) => {
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        ),
      },
      updatedSection: "education",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  removeEducation: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((edu) => edu.id !== id),
      },
      updatedSection: "education",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  // Skills
  addSkill: (skill) => {
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, skill],
      },
      updatedSection: "skills",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  removeSkill: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill.id !== id),
      },
      updatedSection: "skills",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  // Projects
  addProject: (project) => {
    set((state) => ({
      data: {
        ...state.data,
        projects: [...state.data.projects, project],
      },
      updatedSection: "projects",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  updateProject: (id, project) => {
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((proj) =>
          proj.id === id ? { ...proj, ...project } : proj
        ),
      },
      updatedSection: "projects",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  removeProject: (id) => {
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((proj) => proj.id !== id),
      },
      updatedSection: "projects",
      saveStatus: "saving",
    }))
    setTimeout(() => set({ updatedSection: null }), 1500)
  },

  // Chat
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) => set({ messages }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  // UI
  setUpdatedSection: (section) => set({ updatedSection: section }),
  setSaveStatus: (status) => set({ saveStatus: status }),
}))
