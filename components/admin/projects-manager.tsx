"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectForm from "./project-form"
import ProjectsList from "./projects-list"

export default function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) {
        console.log("[v0] Error fetching projects:", error)
        setError(error.message)
      } else {
        console.log("[v0] Fetched projects:", data?.length)
        setProjects(data || [])
      }
    } catch (err: any) {
      console.log("[v0] Exception fetching projects:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  if (loading) {
    return (
      <div className="animate-pulse h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        Loading projects...
      </div>
    )
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm onSuccess={fetchProjects} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsList projects={projects} onUpdate={fetchProjects} />
        </CardContent>
      </Card>
    </div>
  )
}
