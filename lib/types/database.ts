export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          data: ResumeData
          template: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string
          data?: ResumeData
          template?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          data?: ResumeData
          template?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          llm_provider: "anthropic" | "grok"
          llm_model: string
          theme: "light" | "dark" | "system"
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          llm_provider?: "anthropic" | "grok"
          llm_model?: string
          theme?: "light" | "dark" | "system"
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          llm_provider?: "anthropic" | "grok"
          llm_model?: string
          theme?: "light" | "dark" | "system"
          created_at?: string
          updated_at?: string
        }
      }
      chat_history: {
        Row: {
          id: string
          resume_id: string
          user_id: string
          messages: ChatMessage[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resume_id: string
          user_id: string
          messages?: ChatMessage[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resume_id?: string
          user_id?: string
          messages?: ChatMessage[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Resume data types
export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  current: boolean
  bullets: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  category?: string
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
  bullets: string[]
}

export interface ResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

// Helper types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Resume = Database["public"]["Tables"]["resumes"]["Row"]
export type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"]
export type ChatHistory = Database["public"]["Tables"]["chat_history"]["Row"]
