"use client"

import React from "react"
import { Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastNotificationProps {
  message: string
  type: "success" | "error"
}

export function ToastNotification({ message, type }: ToastNotificationProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 toast-enter">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 border backdrop-blur-sm shadow-lg",
          type === "success"
            ? "bg-green-950/90 border-green-600 text-green-200"
            : "bg-red-950/90 border-red-600 text-red-200"
        )}
      >
        {type === "success" ? (
          <Check className="size-4 flex-shrink-0" />
        ) : (
          <AlertCircle className="size-4 flex-shrink-0" />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
