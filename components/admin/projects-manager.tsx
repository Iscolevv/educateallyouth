"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectForm from "./project-form"
import ProjectsList from "./projects-list"

export default function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient()
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false })
      setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsList projects={projects} />
        </CardContent>
      </Card>
    </div>
  )
}
