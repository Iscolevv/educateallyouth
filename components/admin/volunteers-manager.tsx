"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VolunteersList from "./volunteers-list"

export default function VolunteersManager() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVolunteers() {
      const supabase = createClient()
      const { data } = await supabase.from("volunteers").select("*").order("created_at", { ascending: false })
      setVolunteers(data || [])
      setLoading(false)
    }
    fetchVolunteers()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <VolunteersList volunteers={volunteers} />
      </CardContent>
    </Card>
  )
}
