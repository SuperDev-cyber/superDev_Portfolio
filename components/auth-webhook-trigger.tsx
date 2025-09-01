"use client"

import { useState } from "react"

interface AuthWebhookTriggerProps {
  event: "signup" | "signin" | "signout"
  user?: any
  session?: any
}

export function AuthWebhookTrigger({ event, user, session }: AuthWebhookTriggerProps) {
  const [isTriggering, setIsTriggering] = useState(false)

  const triggerWebhook = async () => {
    setIsTriggering(true)

    try {
      const response = await fetch("/api/webhooks/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBHOOK_SECRET || "your-webhook-secret"}`,
        },
        body: JSON.stringify({
          event: `user.${event}`,
          user,
          session,
        }),
      })

      if (response.ok) {
        console.log(`[Auth] Webhook triggered successfully for ${event}`)
      } else {
        console.error(`[Auth] Webhook failed for ${event}:`, await response.text())
      }
    } catch (error) {
      console.error(`[Auth] Error triggering webhook for ${event}:`, error)
    } finally {
      setIsTriggering(false)
    }
  }

  // Auto-trigger webhook (in real implementation, this would be handled by Supabase)
  if (user && !isTriggering) {
    triggerWebhook()
  }

  return null // This is a utility component, no UI needed
}
