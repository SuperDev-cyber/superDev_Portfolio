import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AuthLogsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // In a real app, you'd check if user is admin
  // For demo purposes, we'll show logs for any authenticated user

  const { data: authLogs } = await supabase
    .from("auth_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Authentication Logs</h1>
          <p className="text-gray-600 mt-2">Monitor user authentication events via webhooks</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Authentication Events</CardTitle>
          </CardHeader>
          <CardContent>
            {authLogs && authLogs.length > 0 ? (
              <div className="space-y-4">
                {authLogs.map((log: any) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          log.event_type === "signup"
                            ? "default"
                            : log.event_type === "signin"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {log.event_type}
                      </Badge>
                      <div>
                        <p className="font-medium">{log.user_email}</p>
                        <p className="text-sm text-gray-600">{new Date(log.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">User ID: {log.user_id?.substring(0, 8)}...</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No authentication events logged yet</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
