import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const userData = {
    email: user.email || "",
    name: user.user_metadata?.full_name || undefined,
    avatar: user.user_metadata?.avatar_url || undefined,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-semibold">Welcome back!</h3>
                <p className="text-sm text-muted-foreground">
                  {userData.name || userData.email}
                </p>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-semibold text-3xl">0</h3>
                <p className="text-sm text-muted-foreground">Resumes Created</p>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-semibold text-3xl">0</h3>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 min-h-[50vh] flex-1 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Get Started</h2>
              <p className="text-muted-foreground mb-4">
                Create your first AI-powered resume
              </p>
              <a
                href="/builder"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Create New Resume
              </a>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
