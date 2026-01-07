import { createResumeAndRedirect } from "@/lib/actions/resume"

export default async function NewBuilderPage() {
  // This page automatically creates a new resume and redirects to the builder
  await createResumeAndRedirect()

  // This won't be reached due to redirect, but needed for TypeScript
  return null
}
