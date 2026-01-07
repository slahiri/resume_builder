"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { PasswordStrength } from "@/components/ui/password-strength"
import { createClient } from "@/lib/supabase/client"

interface ResetPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResetPasswordModal({
  open,
  onOpenChange,
}: ResetPasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess("Password updated successfully")
        setTimeout(() => {
          onOpenChange(false)
          setCurrentPassword("")
          setNewPassword("")
          setConfirmPassword("")
          setSuccess(null)
        }, 1500)
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setError(null)
      setSuccess(null)
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your new password below. Password must be at least 8
            characters long.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                {success}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <PasswordInput
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <PasswordStrength
                password={newPassword}
                onGeneratePassword={(password) => {
                  setNewPassword(password)
                  setConfirmPassword(password)
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <PasswordInput
                id="confirm-new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
