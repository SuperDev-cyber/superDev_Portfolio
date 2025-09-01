import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, user, session } = body

    // Verify the webhook is from a trusted source
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.WEBHOOK_SECRET || "your-webhook-secret"

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log(`[Webhook] Authentication event: ${event}`)
    console.log(`[Webhook] User: ${user?.email}`)

    switch (event) {
      case "user.signed_up":
        await handleUserSignUp(user)
        break
      case "user.signed_in":
        await handleUserSignIn(user, session)
        break
      case "user.signed_out":
        await handleUserSignOut(user)
        break
      default:
        console.log(`[Webhook] Unhandled event: ${event}`)
    }

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error("[Webhook] Error processing auth webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleUserSignUp(user: any) {
  try {
    console.log(`[Webhook] New user signed up: ${user.email}`)

    // Log the signup event
    await logAuthEvent("signup", user)

    // You could send welcome emails, create user profiles, etc.
    // For now, we'll just log the event

    return { success: true }
  } catch (error) {
    console.error("[Webhook] Error handling user signup:", error)
    throw error
  }
}

async function handleUserSignIn(user: any, session: any) {
  try {
    console.log(`[Webhook] User signed in: ${user.email}`)

    // Log the signin event
    await logAuthEvent("signin", user, session)

    // Update last login time, track user activity, etc.

    return { success: true }
  } catch (error) {
    console.error("[Webhook] Error handling user signin:", error)
    throw error
  }
}

async function handleUserSignOut(user: any) {
  try {
    console.log(`[Webhook] User signed out: ${user.email}`)

    // Log the signout event
    await logAuthEvent("signout", user)

    return { success: true }
  } catch (error) {
    console.error("[Webhook] Error handling user signout:", error)
    throw error
  }
}

async function logAuthEvent(event: string, user: any, session?: any) {
  const supabase = await createClient()

  try {
    // Create an auth_logs table entry
    const { error } = await supabase.from("auth_logs").insert({
      event_type: event,
      user_id: user.id,
      user_email: user.email,
      user_metadata: user.user_metadata || {},
      session_id: session?.access_token ? session.access_token.substring(0, 20) : null,
      ip_address: null, // Would need to extract from request in real implementation
      user_agent: null, // Would need to extract from request in real implementation
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[Webhook] Error logging auth event:", error)
    }
  } catch (error) {
    console.error("[Webhook] Error in logAuthEvent:", error)
  }
}
