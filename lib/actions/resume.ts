"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { ResumeData } from "@/lib/types/database"

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

export async function getResumes() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized", resumes: [] }
  }

  const { data: resumes, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) {
    return { error: error.message, resumes: [] }
  }

  return { resumes: resumes || [], error: null }
}

export async function createResume(title?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized", resume: null }
  }

  const { data: resume, error } = await supabase
    .from("resumes")
    .insert({
      user_id: user.id,
      title: title || "Untitled Resume",
      data: emptyResumeData,
      template: "modern",
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message, resume: null }
  }

  revalidatePath("/dashboard")
  return { resume, error: null }
}

export async function createResumeAndRedirect(): Promise<void> {
  const result = await createResume()

  if (result.error || !result.resume) {
    // In case of error, redirect to dashboard with error (or handle differently)
    redirect("/dashboard")
  }

  redirect(`/builder/${result.resume.id}`)
}

export async function duplicateResume(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  // Get the original resume
  const { data: original, error: fetchError } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (fetchError || !original) {
    return { error: "Resume not found" }
  }

  // Create a copy
  const { error: insertError } = await supabase.from("resumes").insert({
    user_id: user.id,
    title: `${original.title} (Copy)`,
    data: original.data,
    template: original.template,
    is_active: true,
  })

  if (insertError) {
    return { error: insertError.message }
  }

  revalidatePath("/dashboard")
  return { error: null }
}

export async function renameResume(id: string, title: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("resumes")
    .update({ title })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { error: null }
}

export async function deleteResume(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("resumes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { error: null }
}

export async function getResume(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized", resume: null }
  }

  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) {
    return { error: error.message, resume: null }
  }

  return { resume, error: null }
}
