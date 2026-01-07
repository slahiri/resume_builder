"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  Copy,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteResume, duplicateResume, renameResume } from "@/lib/actions/resume"
import type { Resume } from "@/lib/types/database"

interface ResumeCardProps {
  resume: Resume
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(resume.title)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    await deleteResume(resume.id)
    setDeleteDialogOpen(false)
    setIsLoading(false)
  }

  const handleDuplicate = async () => {
    setIsLoading(true)
    await duplicateResume(resume.id)
    setIsLoading(false)
  }

  const handleRename = async () => {
    if (!newTitle.trim()) return
    setIsLoading(true)
    await renameResume(resume.id, newTitle.trim())
    setRenameDialogOpen(false)
    setIsLoading(false)
  }

  const personalName = resume.data?.personal?.name || ""
  const personalTitle = resume.data?.personal?.title || ""

  return (
    <>
      <Card className="group relative overflow-hidden transition-all hover:shadow-md">
        <Link href={`/builder/${resume.id}`} className="absolute inset-0 z-10">
          <span className="sr-only">Edit {resume.title}</span>
        </Link>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight line-clamp-1">
                  {resume.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(resume.updated_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative z-20 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    setRenameDialogOpen(true)
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    handleDuplicate()
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    setDeleteDialogOpen(true)
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="rounded-md bg-muted/50 p-4 min-h-[120px] flex flex-col justify-center">
            {personalName || personalTitle ? (
              <div className="text-center">
                {personalName && (
                  <p className="font-medium text-sm line-clamp-1">{personalName}</p>
                )}
                {personalTitle && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {personalTitle}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                No content yet
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{resume.data?.experience?.length || 0} experiences</span>
            <span>{resume.data?.skills?.length || 0} skills</span>
          </div>
        </CardFooter>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{resume.title}&quot;. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename resume</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter resume title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={isLoading || !newTitle.trim()}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
