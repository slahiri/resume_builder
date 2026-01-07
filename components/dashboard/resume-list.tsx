"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  Copy,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

interface ResumeListProps {
  resumes: Resume[]
}

export function ResumeList({ resumes }: ResumeListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!selectedResume) return
    setIsLoading(true)
    await deleteResume(selectedResume.id)
    setDeleteDialogOpen(false)
    setSelectedResume(null)
    setIsLoading(false)
  }

  const handleDuplicate = async (resume: Resume) => {
    setIsLoading(true)
    await duplicateResume(resume.id)
    setIsLoading(false)
  }

  const handleRename = async () => {
    if (!selectedResume || !newTitle.trim()) return
    setIsLoading(true)
    await renameResume(selectedResume.id, newTitle.trim())
    setRenameDialogOpen(false)
    setSelectedResume(null)
    setNewTitle("")
    setIsLoading(false)
  }

  const openRenameDialog = (resume: Resume) => {
    setSelectedResume(resume)
    setNewTitle(resume.title)
    setRenameDialogOpen(true)
  }

  const openDeleteDialog = (resume: Resume) => {
    setSelectedResume(resume)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumes.map((resume) => (
              <TableRow key={resume.id} className="group">
                <TableCell>
                  <Link
                    href={`/builder/${resume.id}`}
                    className="flex items-center gap-3 hover:underline"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{resume.title}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {resume.data?.personal?.name || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(resume.updated_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openRenameDialog(resume)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(resume)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(resume)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{selectedResume?.title}&quot;.
              This action cannot be undone.
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
