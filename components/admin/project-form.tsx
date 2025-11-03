"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createProject, updateProject } from "@/app/admin/actions"

export default function ProjectForm({ project }: { project?: any }) {
  const [title, setTitle] = useState(project?.title || "")
  const [description, setDescription] = useState(project?.description || "")
  const [imageUrl, setImageUrl] = useState(project?.image_url || "")
  const [status, setStatus] = useState(project?.status || "completed")
  const [beneficiaries, setBeneficiaries] = useState(project?.beneficiaries || 0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[v0] Submitting project form:", { title, description, imageUrl, status, beneficiaries })

      if (project) {
        await updateProject(project.id, {
          title,
          description,
          image_url: imageUrl,
          status,
          beneficiaries: beneficiaries || undefined,
        })
      } else {
        await createProject({
          title,
          description,
          image_url: imageUrl,
          status,
          beneficiaries: beneficiaries || undefined,
        })
      }

      console.log("[v0] Project saved successfully")
      setTitle("")
      setDescription("")
      setImageUrl("")
      setStatus("completed")
      setBeneficiaries(0)
      router.refresh()
    } catch (error: any) {
      console.error("[v0] Error saving project:", error)
      alert(`Error saving project: ${error.message || "Please try again."}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter project title"
        />
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="Enter project description"
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="beneficiaries">Number of Beneficiaries</Label>
        <Input
          id="beneficiaries"
          type="number"
          min="0"
          value={beneficiaries}
          onChange={(e) => setBeneficiaries(Number.parseInt(e.target.value) || 0)}
          placeholder="e.g., 150"
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
          <option value="planned">Planned</option>
        </select>
      </div>

      <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
        {isLoading ? "Saving..." : project ? "Update Project" : "Add Project"}
      </Button>
    </form>
  )
}
