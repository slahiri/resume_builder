"use client"

import * as React from "react"
import { Check, X, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PasswordCriteria {
  label: string
  test: (password: string) => boolean
}

const passwordCriteria: PasswordCriteria[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Contains uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Contains number", test: (p) => /[0-9]/.test(p) },
  { label: "Contains special character", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
]

function generateStrongPassword(): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const special = "!@#$%^&*(),.?"
  const all = uppercase + lowercase + numbers + special

  let password = ""
  // Ensure at least one of each required character type
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]

  // Fill rest with random characters
  for (let i = 4; i < 16; i++) {
    password += all[Math.floor(Math.random() * all.length)]
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

interface PasswordStrengthProps {
  password: string
  onGeneratePassword?: (password: string) => void
  showGenerateButton?: boolean
  className?: string
}

export function PasswordStrength({
  password,
  onGeneratePassword,
  showGenerateButton = true,
  className,
}: PasswordStrengthProps) {
  const handleGenerate = () => {
    const newPassword = generateStrongPassword()
    onGeneratePassword?.(newPassword)
  }

  const passedCount = passwordCriteria.filter((c) => c.test(password)).length
  const strengthPercentage = (passedCount / passwordCriteria.length) * 100

  const getStrengthColor = () => {
    if (strengthPercentage <= 20) return "bg-red-500"
    if (strengthPercentage <= 40) return "bg-orange-500"
    if (strengthPercentage <= 60) return "bg-yellow-500"
    if (strengthPercentage <= 80) return "bg-lime-500"
    return "bg-green-500"
  }

  const getStrengthLabel = () => {
    if (strengthPercentage <= 20) return "Very Weak"
    if (strengthPercentage <= 40) return "Weak"
    if (strengthPercentage <= 60) return "Fair"
    if (strengthPercentage <= 80) return "Strong"
    return "Very Strong"
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Password Strength</span>
          <span className={cn(
            "font-medium",
            strengthPercentage <= 40 ? "text-red-500" :
            strengthPercentage <= 60 ? "text-yellow-500" : "text-green-500"
          )}>
            {password ? getStrengthLabel() : ""}
          </span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-300", getStrengthColor())}
            style={{ width: `${password ? strengthPercentage : 0}%` }}
          />
        </div>
      </div>

      {/* Criteria List */}
      <ul className="space-y-1 text-xs">
        {passwordCriteria.map((criteria, index) => {
          const passed = criteria.test(password)
          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 transition-colors",
                passed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
              )}
            >
              {passed ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
              {criteria.label}
            </li>
          )
        })}
      </ul>

      {/* Generate Password Button */}
      {showGenerateButton && onGeneratePassword && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={handleGenerate}
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          Generate Strong Password
        </Button>
      )}
    </div>
  )
}

export { generateStrongPassword }
