import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Test webhook endpoint to verify webhook integration is working
    console.log("[Test Webhook] Received webhook:", body)

    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.WEBHOOK_SECRET || "your-webhook-secret"

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      message: "Test webhook received successfully",
      timestamp: new Date().toISOString(),
      data: body,
    })
  } catch (error) {
    console.error("[Test Webhook] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint is active",
    timestamp: new Date().toISOString(),
  })
}
