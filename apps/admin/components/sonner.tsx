"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group toast !bg-green-50 dark:!bg-green-950/30 !text-green-900 dark:!text-green-100 !border-green-300 dark:!border-green-700",
          error:
            "group toast !bg-red-50 dark:!bg-red-950/30 !text-red-900 dark:!text-red-100 !border-red-300 dark:!border-red-700",
          warning:
            "group toast !bg-yellow-50 dark:!bg-yellow-950/30 !text-yellow-900 dark:!text-yellow-100 !border-yellow-300 dark:!border-yellow-700",
          info: "group toast !bg-blue-50 dark:!bg-blue-950/30 !text-blue-900 dark:!text-blue-100 !border-blue-300 dark:!border-blue-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

