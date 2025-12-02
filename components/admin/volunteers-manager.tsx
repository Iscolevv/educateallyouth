"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VolunteersList from "./volunteers-list"

export default function VolunteersManager() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVolunteers = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from("volunteers").select("*").order("created_at", { ascending: false })

      if (error) {
        console.log("[v0] Error fetching volunteers:", error)
        setError(error.message)
      } else {
        console.log("[v0] Fetched volunteers:", data?.length)
        setVolunteers(data || [])
      }
    } catch (err: any) {
      console.log("[v0] Exception fetching volunteers:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVolunteers()
  }, [fetchVolunteers])

  if (loading) {
    return (
      <div className="animate-pulse h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        Loading volunteers...
      </div>
    )
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Error: {error}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Submissions ({volunteers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <VolunteersList volunteers={volunteers} onUpdate={fetchVolunteers} />
      </CardContent>
    </Card>
  )
}
